const entryInput = document.getElementById("entry");
const potInput = document.getElementById("pot");
const playersInput = document.getElementById("players");
const memberToggle = document.getElementById("memberToggle");
const modeToggle = document.getElementById("modeToggle");

const result = document.getElementById("result");
const advancedSection = document.getElementById("advancedSection");

let history = JSON.parse(localStorage.getItem("stepbetHistory")) || [];

//////////////////////////////////////////////////
// LOAD MODE
//////////////////////////////////////////////////
const savedMode = localStorage.getItem("mode");

if (savedMode === "advanced") {
  modeToggle.checked = true;
  advancedSection.classList.add("active");
}

//////////////////////////////////////////////////
// MODE TOGGLE
//////////////////////////////////////////////////
modeToggle.addEventListener("change", () => {
  if (modeToggle.checked) {
    advancedSection.classList.add("active");
    localStorage.setItem("mode", "advanced");
    updateAdvanced();
  } else {
    advancedSection.classList.remove("active");
    localStorage.setItem("mode", "simple");
  }
});

//////////////////////////////////////////////////
// CALCULATE
//////////////////////////////////////////////////
function calculate() {
  const entry = parseFloat(entryInput.value);
  const pot = parseFloat(potInput.value);
  const players = parseFloat(playersInput.value);

  if (!entry || !pot || !players) {
    result.innerHTML = "";
    return;
  }

  let adjustedPot = memberToggle.checked ? pot : pot * 0.85;
  const requiredPot = entry * players;

  let payout;
  let isDraw = false;

  if (adjustedPot <= requiredPot) {
    payout = entry;
    isDraw = true;
  } else {
    payout = adjustedPot / players;
  }

  const profit = payout - entry;
  const roi = (profit / entry) * 100;

  // 🎨 COLOR + GLOW
  let colorClass = "green";
  if (roi <= 0) colorClass = "yellow";
  if (roi < 5 && roi > 0) colorClass = "orange";

  result.className = "glow";

  result.innerHTML = `
    <div>$${payout.toFixed(2)}</div>
    <div class="${colorClass}">
      ${profit >= 0 ? "+" : ""}$${profit.toFixed(2)} (${roi.toFixed(1)}%)
    </div>
    ${isDraw ? "<div class='yellow'>Draw / Break-even</div>" : ""}
  `;

  // micro animation
  result.style.transform = "scale(0.96)";
  setTimeout(() => result.style.transform = "scale(1)", 100);

  save({ profit, roi });

  if (modeToggle.checked) updateAdvanced();
}

//////////////////////////////////////////////////
// SAVE
//////////////////////////////////////////////////
function save(item) {
  history.unshift(item);
  if (history.length > 50) history.pop();
  localStorage.setItem("stepbetHistory", JSON.stringify(history));
}

//////////////////////////////////////////////////
// ADVANCED
//////////////////////////////////////////////////
function getWinProb() {
  if (history.length < 5) return 0.5;
  const wins = history.filter(h => h.profit > 0).length;
  return wins / history.length;
}

function getAvgROI() {
  if (!history.length) return 0;
  return history.reduce((s,h)=>s+h.roi,0)/history.length;
}

function updateAdvanced() {
  const p = getWinProb();
  const roi = getAvgROI();

  document.getElementById("prediction").innerHTML =
    `Win Probability: ${(p*100).toFixed(0)}%`;

  document.getElementById("gameTier").innerHTML =
    p < 0.5 ? "❌ Skip" :
    p < 0.7 ? "⚖️ Mid Tier" :
    "🚀 High Tier";

  document.getElementById("confidence").innerHTML =
    `Confidence: ${(p*100).toFixed(0)}%`;

  document.getElementById("edge").innerHTML =
    `Edge: ${(roi-2).toFixed(1)}%`;

  document.getElementById("ranking").innerHTML =
    roi > 5 ? "Top 10%" : "Average";

  document.getElementById("alerts").innerHTML =
    p > 0.75 ? "🔥 Hot streak" : "Stable";

  document.getElementById("aiInsights").innerHTML =
    roi > 5 ? "Scale up" :
    roi > 0 ? "Be cautious" :
    "Reevaluate";
}

//////////////////////////////////////////////////
// EVENTS
//////////////////////////////////////////////////
[entryInput, potInput, playersInput].forEach(i =>
  i.addEventListener("input", calculate)
);

memberToggle.addEventListener("change", calculate);