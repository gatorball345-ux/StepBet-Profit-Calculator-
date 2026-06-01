document.addEventListener("DOMContentLoaded", function () {

  const entry = document.getElementById("entry");
  const pot = document.getElementById("pot");
  const players = document.getElementById("players");
  const toggle = document.getElementById("memberToggle");
  const result = document.getElementById("result");
  const label = document.getElementById("modeLabel");
  const button = document.getElementById("calc");

  // Toggle label
  toggle.addEventListener("change", function () {
    if (toggle.checked) {
      label.textContent = "Member";
    } else {
      label.textContent = "Non-Member (-15%)";
    }
  });

  // Calculate button
  button.addEventListener("click", function () {

    const e = parseFloat(entry.value);
    const p = parseFloat(pot.value);
    const pl = parseFloat(players.value);

    if (!e || !p || !pl) {
      result.innerHTML = "Enter all fields";
      return;
    }

    // Apply 15% fee if NON-member
    let adjusted = toggle.checked ? p : p * 0.85;

    const breakEven = Math.round(adjusted / e);

    let payout = adjusted / pl;
    if (pl === breakEven) payout = e;

    payout = Number(payout.toFixed(2));
    const profit = Number((payout - e).toFixed(2));
    const roi = Number(((profit / e) * 100).toFixed(1));

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