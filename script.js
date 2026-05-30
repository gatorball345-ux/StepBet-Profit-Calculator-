const potInput = document.getElementById("pot");
const winnersInput = document.getElementById("winners");
const entryInput = document.getElementById("entry");

const toggle = document.getElementById("memberToggle");
const result = document.getElementById("result");
const modeLabel = document.getElementById("modeLabel");

// Toggle label
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    modeLabel.textContent = "Member (no fee)";
  } else {
    modeLabel.textContent = "Non-member (15% fee)";
  }
});

// Calculate
document.getElementById("calcBtn").addEventListener("click", () => {
  const pot = parseFloat(potInput.value);
  const players = parseFloat(winnersInput.value);
  const entry = parseFloat(entryInput.value);

  if (!pot || !players || !entry) {
    result.innerHTML = "Enter all values.";
    return;
  }

  let adjustedPot = pot;

  if (!toggle.checked) {
    adjustedPot = pot * 0.85;
  }

  const requiredPot = entry * players;

  let payout;
  let isDraw = false;

  if (adjustedPot < requiredPot) {
    payout = entry;
    isDraw = true;
  } else {
    payout = adjustedPot / players;
  }

  payout = Math.round(payout * 100) / 100;
  const profit = Math.round((payout - entry) * 100) / 100;
  const percent = ((profit / entry) * 100);

  let color = "#22c55e";
  if (profit < 0) color = "#ef4444";
  if (profit === 0) color = "#facc15";

  result.innerHTML = `
    <div style="font-size:26px; font-weight:700;">
      $${payout.toFixed(2)}
    </div>
    <div style="margin-top:6px; color:${color}; font-size:16px;">
      ${profit >= 0 ? "+" : ""}$${profit.toFixed(2)} (${percent.toFixed(1)}%)
    </div>
    ${isDraw ? "<div style='margin-top:6px; color:#facc15; font-size:13px;'>Draw / break-even</div>" : ""}
  `;

  // subtle animation
  result.style.transform = "scale(0.95)";
  setTimeout(() => {
    result.style.transform = "scale(1)";
  }, 100);
});