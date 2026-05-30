const potInput = document.getElementById("pot");
const winnersInput = document.getElementById("winners");
const entryInput = document.getElementById("entry");
const toggle = document.getElementById("memberToggle");
const result = document.getElementById("result");

let history = JSON.parse(localStorage.getItem("stepbetHistory")) || [];

toggle.onchange = calculate;
[entryInput, potInput, winnersInput].forEach(i => i.oninput = calculate);

function calculate() {
  const pot = +potInput.value;
  const players = +winnersInput.value;
  const entry = +entryInput.value;

  if (!pot || !players || !entry) return;

  const adjustedPot = toggle.checked ? pot : pot * 0.85;
  const payout = adjustedPot <= entry * players ? entry : adjustedPot / players;

  const profit = +(payout - entry).toFixed(2);
  const percent = (profit / entry) * 100;

  result.innerHTML = `
    <div>$${payout.toFixed(2)}</div>
    <div>${profit >= 0 ? "+" : ""}$${profit} (${percent.toFixed(1)}%)</div>
  `;

  save({ entry, pot, players, payout, profit, percent });

  render();
  updatePrediction();
  updateGameTier();
}

function save(item) {
  history.unshift(item);
  if (history.length > 50) history.pop();
  localStorage.setItem("stepbetHistory", JSON.stringify(history));
}

function render() {
  document.getElementById("history").innerHTML =
    history.map((h, i) =>
      `<div class="history-item" onclick="load(${i})">$${h.payout.toFixed(2)}</div>`
    ).join("");
}

function load(i) {
  const h = history[i];
  entryInput.value = h.entry;
  potInput.value = h.pot;
  winnersInput.value = h.players;
  calculate();
}

//////////////////////////////////////////////////
// 🔮 WIN PROBABILITY
//////////////////////////////////////////////////
function getWinProbability() {
  if (history.length < 5) return 0.5;

  const wins = history.filter(h => h.profit > 0).length;
  const winRate = wins / history.length;

  const recent = history.slice(0,5);
  const recentRate =
    recent.filter(h => h.profit > 0).length / recent.length;

  return (winRate * 0.6) + (recentRate * 0.4);
}

function updatePrediction() {
  const p = getWinProbability();
  document.getElementById("prediction").innerHTML =
    `🎯 Win Probability: ${(p*100).toFixed(0)}%`;
}

//////////////////////////////////////////////////
// 🎯 GAME TIER SYSTEM (REPLACES KELLY)
//////////////////////////////////////////////////
function updateGameTier() {
  if (history.length < 5) {
    document.getElementById("gameTier").innerHTML =
      "Play more games to unlock recommendations.";
    return;
  }

  const p = getWinProbability();

  const profits = history.map(h => h.profit);
  const avg = profits.reduce((a,b)=>a+b)/profits.length;
  const std = Math.sqrt(profits.reduce((s,p)=>s+(p-avg)**2,0)/profits.length);

  const avgROI = history.reduce((s,h)=>s+h.percent,0)/history.length;

  let recommendation;
  let tier;
  let explanation;

  if (avgROI <= 0 || p < 0.5) {
    tier = "❌ Skip Games";
    explanation = "Negative edge or low probability";
  }
  else if (p < 0.6 || std > 5) {
    tier = "⚠️ Low Tier ($10–$20)";
    explanation = "Unstable or moderate performance";
  }
  else if (p < 0.75) {
    tier = "⚖️ Mid Tier ($20–$40)";
    explanation = "Decent edge, manageable risk";
  }
  else {
    tier = "🚀 High Tier ($40–$100)";
    explanation = "Strong edge and consistency";
  }

  document.getElementById("gameTier").innerHTML = `
    🎯 Recommended: ${tier}<br>
    ${explanation}
  `;
}

//////////////////////////////////////////////////
// INIT
//////////////////////////////////////////////////
render();
updatePrediction();
updateGameTier();