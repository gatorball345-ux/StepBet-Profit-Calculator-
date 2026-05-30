const potInput = document.getElementById("pot");
const winnersInput = document.getElementById("winners");
const entryInput = document.getElementById("entry");
const bankrollInput = document.getElementById("bankroll");

const toggle = document.getElementById("memberToggle");
const result = document.getElementById("result");

let history = JSON.parse(localStorage.getItem("stepbetHistory")) || [];

toggle.onchange = calculate;
[entryInput, potInput, winnersInput].forEach(i => i.oninput = calculate);

function calculate() {
  const pot = +potInput.value;
  const players = +winnersInput.value;
  const entry = +entryInput.value;

  if (!pot || !players || !entry) return;

  const adjustedPot = toggle.checked ? pot : pot * 0.85;
  const payout = adjustedPot <= entry * players ? entry : adjustedPot / players;

  const profit = +(payout - entry).toFixed(2);
  const percent = (profit / entry) * 100;

  result.innerHTML = `
    <div>$${payout.toFixed(2)}</div>
    <div>${profit >= 0 ? "+" : ""}$${profit} (${percent.toFixed(1)}%)</div>
  `;

  save({ entry, pot, players, payout, profit, percent, member: toggle.checked });

  render();
  drawChart();
  drawBankrollChart();
  updateStats();
  updateAdvancedStats();
  updateRisk();
  updateConfidence();
  updateEdge();
}

function save(item) {
  history.unshift(item);
  if (history.length > 20) history.pop();
  localStorage.setItem("stepbetHistory", JSON.stringify(history));
}

function render() {
  document.getElementById("history").innerHTML =
    history.map((h, i) =>
      `<div class="history-item" onclick="load(${i})">$${h.payout.toFixed(2)}</div>`
    ).join("");

  const avg = history.reduce((s, x) => s + x.percent, 0) / history.length || 0;
  document.getElementById("avgROI").innerHTML = `Avg ROI: ${avg.toFixed(1)}%`;
}

function load(i) {
  const h = history[i];
  entryInput.value = h.entry;
  potInput.value = h.pot;
  winnersInput.value = h.players;
  calculate();
}

//////////////////////////////////////////////////
// ROI CHART
//////////////////////////////////////////////////
let roiChart;

function drawChart() {
  const ctx = document.getElementById("roiChart");
  if (!ctx) return;

  if (roiChart) roiChart.destroy();

  roiChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: history.map((_, i) => i + 1),
      datasets: [{
        data: history.map(h => h.percent),
        tension: 0.3
      }]
    }
  });
}

//////////////////////////////////////////////////
// BANKROLL CURVE
//////////////////////////////////////////////////
let bankrollChart;

function drawBankrollChart() {
  const ctx = document.getElementById("bankrollChart");
  if (!ctx) return;

  if (bankrollChart) bankrollChart.destroy();

  let start = +bankrollInput.value || 0;
  let running = start;

  const data = history.map(h => {
    running += h.profit;
    return running;
  });

  bankrollChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map((_, i) => i + 1),
      datasets: [{
        data,
        tension: 0.3
      }]
    }
  });
}

//////////////////////////////////////////////////
// STATS
//////////////////////////////////////////////////
function updateStats() {
  if (!history.length) return;

  const wins = history.filter(h => h.profit > 0).length;
  const winRate = (wins / history.length) * 100;

  document.getElementById("stats").innerHTML =
    `Win Rate: ${winRate.toFixed(1)}%`;
}

//////////////////////////////////////////////////
// STREAK + PROJECTIONS
//////////////////////////////////////////////////
function updateAdvancedStats() {
  if (!history.length) return;

  let current = 0, best = 0, temp = 0;

  history.forEach(h => {
    if (h.profit > 0) {
      temp++;
      if (temp > best) best = temp;
    } else temp = 0;
  });

  for (let i = 0; i < history.length; i++) {
    if (history[i].profit > 0) current++;
    else break;
  }

  const avgProfit = history.reduce((s, h) => s + h.profit, 0) / history.length;
  const projection = avgProfit * 10;

  document.getElementById("projections").innerHTML = `
    🔥 Current Streak: ${current}<br>
    🏆 Best Streak: ${best}<br>
    📈 Avg Profit/Game: $${avgProfit.toFixed(2)}<br>
    🚀 Next 10 Games: $${projection.toFixed(2)}
  `;
}

//////////////////////////////////////////////////
// VOLATILITY
//////////////////////////////////////////////////
function updateRisk() {
  if (history.length < 2) return;

  const profits = history.map(h => h.profit);
  const avg = profits.reduce((a, b) => a + b, 0) / profits.length;

  const variance =
    profits.reduce((sum, p) => sum + Math.pow(p - avg, 2), 0) / profits.length;

  const stdDev = Math.sqrt(variance);

  document.getElementById("risk").innerHTML =
    `Volatility: ${stdDev.toFixed(2)}`;
}

//////////////////////////////////////////////////
// 🧠 CONFIDENCE SCORE
//////////////////////////////////////////////////
function updateConfidence() {
  if (history.length < 5) return;

  const winRate = history.filter(h => h.profit > 0).length / history.length;

  const profits = history.map(h => h.profit);
  const avg = profits.reduce((a, b) => a + b, 0) / profits.length;
  const variance =
    profits.reduce((s, p) => s + Math.pow(p - avg, 2), 0) / profits.length;

  const volatility = Math.sqrt(variance);

  const sampleFactor = Math.min(history.length / 20, 1);

  let confidence = (winRate * 0.5 + (1 / (1 + volatility)) * 0.5) * sampleFactor * 100;

  document.getElementById("confidence").innerHTML =
    `Confidence: ${confidence.toFixed(0)}%`;
}

//////////////////////////////////////////////////
// 🎯 EDGE VS AVERAGE
//////////////////////////////////////////////////
function updateEdge() {
  if (!history.length) return;

  const avgROI = history.reduce((s, h) => s + h.percent, 0) / history.length;

  const baseline = 2; // expected average player ROI
  const edge = avgROI - baseline;

  document.getElementById("edge").innerHTML =
    `Edge: ${edge.toFixed(1)}% vs avg`;
}

//////////////////////////////////////////////////
// INIT
//////////////////////////////////////////////////
render();
drawChart();
drawBankrollChart();
updateStats();
updateAdvancedStats();
updateRisk();
updateConfidence();
updateEdge();