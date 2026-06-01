function updateMode() {
  const toggle = document.getElementById("memberToggle");
  const label = document.getElementById("modeLabel");

  label.textContent = toggle.checked
    ? "Member"
    : "Non-Member (-15%)";
}

function calculate() {

  const entry = parseFloat(document.getElementById("entry").value);
  const pot = parseFloat(document.getElementById("pot").value);
  const players = parseFloat(document.getElementById("players").value);
  const toggle = document.getElementById("memberToggle");
  const result = document.getElementById("result");

  if (!entry || !pot || !players) {
    result.innerHTML = "Enter all fields";
    return;
  }

  // Apply fee
  let adjusted = toggle.checked ? pot : pot * 0.85;

  const breakEven = Math.round(adjusted / entry);

  let payout = adjusted / players;
  if (players === breakEven) payout = entry;

  payout = Number(payout.toFixed(2));
  const profit = Number((payout - entry).toFixed(2));
  const roi = Number(((profit / entry) * 100).toFixed(1));

  result.innerHTML =
    "<div><strong>Payout:</strong> $" + payout + "</div>" +
    "<div class='" + (profit >= 0 ? "positive" : "negative") + "'>" +
    "Break-even: " + breakEven + " → $" + entry.toFixed(2) + " (0.0% ROI)<br>" +
    players + " players: " +
    (profit >= 0 ? "+" : "") +
    "$" + profit + " (" + roi + "% ROI)" +
    "</div>";
}