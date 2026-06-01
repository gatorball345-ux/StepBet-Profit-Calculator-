document.addEventListener("DOMContentLoaded", () => {

  const entryInput = document.getElementById("entry");
  const potInput = document.getElementById("pot");
  const playersInput = document.getElementById("players");
  const memberToggle = document.getElementById("memberToggle");
  const calculateBtn = document.getElementById("calculateBtn");
  const result = document.getElementById("result");
  const historyDiv = document.getElementById("history");

  let history = [];

  //////////////////////////////////////////////////
  // 🚫 NO AUTO EVENTS — NOTHING RUNS EXCEPT BUTTON
  //////////////////////////////////////////////////

  function calculate() {
    const entry = parseFloat(entryInput.value);
    const pot = parseFloat(potInput.value);
    const players = parseFloat(playersInput.value);

    if (!entry || !pot || !players) {
      result.innerHTML = "Enter all fields";
      return null;
    }

    const required = entry * players;

    let payout;
    let isDraw = false;

    if (pot <= required) {
      payout = entry;
      isDraw = true;
    } else {
      const adjustedPot = memberToggle.checked ? pot : pot * 0.85;
      payout = adjustedPot / players;
    }

    payout = Number(payout.toFixed(2));
    const profit = Number((payout - entry).toFixed(2));
    const roi = Number(((profit / entry) * 100).toFixed(2));

    result.innerHTML = `
      <div><strong>Payout:</strong> $${payout}</div>
      <div class="${profit >= 0 ? "positive" : "negative"}">
        ${profit >= 0 ? "+" : ""}$${profit} (${roi}%)
      </div>
      ${isDraw ? "<div class='neutral'>Draw</div>" : ""}
      ${!memberToggle.checked ? "<div class='negative'>15% fee applied</div>" : ""}
    `;

    return { entry, pot, players, payout, roi };
  }

  //////////////////////////////////////////////////
  // ✅ ONLY TRIGGER
  //////////////////////////////////////////////////
  calculateBtn.addEventListener("click", () => {
    const data = calculate();
    if (!data) return;

    history.unshift(data);
    if (history.length > 10) history.pop();

    renderHistory();
  });

  //////////////////////////////////////////////////
  // HISTORY (MANUAL ONLY)
  //////////////////////////////////////////////////
  function renderHistory() {
    historyDiv.innerHTML = "";

    history.forEach(h => {
      const div = document.createElement("div");
      div.innerText = `$${h.payout} (${h.roi}%)`;
      historyDiv.appendChild(div);
    });
  }

});