const potInput = document.getElementById("pot");
const winnersInput = document.getElementById("winners");
const entryInput = document.getElementById("entry");

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
  updateStats();
  updateAdvancedStats();
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
// CHART
//////////////////////////////////////////////////
let chart;

function drawChart() {
  const ctx = document.getElementById("roiChart");
  if (!ctx) return;

  if (chart) chart.destroy();

  chart = new Chart(ctx, {
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
// BASIC STATS
//////////////////////////////////////////////////
function updateStats() {
  if (!history.length) return;

  const wins = history.filter(h => h.profit > 0).length;
  const winRate = (wins / history.length) * 100;

  const member = history.filter(h => h.member).length;
  const nonMember = history.length - member;

  document.getElementById("stats").innerHTML = `
    Win Rate: ${winRate.toFixed(1)}%<br>
    Member: ${member} | Non-member: ${nonMember}
  `;
}

//////////////////////////////////////////////////
// 🔥 ADVANCED: STREAKS + PROJECTIONS
//////////////////////////////////////////////////
function updateAdvancedStats() {
  if (!history.length) return;

  let currentStreak = 0;
  let bestStreak = 0;
  let temp = 0;

  history.forEach(h => {
    if (h.profit > 0) {
      temp++;
      if (temp > bestStreak) bestStreak = temp;
    } else {
      temp = 0;
    }
  });

  for (let i = 0; i < history.length; i++) {
    if (history[i].profit > 0) currentStreak++;
    else break;
  }

  const avgProfit =
    history.reduce((s, h) => s + h.profit, 0) / history.length;

  const projection = avgProfit * 10;

  document.getElementById("projections").innerHTML = `
    🔥 Current Streak: ${currentStreak}<br>
    🏆 Best Streak: ${bestStreak}<br>
    📈 Avg Profit/Game: $${avgProfit.toFixed(2)}<br>
    🚀 Next 10 Games: $${projection.toFixed(2)}
  `;
}

//////////////////////////////////////////////////
// INIT
//////////////////////////////////////////////////
render();
drawChart();
updateStats();
updateAdvancedStats();