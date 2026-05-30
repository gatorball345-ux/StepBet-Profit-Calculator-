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
  updateAIInsights();
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

let roiChart, bankrollChart;

function drawChart() {
  const ctx = document.getElementById("roiChart");
  if (!ctx) return;

  if (roiChart) roiChart.destroy();

  roiChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: history.map((_, i) => i + 1),
      datasets: [{ data: history.map(h => h.percent), tension: 0.3 }]
    }
  });
}

function drawBankrollChart() {
  const ctx = document.getElementById("bankrollChart");
  if (!ctx) return;

  if (bankrollChart) bankrollChart.destroy();

  let start = +bankrollInput.value || 0;
  let running = start;

  const data = history.map(h => (running += h.profit));

  bankrollChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: data.map((_, i) => i + 1),
      datasets: [{ data, tension: 0.3 }]
    }
  });
}

function updateStats() {
  if (!history.length) return;
  const wins = history.filter(h => h.profit > 0).length;
  document.getElementById("stats").innerHTML =
    `Win Rate: ${(wins / history.length * 100).toFixed(1)}%`;
}

function updateAdvancedStats() {
  if (!history.length) return;

  let current = 0, best = 0, temp = 0;

  history.forEach(h => {
    if (h.profit > 0) { temp++; best = Math.max(best, temp); }
    else temp = 0;
  });

  for (let h of history) {
    if (h.profit > 0) current++;
    else break;
  }

  const avgProfit = history.reduce((s, h) => s + h.profit, 0) / history.length;

  document.getElementById("projections").innerHTML = `
    🔥 Current: ${current} | 🏆 Best: ${best}<br>
    Avg: $${avgProfit.toFixed(2)} | Next 10: $${(avgProfit*10).toFixed(2)}
  `;
}

function updateRisk() {
  if (history.length < 2) return;

  const profits = history.map(h => h.profit);
  const avg = profits.reduce((a,b)=>a+b)/profits.length;
  const std = Math.sqrt(profits.reduce((s,p)=>s+(p-avg)**2,0)/profits.length);

  document.getElementById("risk").innerHTML = `Volatility: ${std.toFixed(2)}`;
}

function updateConfidence() {
  if (history.length < 5) return;

  const winRate = history.filter(h=>h.profit>0).length/history.length;
  const profits = history.map(h=>h.profit);
  const avg = profits.reduce((a,b)=>a+b)/profits.length;
  const std = Math.sqrt(profits.reduce((s,p)=>s+(p-avg)**2,0)/profits.length);
  const sample = Math.min(history.length/20,1);

  const conf = (winRate*0.5 + (1/(1+std))*0.5) * sample * 100;

  document.getElementById("confidence").innerHTML =
    `Confidence: ${conf.toFixed(0)}%`;
}

function updateEdge() {
  if (!history.length) return;
  const avgROI = history.reduce((s,h)=>s+h.percent,0)/history.length;
  document.getElementById("edge").innerHTML =
    `Edge: ${(avgROI-2).toFixed(1)}% vs avg`;
}

//////////////////////////////////////////////////
// 🧠 AI INSIGHTS
//////////////////////////////////////////////////
function updateAIInsights() {
  if (history.length < 5) {
    document.getElementById("aiInsights").innerHTML =
      "Add more games to unlock insights.";
    return;
  }

  const avgROI = history.reduce((s,h)=>s+h.percent,0)/history.length;
  const wins = history.filter(h=>h.profit>0).length/history.length;

  const profits = history.map(h=>h.profit);
  const avg = profits.reduce((a,b)=>a+b)/profits.length;
  const std = Math.sqrt(profits.reduce((s,p)=>s+(p-avg)**2,0)/profits.length);

  const edge = avgROI - 2;

  let insights = [];

  if (edge > 5) insights.push("🚀 Strong edge");
  else if (edge > 0) insights.push("✅ Slight edge");
  else insights.push("⚠️ No edge");

  if (std < 2) insights.push("🟢 Very consistent");
  else if (std < 5) insights.push("🔵 Moderate variance");
  else insights.push("🔴 High volatility");

  if (wins > 0.75) insights.push("🔥 Excellent win rate");
  else if (wins > 0.6) insights.push("👍 Solid win rate");
  else insights.push("⚠️ Improve win rate");

  if (std > 5 && edge > 0)
    insights.push("⚠️ Profitable but unstable");

  const recent = history.slice(0,5);
  const recentROI = recent.reduce((s,h)=>s+h.percent,0)/recent.length;

  if (recentROI > avgROI) insights.push("📈 Trending up");
  else insights.push("📉 Trending down");

  if (edge > 5 && std < 3)
    insights.push("💡 Scale up");
  else if (edge > 0 && std > 5)
    insights.push("💡 Reduce risk");
  else if (edge <= 0)
    insights.push("💡 Rethink strategy");

  document.getElementById("aiInsights").innerHTML =
    insights.join("<br>");
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
updateAIInsights();