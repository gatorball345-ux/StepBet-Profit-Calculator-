document.addEventListener("DOMContentLoaded", function () {

  const entryInput = document.getElementById("entry");
  const potInput = document.getElementById("pot");
  const playersInput = document.getElementById("players");
  const memberToggle = document.getElementById("memberToggle");
  const calculateBtn = document.getElementById("calculateBtn");
  const result = document.getElementById("result");
  const modeLabel = document.getElementById("modeLabel");

  //////////////////////////////////////////////////
  // TOGGLE LABEL
  //////////////////////////////////////////////////
  function updateModeLabel() {
    modeLabel.textContent = memberToggle.checked
      ? "Member"
      : "Non-Member (-15%)";
  }

  updateModeLabel();
  memberToggle.addEventListener("change", updateModeLabel);

  //////////////////////////////////////////////////
  // CALCULATE
  //////////////////////////////////////////////////
  calculateBtn.addEventListener("click", function () {

    const entry = parseFloat(entryInput.value);
    const pot = parseFloat(potInput.value);
    const players = parseFloat(playersInput.value);

    if (!entry || !pot || !players) {
      result.innerHTML = "Enter all fields";
      return;
    }

    // Apply fee
    let adjustedPot = pot;
    if (!memberToggle.checked) {
      adjustedPot = pot * 0.85;
    }

    // Break-even players
    const breakEvenPlayers = Math.round(adjustedPot / entry);

    // Payout
    let payout = adjustedPot / players;
    if (players === breakEvenPlayers) {
      payout = entry;
    }

    payout = Number(payout.toFixed(2));
    const profit = Number((payout - entry).toFixed(2));
    const roi = Number(((profit / entry) * 100).toFixed(1));

    //////////////////////////////////////////////////
    // OUTPUT
    //////////////////////////////////////////////////
    result.innerHTML =
      "<div><strong>Payout:</strong> $" + payout + "</div>" +
      "<div class='" + (profit >= 0 ? "positive" : "negative") + "'>" +
      "Break-even: " + breakEvenPlayers + " players → $" + entry.toFixed(2) + " (0.0% ROI)<br>" +
      players + " players: " +
      (profit >= 0 ? "+" : "") +
      "$" + profit + " (" + roi + "% ROI)" +
      "</div>";
  });

});