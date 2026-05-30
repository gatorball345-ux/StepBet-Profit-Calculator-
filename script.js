const potInput = document.getElementById("pot");
const winnersInput = document.getElementById("winners");
const entryInput = document.getElementById("entry");
const bankrollInput = document.getElementById("bankroll");
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
  const payout = adjustedPot <= entry*players ? entry : adjustedPot/players;
  const profit = payout - entry;
  const roi = (profit/entry)*100;

  document.getElementById("result").innerHTML =
    `$${payout.toFixed(2)}<br>${profit>=0?"+":""}$${profit.toFixed(2)} (${roi.toFixed(1)}%)`;

  save({entry,pot,players,profit,roi});
  updateAll();
}

//////////////////////////////////////////////////
// SAVE / LOAD
//////////////////////////////////////////////////
function save(item){
  history.unshift(item);
  if(history.length>50) history.pop();
  localStorage.setItem("stepbetHistory",JSON.stringify(history));
}

//////////////////////////////////////////////////
// CORE METRICS
//////////////////////////////////////////////////
function getWinProb(){
  if(history.length<5) return 0.5;
  const winRate = history.filter(h=>h.profit>0).length/history.length;
  const recent = history.slice(0,5);
  const recentRate = recent.filter(h=>h.profit>0).length/5;
  return winRate*0.6 + recentRate*0.4;
}

function getVolatility(){
  const profits = history.map(h=>h.profit);
  const avg = profits.reduce((a,b)=>a+b,0)/profits.length;
  return Math.sqrt(profits.reduce((s,p)=>s+(p-avg)**2,0)/profits.length);
}

function getAvgROI(){
  return history.reduce((s,h)=>s+h.roi,0)/history.length;
}

//////////////////////////////////////////////////
// GAME EV + OPPONENT MODEL
//////////////////////////////////////////////////
function updateEV(){
  const pot = +potInput.value;
  const players = +winnersInput.value;
  const entry = +entryInput.value;
  if(!pot||!players||!entry) return;

  let p = getWinProb();

  // 🧠 opponent difficulty adjustment
  if(players > 300) p -= 0.05;
  if(players < 150) p += 0.05;

  const adjustedPot = toggle.checked ? pot : pot*0.85;
  const payout = adjustedPot/players;

  const EV = (p*(payout-entry)) + ((1-p)*(-entry));

  document.getElementById("gameEV").innerHTML =
    `EV: $${EV.toFixed(2)}<br>${EV>0?"✅ +EV":"❌ -EV"}`;
}

//////////////////////////////////////////////////
// GAME TIER
//////////////////////////////////////////////////
function updateTier(){
  const p = getWinProb();
  const vol = getVolatility();
  const roi = getAvgROI();

  let tier;

  if(roi<=0 || p<0.5) tier="❌ Skip";
  else if(p<0.6 || vol>5) tier="⚠️ Low ($10–$20)";
  else if(p<0.75) tier="⚖️ Mid ($20–$40)";
  else tier="🚀 High ($40–$100)";

  document.getElementById("gameTier").innerHTML = tier;
}

//////////////////////////////////////////////////
// PREDICTION
//////////////////////////////////////////////////
function updatePrediction(){
  const p = getWinProb();
  document.getElementById("prediction").innerHTML =
    `Win Chance: ${(p*100).toFixed(0)}%`;
}

//////////////////////////////////////////////////
// CONFIDENCE + EDGE
//////////////////////////////////////////////////
function updateConfidence(){
  const p = getWinProb();
  const vol = getVolatility();
  const size = Math.min(history.length/20,1);
  const conf = (p*(1/(1+vol)))*size*100;
  document.getElementById("confidence").innerHTML =
    `Confidence: ${conf.toFixed(0)}%`;
}

function updateEdge(){
  const roi = getAvgROI();
  document.getElementById("edge").innerHTML =
    `Edge: ${(roi-2).toFixed(1)}%`;
}

//////////////////////////////////////////////////
// RANKING
//////////////////////////////////////////////////
function updateRanking(){
  const roi = getAvgROI();
  const vol = getVolatility();

  let tier;
  if(roi>8 && vol<3) tier="🏆 Elite (Top 5%)";
  else if(roi>5) tier="Top 10%";
  else if(roi>3) tier="Top 25%";
  else tier="Average";

  document.getElementById("ranking").innerHTML = tier;
}

//////////////////////////////////////////////////
// ALERTS
//////////////////////////////////////////////////
function updateAlerts(){
  const vol = getVolatility();
  const p = getWinProb();

  let alerts=[];

  if(vol>6) alerts.push("⚠️ High volatility");
  if(p>0.75) alerts.push("🔥 Hot streak");
  if(p<0.5) alerts.push("🧊 Cold streak");

  document.getElementById("alerts").innerHTML =
    alerts.join("<br>") || "No alerts";
}

//////////////////////////////////////////////////
// AI INSIGHTS
//////////////////////////////////////////////////
function updateAI(){
  const roi = getAvgROI();
  const vol = getVolatility();

  let text="";

  if(roi>5 && vol<3) text="Strong strategy—scale up.";
  else if(roi>0 && vol>5) text="Profitable but risky.";
  else if(roi<=0) text="Reevaluate approach.";

  document.getElementById("aiInsights").innerHTML = text;
}

//////////////////////////////////////////////////
// UPDATE ALL
//////////////////////////////////////////////////
function updateAll(){
  updatePrediction();
  updateTier();
  updateEV();
  updateConfidence();
  updateEdge();
  updateRanking();
  updateAlerts();
  updateAI();
}

//////////////////////////////////////////////////
// EVENTS
//////////////////////////////////////////////////
[entryInput,potInput,winnersInput].forEach(i=>i.oninput=calculate);
toggle.onchange=calculate;

updateAll();