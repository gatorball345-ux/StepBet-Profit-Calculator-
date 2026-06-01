const entryInput = document.getElementById("entry");
const potInput = document.getElementById("pot");
const playersInput = document.getElementById("players");
const memberToggle = document.getElementById("memberToggle");
const result = document.getElementById("result");

let history = JSON.parse(localStorage.getItem("stepbetHistory")) || [];

// Events
[entryInput, potInput, playersInput].forEach(input => {
  input.addEventListener("input", calculate);
});

memberToggle.addEventListener("change", calculate);

function calculate() {
  const entry = parseFloat(entryInput.value);
  const pot = parseFloat(potInput.value);
  const players = parseFloat(playersInput.value);

  if (!entry || !pot || !players) {
    result.innerHTML = "";
    return;
  }

  const adjustedPot = memberToggle.checked ? pot : pot * 0.85;
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

  const profit = payout - entry;
  const roi = (profit / entry) * 100;

  let roiClass = "positive";
  if (roi <= 0) roiClass = "neutral";
  if (roi > 0 && roi < 5) roiClass = "negative";

  result.innerHTML = `
    <div><strong>Payout</strong><br>$${payout.toFixed(2)}</div>
    <div class="${roiClass}">
      <strong>${profit >= 0 ? "+" : ""}$${profit.toFixed(2)}</strong><br>
      ${roi.toFixed(1)}% ROI
    </div>
    ${isDraw ? "<div class='neutral'>Draw / Break-even</div>" : ""}
    ${!memberToggle.checked ? "<div class='negative'>15% fee applied</div>" : ""}
  `;

  // animation
  result.style.transform = "scale(0.97)";
  setTimeout(() => {
    result.style.transform = "scale(1)";
  }, 120);

  saveToHistory({ entry, pot, players, payout, roi });
  renderHistory();
}

// SAVE
function saveToHistory(item) {
  const last = history[0];
  if (
    last &&
    last.entry === item.entry &&
    last.pot === item.pot &&
    last.players === item.players
  ) return;

  history.unshift(item);

  if (history.length > 10) history.pop();

  localStorage.setItem("stepbetHistory", JSON.stringify(history));
}

// RENDER
function renderHistory() {
  const container = document.getElementById("history");
  if (!container) return;

  container.innerHTML = history.map((h, i) => `
    <div class="history-item" onclick="loadHistory(${i})">
      $${h.payout.toFixed(0)} | ${h.roi.toFixed(0)}%
    </div>
  `).join("");
}

// LOAD
function loadHistory(index) {
  const h = history[index];

  entryInput.value = h.entry;
  potInput.value = h.pot;
  playersInput.value = h.players;

  calculate();
}

// INIT
renderHistory();