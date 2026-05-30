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
// IMPORT (JSON + CSV)
//////////////////////////////////////////////////
document.getElementById("importBtn").onclick = () =>
  document.getElementById("importFile").click();

document.getElementById("importFile").onchange = e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();

  reader.onload = e => {
    if (file.name.endsWith(".json")) {
      history = JSON.parse(e.target.result);
    } else {
      const rows = e.target.result.split("\n").slice(1);
      history = rows.map(r => {
        const [entry, pot, players, payout, profit, percent] = r.split(",");
        return { entry:+entry, pot:+pot, players:+players, payout:+payout, profit:+profit, percent:+percent };
      });
    }

    localStorage.setItem("stepbetHistory", JSON.stringify(history));
    render();
    drawChart();
    updateStats();
  };

  reader.readAsText(file);
};

//////////////////////////////////////////////////
// EXPORT
//////////////////////////////////////////////////
document.getElementById("exportBtn").onclick = () => {
  const type = prompt("Export JSON or CSV?");

  if (type === "json") {
    download(JSON.stringify(history), "history.json", "application/json");
  }

  if (type === "csv") {
    let rows = ["entry,pot,players,payout,profit,percent"];
    history.forEach(h => {
      rows.push(`${h.entry},${h.pot},${h.players},${h.payout},${h.profit},${h.percent}`);
    });
    download(rows.join("\n"), "history.csv", "text/csv");
  }
};

function download(data, name, type) {
  const blob = new Blob([data], { type });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = name;
  a.click();
}

//////////////////////////////////////////////////
// CLEAR (ADVANCED + HAPTIC)
//////////////////////////////////////////////////
document.getElementById("clearBtn").onclick = () => {

  if (navigator.vibrate) navigator.vibrate(50);

  const c = prompt("1 ROI\n2 History\n3 Both\n4 Inputs\n5 ALL");

  if (c === "1") document.getElementById("avgROI").innerHTML = "";

  if (c === "2") {
    history = [];
    localStorage.removeItem("stepbetHistory");
  }

  if (c === "3") {
    history = [];
    localStorage.removeItem("stepbetHistory");
    document.getElementById("avgROI").innerHTML = "";
  }

  if (c === "4") {
    entryInput.value = "";
    potInput.value = "";
    winnersInput.value = "";
    result.innerHTML = "";
  }

  if (c === "5") {
    history = [];
    localStorage.clear();
    entryInput.value = "";
    potInput.value = "";
    winnersInput.value = "";
    result.innerHTML = "";
  }

  render();
  drawChart();
  updateStats();
};

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
// STATS
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
// INIT
//////////////////////////////////////////////////
render();
drawChart();
updateStats();