const playersInput = document.getElementById("players");
const winnersInput = document.getElementById("winners");
const entryInput = document.getElementById("entry");
const toggle = document.getElementById("memberToggle");

const result = document.getElementById("result");
const modeLabel = document.getElementById("modeLabel");
const button = document.getElementById("calcBtn");

// Toggle label
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    modeLabel.textContent = "Mode: Member (no fee)";
  } else {
    modeLabel.textContent = "Mode: Non-member (15% fee)";
  }
});

// Calculate
button.addEventListener("click", () => {
  const players = parseFloat(playersInput.value);
  const winners = parseFloat(winnersInput.value);
  const entry = parseFloat(entryInput.value);
  const isMember = toggle.checked;

  if (!players || !winners || !entry) {
    result.textContent = "Please fill in all fields.";
    return;
  }

  let totalPot = players * entry;

  if (!isMember) {
    totalPot *= 0.85;
  }

  const profitPerWinner = totalPot / winners - entry;

  result.textContent = `Profit per winner: $${profitPerWinner.toFixed(2)}`;
});