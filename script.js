const potInput = document.getElementById("pot");
const winnersInput = document.getElementById("winners");
const entryInput = document.getElementById("entry");

const toggle = document.getElementById("memberToggle");
const result = document.getElementById("result");
const modeLabel = document.getElementById("modeLabel");

// Auto focus
entryInput.focus();

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

// Input flow
entryInput.addEventListener("keydown", e => {
  if (e.key === "Enter") potInput.focus();
});

potInput.addEventListener("keydown", e => {
  if (e.key === "Enter") winnersInput.focus();
});

function calculate() {
  const pot = parseFloat(potInput.value);
  const players = parseFloat(winnersInput.value);
  const entry = parseFloat(entryInput.value);

  if (!pot || !players || !entry) {
    result.innerHTML = "";
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

  let color = "#22c55e";
  if (profit < 0) color = "#ef4444";
  if (profit === 0) color = "#eab308";

  result.innerHTML = `
    <div class="payout">$${payout.toFixed(2)}</div>
    <div class="profit" style="color:${color}">
      ${profit >= 0 ? "+" : ""}$${profit.toFixed(2)} (${percent.toFixed(1)}%)
    </div>
    ${isDraw ? "<div class='note'>Draw / break-even</div>" : ""}
    ${!toggle.checked ? "<div class='note'>15% fee applied</div>" : ""}
  `;

  // subtle animation
  result.style.transform = "scale(0.96)";
  setTimeout(() => {
    result.style.transform = "scale(1)";
  }, 100);
}
