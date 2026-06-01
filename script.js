const entryInput = document.getElementById("entry");
const potInput = document.getElementById("pot");
const playersInput = document.getElementById("players");
const memberToggle = document.getElementById("memberToggle");
const result = document.getElementById("result");

// Event listeners
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

  // Apply fee if non-member
  const adjustedPot = memberToggle.checked ? pot : pot * 0.85;

  const requiredPot = entry * players;

  let payout;
  let isDraw = false;

  // ✅ CORRECT DRAW LOGIC
  if (adjustedPot <= requiredPot) {
    payout = entry;
    isDraw = true;
  } else {
    payout = adjustedPot / players;
  }

  // Round to cents
  payout = Math.round(payout * 100) / 100;

  const profit = payout - entry;
  const roi = (profit / entry) * 100;

  // ROI color logic
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

  // subtle animation
  result.style.transform = "scale(0.97)";
  setTimeout(() => {
    result.style.transform = "scale(1)";
  }, 120);
}