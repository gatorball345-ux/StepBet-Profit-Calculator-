const potInput = document.getElementById("pot");
const winnersInput = document.getElementById("winners");
const entryInput = document.getElementById("entry");

const toggle = document.getElementById("memberToggle");
const result = document.getElementById("result");
const modeLabel = document.getElementById("modeLabel");

// Update toggle label
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    modeLabel.textContent = "Mode: Member (no fee)";
  } else {
    modeLabel.textContent = "Mode: Non-member (15% fee applied)";
  }
});

// Calculate button
document.getElementById("calcBtn").addEventListener("click", () => {
  const pot = parseFloat(potInput.value);
  const winners = parseFloat(winnersInput.value);
  const entry = parseFloat(entryInput.value);

  // Validate inputs
  if (!pot || !winners || !entry) {
    result.textContent = "Please fill all fields.";
    return;
  }

  // Apply fee ONLY for non-member games
  let adjustedPot = pot;
  if (!toggle.checked) {
    adjustedPot = pot * 0.85;
  }

  // 🔑 Draw detection (correct + reliable)
  const requiredPot = entry * winners;

  let payout;

  if (adjustedPot < requiredPot) {
    // Draw / break-even case
    payout = entry;
  } else {
    payout = adjustedPot / winners;
  }

  // Round properly
  payout = Math.round(payout * 100) / 100;
  const profit = Math.round((payout - entry) * 100) / 100;

  // Output result
  result.innerHTML = `
    Payout per winner: $${payout.toFixed(2)} <br>
    Profit: $${profit.toFixed(2)}
  `;
});