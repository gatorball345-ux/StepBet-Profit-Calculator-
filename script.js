const potInput = document.getElementById("pot");
const winnersInput = document.getElementById("winners");
const entryInput = document.getElementById("entry");

const toggle = document.getElementById("memberToggle");
const result = document.getElementById("result");
const modeLabel = document.getElementById("modeLabel");

let history = JSON.parse(localStorage.getItem("stepbetHistory")) || [];

toggle.addEventListener("change", () => {
  modeLabel.textContent = toggle.checked
    ? "Member (no fee)"
    : "Non-member (15% fee)";
  calculate();
});

[entryInput, potInput, winnersInput].forEach(input => {
  input.addEventListener("input", calculate);
});

function calculate() {
  const pot = parseFloat(potInput.value);
  const players = parseFloat(winnersInput.value);
  const entry = parseFloat(entryInput.value);

  if (!pot || !players || !entry) {
    result.innerHTML = "";
    result.className = "";
    return;
  }

  let adjustedPot = toggle.checked ? pot : pot * 0.85;

  const requiredPot = entry * players;

  let payout = adjustedPot <= requiredPot
    ? entry
    : adjustedPot / players;

  payout = Math.round(payout * 100) / 100;
  const profit = Math.round((payout - entry) * 100) / 100;
  const percent = (profit / entry) * 100;

  let badge, color, gradient, glow;

  if (percent <= 0) {
    badge = "Draw";
    color = "#eab308";
    gradient = "linear-gradient(135deg,#eab308,#fde68a)";
    glow = "glow-draw";
  } else if (percent < 5) {
    badge = "Low";
    color = "#f97316";
    gradient = "linear-gradient(135deg,#f97316,#fdba74)";
    glow = "glow-low";
  } else if (percent < 10) {
    badge = "Solid";
    color = "#3b82f6";
    gradient = "linear-gradient(135deg,#3b82f6,#93c5fd)";
    glow = "glow-solid";
  } else {
    badge = "High ROI";
    color = "#22c55e";
    gradient = "linear-gradient(135deg,#22c55e,#86efac)";
    glow = "glow-high";
  }

  result.className = glow;

  result.innerHTML = `
    <div class="payout">$${payout.toFixed(2)}</div>
    <div class="profit" style="color:${color}">
      ${profit >= 0 ? "+" : ""}$${profit.toFixed(2)} (${percent.toFixed(1)}%)
    </div>
    <div class="roi-badge" style="background:${gradient};">${badge}</div>
    ${percent <= 0 ? "<div class='note'>Draw / break-even</div>" : ""}
    ${!toggle.checked ? "<div class='note'>15% fee applied</div>" : ""}
    <div class="legend">
      <span><span class="dot green"></span>High</span>
      <span><span class="dot blue"></span>Solid</span>
      <span><span class="dot orange"></span>Low</span>
      <span><span class="dot yellow"></span>Draw</span>
    </div>
  `;

  save({ entry, pot, players, payout, profit, percent });
  render();
}

function save(item) {
  history.unshift(item);
  if (history.length > 8) history.pop();
  localStorage.setItem("stepbetHistory", JSON.stringify(history));
}

function render() {
  const h = document.getElementById("history");

  h.innerHTML = history.map((x, i) => `
    <div class="history-item" onclick="load(${i})">
      <div>$${x.payout.toFixed(2)}</div>
      <div class="${x.profit >= 0 ? 'pos' : 'neg'}">
        ${x.profit >= 0 ? "+" : ""}$${x.profit.toFixed(2)}
      </div>
    </div>
  `).join("");

  const avg = history.reduce((s, x) => s + x.percent, 0) / history.length || 0;
  document.getElementById("avgROI").innerHTML =
    `Average ROI: <strong>${avg.toFixed(1)}%</strong>`;
}

function load(i) {
  const x = history[i];
  entryInput.value = x.entry;
  potInput.value = x.pot;
  winnersInput.value = x.players;
  calculate();
}

render();