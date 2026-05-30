const potInput = document.getElementById("pot");
const winnersInput = document.getElementById("winners");
const entryInput = document.getElementById("entry");
const toggle = document.getElementById("memberToggle");

let history = JSON.parse(localStorage.getItem("stepbetHistory")) || [];

//////////////////////////////////////////////////
// MAIN CALC
//////////////////////////////////////////////////
function calculate() {
  const pot = +potInput.value;
  const players = +winnersInput.value;
  const entry = +entryInput.value;

  if (!pot || !players || !entry) return;

  const adjustedPot = toggle.checked ? pot : pot * 0.85;
  const payout = adjustedPot <= entry * players ? entry : adjustedPot / players;

  const profit = payout - entry;
  const roi = (profit / entry) * 100;

  document.getElementById("result").innerHTML =
    `$${payout.toFixed(2)}<br>${profit >= 0 ? "+" : ""}$${profit.toFixed(2)} (${roi.toFixed(1)}%)`;

  save({ entry, pot, players, profit, roi });

  updateAll();
}

//////////////////////////////////////////////////
// SAVE / LOAD
//////////////////////////////////////////////////
function save(item) {
  history.unshift(item);
  if (history.length > 50) history.pop();
  localStorage.setItem("stepbetHistory", JSON.stringify(history));
}

//////////////////////////////////////////////////
// CORE METRICS
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
  const avg = profits.reduce((a, b) => a + b, 0) / profits.length;
  return Math.sqrt(profits.reduce((s, p) => s + (p - avg) ** 2, 0) / profits.length);
}

function getAvgROI() {
  if (!history.length) return 0;
  return history.reduce((s, h) => s + h.roi, 0) / history.length;
}

//////////////////////////////////////////////////
// PREDICTION
//////////////////////////////////////////////////
function updatePrediction() {
  const p = getWinProb();
  document.getElementById("prediction").innerHTML =
    `🎯 Win Probability: ${(p * 100).toFixed(0)}%`;
}

//////////////////////////////////////////////////
// GAME TIER
//////////////////////////////////////////////////
function updateTier() {
  const p = getWinProb();
  const vol = getVolatility();
  const roi = getAvgROI();

  let tier;

  if (roi <= 0 || p < 0.5) tier = "❌ Skip Games";
  else if (p < 0.6 || vol > 5) tier = "⚠️ Low Tier ($10–$20)";
  else if (p < 0.75) tier = "⚖️ Mid Tier ($20–$40)";
  else tier = "🚀 High Tier ($40–$100)";

  document.getElementById("gameTier").innerHTML = tier;
}

//////////////////////////////////////////////////
// GAME EV + OPPONENT ADJUST
//////////////////////////////////////////////////
function updateEV() {
  const pot = +potInput.value;
  const players = +winnersInput.value;
  const entry = +entryInput.value;

  if (!pot || !players || !entry) return;

  let p = getWinProb();

  if (players > 300) p -= 0.05;
  if (players < 150) p += 0.05;

  const adjustedPot = toggle.checked ? pot : pot * 0.85;
  const payout = adjustedPot / players;

  const EV = (p * (payout - entry)) + ((1 - p) * (-entry));

  document.getElementById("gameEV").innerHTML =
    `🎯 EV: $${EV.toFixed(2)}<br>${EV > 0 ? "✅ +EV" : "❌ -EV"}`;
}

//////////////////////////////////////////////////
// EFFICIENCY
//////////////////////////////////////////////////
function updateEfficiency() {
  const pot = +potInput.value;
  const players = +winnersInput.value;
  const entry = +entryInput.value;

  if (!pot || !players || !entry) return;

  const adjustedPot = toggle.checked ? pot : pot * 0.85;
  const efficiency = adjustedPot / (entry * players);

  let label;

  if (efficiency > 1.1) label = "🚀 Very Favorable";
  else if (efficiency > 1.0) label = "✅ Favorable";
  else if (efficiency > 0.95) label = "⚖️ Neutral";
  else label = "❌ Poor Game";

  document.getElementById("efficiency").innerHTML =
    `Game Efficiency: ${efficiency.toFixed(2)}<br>${label}`;
}

//////////////////////////////////////////////////
// LOSS RISK
//////////////////////////////////////////////////
function updateLossRisk() {
  if (history.length < 5) return;

  const p = getWinProb();
  const lossStreak = Math.pow((1 - p), 3);

  let label;

  if (lossStreak > 0.25) label = "⚠️ High Risk";
  else if (lossStreak > 0.15) label = "⚖️ Moderate Risk";
  else label = "✅ Low Risk";

  document.getElementById("lossRisk").innerHTML =
    `3-Game Loss Risk: ${(lossStreak * 100).toFixed(0)}%<br>${label}`;
}

//////////////////////////////////////////////////
// EXPOSURE
//////////////////////////////////////////////////
function updateExposure() {
  const active = history.slice(0, 5).length;

  let msg;

  if (active >= 5) msg = "🧊 Too many games";
  else if (active >= 3) msg = "⚠️ Moderate exposure";
  else msg = "✅ Safe exposure";

  document.getElementById("exposure").innerHTML =
    `Active Games: ${active}<br>${msg}`;
}

//////////////////////////////////////////////////
// CONFIDENCE
//////////////////////////////////////////////////
function updateConfidence() {
  const p = getWinProb();
  const vol = getVolatility();
  const size = Math.min(history.length / 20, 1);

  const conf = (p * (1 / (1 + vol))) * size * 100;

  document.getElementById("confidence").innerHTML =
    `Confidence: ${conf.toFixed(0)}%`;
}

//////////////////////////////////////////////////
// EDGE
//////////////////////////////////////////////////
function updateEdge() {
  const roi = getAvgROI();
  document.getElementById("edge").innerHTML =
    `Edge: ${(roi - 2).toFixed(1)}%`;
}

//////////////////////////////////////////////////
// RANKING
//////////////////////////////////////////////////
function updateRanking() {
  const roi = getAvgROI();
  const vol = getVolatility();

  let rank;

  if (roi > 8 && vol < 3) rank = "🏆 Elite (Top 5%)";
  else if (roi > 5) rank = "Top 10%";
  else if (roi > 3) rank = "Top 25%";
  else rank = "Average";

  document.getElementById("ranking").innerHTML = rank;
}

//////////////////////////////////////////////////
// ALERTS
//////////////////////////////////////////////////
function updateAlerts() {
  const p = getWinProb();
  const vol = getVolatility();

  let alerts = [];

  if (p > 0.75) alerts.push("🔥 Hot streak");
  if (p < 0.5) alerts.push("🧊 Cold streak");
  if (vol > 6) alerts.push("⚠️ High volatility");

  document.getElementById("alerts").innerHTML =
    alerts.join("<br>") || "No alerts";
}

//////////////////////////////////////////////////
// AI INSIGHTS
//////////////////////////////////////////////////
function updateAI() {
  const roi = getAvgROI();
  const vol = getVolatility();

  let msg;

  if (roi > 5 && vol < 3) msg = "Strong strategy — scale up.";
  else if (roi > 0 && vol > 5) msg = "Profitable but volatile.";
  else if (roi <= 0) msg = "Reevaluate approach.";
  else msg = "Stable performance.";

  document.getElementById("aiInsights").innerHTML = msg;
}

//////////////////////////////////////////////////
// UPDATE ALL
//////////////////////////////////////////////////
function updateAll() {
  updatePrediction();
  updateTier();
  updateEV();
  updateEfficiency();
  updateLossRisk();
  updateExposure();
  updateConfidence();
  updateEdge();
  updateRanking();
  updateAlerts();
  updateAI();
}

//////////////////////////////////////////////////
// EVENTS
//////////////////////////////////////////////////
[entryInput, potInput, winnersInput].forEach(i => i.oninput = calculate);
toggle.onchange = calculate;

updateAll();