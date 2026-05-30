const entryInput = document.getElementById("entry");
const potInput = document.getElementById("pot");
const playersInput = document.getElementById("players");
const memberToggle = document.getElementById("memberToggle");
const modeToggle = document.getElementById("modeToggle");

const result = document.getElementById("result");
const advancedSection = document.getElementById("advancedSection");

let history = JSON.parse(localStorage.getItem("stepbetHistory")) || [];

//////////////////////////////////////////////////
// MODE TOGGLE
//////////////////////////////////////////////////
modeToggle.addEventListener("change", () => {
  if (modeToggle.checked) {
    advancedSection.classList.remove("hidden");
  } else {
    advancedSection.classList.add("hidden");
  }
});

// default = SIMPLE
advancedSection.classList.add("hidden");

//////////////////////////////////////////////////
// MAIN CALC (SIMPLE CORE)
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

  payout = Math.round(payout * 100) / 100;

  const profit = payout - entry;
  const percent = (profit / entry) * 100;

  result.innerHTML = `
    <div><strong>Payout:</strong> $${payout.toFixed(2)}</div>
    <div><strong>Profit:</strong> ${profit >= 0 ? "+" : ""}$${profit.toFixed(2)}</div>
    <div><strong>ROI:</strong> ${percent.toFixed(1)}%</div>
    ${isDraw ? "<div style='color:#eab308;'>Draw / Break-even</div>" : ""}
    ${!memberToggle.checked ? "<div style='color:#f97316;'>15% fee applied</div>" : ""}
  `;

  save({ profit, roi: percent });

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
// ADVANCED ENGINE
//////////////////////////////////////////////////
function getWinProb() {
  if (history.length < 5) return 0.5;

  const wins = history.filter(h => h.profit > 0).length;
  const winRate = wins / history.length;

  const recent = history.slice(0, 5);
  const recentRate = recent.filter(h => h.profit > 0).length / recent.length;

  return winRate * 0.6 + recentRate * 0.4;
}

function getVolatility() {
  const profits = history.map(h => h.profit);
  const avg = profits.reduce((a,b)=>a+b,0)/profits.length;
  return Math.sqrt(profits.reduce((s,p)=>s+(p-avg)**2,0)/profits.length);
}

function getAvgROI() {
  if (!history.length) return 0;
  return history.reduce((s,h)=>s+h.roi,0)/history.length;
}

//////////////////////////////////////////////////
// ADVANCED UPDATES
//////////////////////////////////////////////////
function updateAdvanced() {
  const p = getWinProb();
  const vol = getVolatility();
  const roi = getAvgROI();

  document.getElementById("prediction").innerHTML =
    `Win Probability: ${(p*100).toFixed(0)}%`;

  document.getElementById("gameTier").innerHTML =
    p < 0.5 ? "❌ Skip" :
    p < 0.6 ? "⚠️ Low Tier" :
    p < 0.75 ? "⚖️ Mid Tier" :
    "🚀 High Tier";

  document.getElementById("confidence").innerHTML =
    `Confidence: ${(p*(1/(1+vol))*100).toFixed(0)}%`;

  document.getElementById("edge").innerHTML =
    `Edge: ${(roi-2).toFixed(1)}%`;

  document.getElementById("ranking").innerHTML =
    roi > 5 ? "Top 10%" : "Average";

  document.getElementById("alerts").innerHTML =
    vol > 6 ? "⚠️ High volatility" : "Stable";

  document.getElementById("aiInsights").innerHTML =
    roi > 5 ? "Scale up" :
    roi > 0 ? "Be cautious" :
    "Reevaluate";
}

//////////////////////////////////////////////////
// EVENTS
//////////////////////////////////////////////////
[entryInput, potInput, playersInput].forEach(i => i.addEventListener("input", calculate));
memberToggle.addEventListener("change", calculate);