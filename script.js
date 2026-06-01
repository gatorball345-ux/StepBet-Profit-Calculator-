document.addEventListener("DOMContentLoaded", () => {

  //////////////////////////////////////////////////
  // ELEMENTS
  //////////////////////////////////////////////////
  const entryInput = document.getElementById("entry");
  const potInput = document.getElementById("pot");
  const playersInput = document.getElementById("players");
  const memberToggle = document.getElementById("memberToggle");
  const calculateBtn = document.getElementById("calculateBtn");
  const result = document.getElementById("result");
  const historyContainer = document.getElementById("history");

  let history = JSON.parse(localStorage.getItem("stepbetHistory")) || [];

  //////////////////////////////////////////////////
  // 🔒 NO AUTO CALCULATIONS — BUTTON ONLY
  //////////////////////////////////////////////////

  function calculate() {
    const entry = parseFloat(entryInput.value);
    const pot = parseFloat(potInput.value);
    const players = parseFloat(playersInput.value);

    if (!entry || !pot || !players) {
      result.innerHTML = "<div style='opacity:0.6'>Enter all fields</div>";
      return null;
    }

    const requiredPot = entry * players;

    let payout;
    let isDraw = false;

    // DRAW CHECK
    if (pot <= requiredPot) {
      payout = entry;
      isDraw = true;
    } else {
      const adjustedPot = memberToggle.checked ? pot : pot * 0.85;
      payout = adjustedPot / players;
    }

    payout = Number(payout.toFixed(2));
    const profit = Number((payout - entry).toFixed(2));
    const roi = Number(((profit / entry) * 100).toFixed(2));

    let roiClass = "positive";
    if (roi <= 0) roiClass = "neutral";
    if (roi > 0 && roi < 5) roiClass = "negative";

    result.innerHTML = `
      <div><strong>Payout</strong><br>$${payout.toFixed(2)}</div>
      <div class="${roiClass}">
        <strong>${profit >= 0 ? "+" : ""}$${profit.toFixed(2)}</strong><br>
        ${roi.toFixed(2)}% ROI
      </div>
      ${isDraw ? "<div class='neutral'>Draw / Break-even</div>" : ""}
      ${!memberToggle.checked ? "<div class='negative'>15% fee applied</div>" : ""}
    `;

    return { entry, pot, players, payout, roi };
  }

  //////////////////////////////////////////////////
  // ✅ ONLY PLACE WHERE CALCULATION HAPPENS
  //////////////////////////////////////////////////
  calculateBtn.addEventListener("click", () => {

    const data = calculate();
    if (!data) return;

    // Save ONLY once
    history.unshift(data);
    if (history.length > 10) history.pop();

    localStorage.setItem("stepbetHistory", JSON.stringify(history));

    renderHistory();
  });

  //////////////////////////////////////////////////
  // HISTORY (PASSIVE ONLY)
  //////////////////////////////////////////////////
  function renderHistory() {
    if (!history.length) {
      historyContainer.innerHTML = "";
      return;
    }

    historyContainer.innerHTML = "";

    history.forEach(h => {
      const div = document.createElement("div");
      div.className = "history-item";

      const profit = h.payout - h.entry;

      div.innerHTML = `
        <div>$${h.payout.toFixed(0)}</div>
        <div style="font-size:11px;">
          ${profit >= 0 ? "+" : ""}$${profit.toFixed(0)} • ${h.roi.toFixed(0)}%
        </div>
      `;

      historyContainer.appendChild(div);
    });
  }

  //////////////////////////////////////////////////
  // INITIAL LOAD
  //////////////////////////////////////////////////
  renderHistory();

});