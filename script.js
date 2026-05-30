const potInput = document.getElementById("pot");
const winnersInput = document.getElementById("winners");
const entryInput = document.getElementById("entry");

const toggle = document.getElementById("memberToggle");
const result = document.getElementById("result");
const modeLabel = document.getElementById("modeLabel");

// 🧠 HISTORY STORAGE
let history = JSON.parse(localStorage.getItem("stepbetHistory")) || [];

// Toggle label
toggle.addEventListener("change", () => {
  modeLabel.textContent = toggle.checked
    ? "Member (no fee)"
    : "Non-member (15% fee)";
  calculate();
});

// Auto calculate
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

  let adjustedPot = pot;

  if (!toggle.checked) {
    adjustedPot *= 0.85;
  }

  const requiredPot = entry * players;

  let payout;
  let isDraw = false;

  if (adjustedPot <= requiredPot) {
    payout = entry;
    isDraw = true;
  } else {
    payout = adjustedPot / players;
  }

  payout = Math.round(payout * 100) / 100;
  const profit = Math.round((payout - entry) * 100) / 100;
  const percent = (profit / entry) * 100;

  // ROI classification
  let badge = "";
  let color = "";
  let gradient = "";
  let glowClass = "";

  if (percent <= 0) {
    badge = "Draw";
    color = "#eab308";
    gradient = "linear-gradient(135deg, #eab308, #fde68a)";
    glowClass = "glow-draw";
  } else if (percent < 5) {
    badge = "Low";
    color = "#f97316";
    gradient = "linear-gradient(135deg, #f97316, #fdba74)";
    glowClass = "glow-low";
  } else if (percent < 10) {
    badge = "Solid";
    color = "#3b82f6";
    gradient = "linear-gradient(135deg, #3b82f6, #93c5fd)";
    glowClass = "glow-solid";
  } else {
    badge = "High ROI";
    color = "#22c55e";
    gradient = "linear-gradient(135deg, #22c55e, #86efac)";
    glowClass = "glow-high";
  }

  result.className = glowClass;

  result.innerHTML = `
    <div class="payout">$${payout.toFixed(2)}</div>

    <div class="profit" style="color:${color}">
      ${profit >= 0 ? "+" : ""}$${profit.toFixed(2)} (${percent.toFixed(1)}%)
    </div>

    <div class="roi-badge" style="background:${gradient};">
      ${badge}
    </div>

    ${isDraw ? "<div class='note'>Draw / break-even</div>" : ""}
    ${!toggle.checked ? "<div class='note'>15% fee applied</div>" : ""}

    <div class="legend">
      <span><span class="dot green"></span>High ROI</span>
      <span><span class="dot blue"></span>Solid</span>
      <span><span class="dot orange"></span>Low</span>
      <span><span class="dot yellow"></span>Draw</span>
    </div>
  `;

  // Save to history
  saveToHistory({
    entry,
    pot,
    players,
    payout,
    profit,
    percent
  });

  renderHistory();

  // animation
  result.style.transform = "scale(0.96)";
  setTimeout(() => {
    result.style.transform = "scale(1)";
  }, 100);
}

// 💾 SAVE
function saveToHistory(item) {
  // prevent duplicates (same calc spam)
  const last = history[0];
  if (last && last.payout === item.payout && last.players === item.players) return;

  history.unshift(item);

  if (history.length > 8) history.pop();

  localStorage.setItem("stepbetHistory", JSON.stringify(history));
}

// 📊 RENDER
function renderHistory() {
  const container = document.getElementById("history");

  if (!container) return;

  container.innerHTML = history.map((h, i) => `
    <div class="history-item" onclick="loadHistory(${i})">
      <div>$${h.payout.toFixed(2)}</div>
      <div class="${h.profit >= 0 ? 'pos' : 'neg'}">
        ${h.profit >= 0 ? "+" : ""}$${h.profit.toFixed(2)}
      </div>
    </div>
  `).join("");
}

// 🔁 LOAD
function loadHistory(index) {
  const h = history[index];

  entryInput.value = h.entry;
  potInput.value = h.pot;
  winnersInput.value = h.players;

  calculate();
}

// INIT
renderHistory();

// Service Worker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker.register("./service-worker.js");
  });
}