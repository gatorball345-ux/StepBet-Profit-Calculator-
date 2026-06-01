document.addEventListener("DOMContentLoaded", function () {

  const entry = document.getElementById("entry");
  const pot = document.getElementById("pot");
  const players = document.getElementById("players");
  const toggle = document.getElementById("memberToggle");
  const result = document.getElementById("result");
  const label = document.getElementById("modeLabel");
  const calcBtn = document.getElementById("calc");

  //////////////////////////////////////////////////
  // TOGGLE LABEL
  //////////////////////////////////////////////////
  toggle.addEventListener("change", function () {
    label.textContent = toggle.checked
      ? "Member"
      : "Non-Member (-15%)";
  });

  //////////////////////////////////////////////////
  // CALCULATE
  //////////////////////////////////////////////////
  calcBtn.addEventListener("click", function () {

    const e = parseFloat(entry.value);
    const p = parseFloat(pot.value);
    const pl = parseFloat(players.value);

    if (!e || !p || !pl) {
      result.innerHTML = "Enter all fields";
      return;
    }

    // Apply fee
    let adjusted = toggle.checked ? p : p * 0.85;

    // Break-even
    const breakEven = Math.round(adjusted / e);

    // Payout
    let payout = adjusted / pl;
    if (pl === breakEven) payout = e;

    payout = Number(payout.toFixed(2));
    const profit = Number((payout - e).toFixed(2));
    const roi = Number(((profit / e) * 100).toFixed(1));

    //////////////////////////////////////////////////
    // OUTPUT
    //////////////////////////////////////////////////
    result.innerHTML =
      "<div><strong>Payout:</strong> $" + payout + "</div>" +
      "<div class='" + (profit >= 0 ? "positive" : "negative") + "'>" +
      "Break-even: " + breakEven + " → $" + e.toFixed(2) + " (0.0% ROI)<br>" +
      pl + " players: " +
      (profit >= 0 ? "+" : "") +
      "$" + profit + " (" + roi + "% ROI)" +
      "</div>";

  });

});