const potInput = document.getElementById("pot");
const winnersInput = document.getElementById("winners");
const entryInput = document.getElementById("entry");

const toggle = document.getElementById("memberToggle");
const result = document.getElementById("result");
const modeLabel = document.getElementById("modeLabel");

// Toggle label
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    modeLabel.textContent = "Mode: Member (no fee)";
  } else {
    modeLabel.textContent = "Mode: Non-member (15% fee applied)";
  }
});

// Calculate
document.getElementById("calcBtn").addEventListener("click", () => {
  const pot = parseFloat(potInput.value);
  const winners = parseFloat(winnersInput.value);
  const entry = parseFloat(entryInput.value);

  if (!pot || !winners || !entry) {
    result.textContent = "Please fill all fields.";
    return;
  }

  let adjustedPot = pot;

  // Apply fee ONLY for non-member
  if (!toggle.checked) {
    adjustedPot = pot * 0.85;
  }

  let payout = adjustedPot / winners;

  // ✅ Draw protection (THIS FIXES YOUR ISSUE)
  if (payout < entry) {
    payout = entry;
  }

  payout = Math.round(payout * 100) / 100;
  const profit = Math.round((payout - entry) * 100) / 100;

  result.innerHTML = `
    Payout per winner: $${payout.toFixed(2)} <br>
    Profit: $${profit.toFixed(2)}
  `;
});