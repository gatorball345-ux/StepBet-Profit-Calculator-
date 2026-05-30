const potInput = document.getElementById("pot");
const winnersInput = document.getElementById("winners");
const entryInput = document.getElementById("entry");

const toggle = document.getElementById("memberToggle");
const result = document.getElementById("result");
const modeLabel = document.getElementById("modeLabel");

let history = JSON.parse(localStorage.getItem("stepbetHistory")) || [];

// Toggle
toggle.addEventListener("change", () => {
  modeLabel.textContent = toggle.checked
    ? "Member (no fee)"
    : "Non-member (15% fee)";
  calculate();
});

// Inputs
[entryInput, potInput, winnersInput].forEach(i =>
  i.addEventListener("input", calculate)
);

function calculate() {
  const pot = +potInput.value;
  const players = +winnersInput.value;
  const entry = +entryInput.value;

  if (!pot || !players || !entry) {
    result.innerHTML = "";
    return;
  }

  let adjustedPot = toggle.checked ? pot : pot * 0.85;
  let payout = adjustedPot <= entry * players ? entry : adjustedPot / players;

  payout = +payout.toFixed(2);
  const profit = +(payout - entry).toFixed(2);
  const percent = (profit / entry) * 100;

  result.innerHTML = `
    <div class="payout">$${payout.toFixed(2)}</div>
    <div class="profit">${profit >= 0 ? "+" : ""}$${profit.toFixed(2)} (${percent.toFixed(1)}%)</div>
  `;

  save({ entry, pot, players, payout, profit, percent });
  render();
}

// Save
function save(item) {
  history.unshift(item);
  if (history.length > 20) history.pop();
  localStorage.setItem("stepbetHistory", JSON.stringify(history));
}

// Render
function render() {
  document.getElementById("history").innerHTML = history.map((x, i) => `
    <div class="history-item" onclick="load(${i})">
      $${x.payout.toFixed(2)}
    </div>
  `).join("");

  const avg = history.reduce((s, x) => s + x.percent, 0) / history.length || 0;
  document.getElementById("avgROI").innerHTML =
    `Average ROI: ${avg.toFixed(1)}%`;
}

// Load
function load(i) {
  const x = history[i];
  entryInput.value = x.entry;
  potInput.value = x.pot;
  winnersInput.value = x.players;
  calculate();
}

// CLEAR
document.getElementById("clearHistoryBtn").onclick = () => {
  if (confirm("Clear all history?")) {
    history = [];
    localStorage.removeItem("stepbetHistory");
    render();
  }
};

// EXPORT JSON
document.getElementById("exportJSONBtn").onclick = () => {
  const blob = new Blob([JSON.stringify(history)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "history.json";
  a.click();
};

// EXPORT CSV
document.getElementById("exportCSVBtn").onclick = () => {
  const rows = ["Entry,Pot,Winners,Payout,Profit,ROI"];
  history.forEach(h => {
    rows.push(`${h.entry},${h.pot},${h.players},${h.payout},${h.profit},${h.percent.toFixed(2)}`);
  });

  const blob = new Blob([rows.join("\n")], { type: "text/csv" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "history.csv";
  a.click();
};

// IMPORT
document.getElementById("importBtn").onclick = () => {
  document.getElementById("importFile").click();
};

document.getElementById("importFile").addEventListener("change", e => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = e => {
    try {
      const data = JSON.parse(e.target.result);
      history = data;
      localStorage.setItem("stepbetHistory", JSON.stringify(history));
      render();
    } catch {
      alert("Invalid file");
    }
  };
  reader.readAsText(file);
});

// INIT
render();