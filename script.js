document.addEventListener("DOMContentLoaded", () => {

  const entryInput = document.getElementById("entry");
  const potInput = document.getElementById("pot");
  const playersInput = document.getElementById("players");
  const memberToggle = document.getElementById("memberToggle");
  const result = document.getElementById("result");
  const historyContainer = document.getElementById("history");

  let history = JSON.parse(localStorage.getItem("stepbetHistory")) || [];

  //////////////////////////////////////////////////
  // CALCULATE
  //////////////////////////////////////////////////
  function calculate() {
    const entry = parseFloat(entryInput.value);
    const pot = parseFloat(potInput.value);
    const players = parseFloat(playersInput.value);

    if (!entry || !pot || !players) {
      result.innerHTML = "<div style='opacity:0.6'>Enter all fields</div>";
      return;
    }

    const adjustedPot = memberToggle.checked ? pot : pot * 0.85;
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
    const roi = (profit / entry) * 100;

    let roiClass = "positive";
    if (roi <= 0) roiClass = "neutral";
    if (roi > 0 && roi < 5) roiClass = "negative";

    result.innerHTML = `
      <div><strong>Payout</strong><br>$${payout.toFixed(2)}</div>
      <div class="${roiClass}">
        <strong>${profit >= 0 ? "+" : ""}$${profit.toFixed(2)}</strong><br>
        ${roi.toFixed(1)}% ROI
      </div>
      ${isDraw ? "<div class='neutral'>Draw / Break-even</div>" : ""}
      ${!memberToggle.checked ? "<div class='negative'>15% fee applied</div>" : ""}
    `;

    result.style.transform = "scale(0.97)";
    setTimeout(() => result.style.transform = "scale(1)", 120);

    saveToHistory({ entry, pot, players, payout, roi });
    renderHistory();
  }

  //////////////////////////////////////////////////
  // SAVE
  //////////////////////////////////////////////////
  function saveToHistory(item) {
    const last = history[0];

    if (
      last &&
      last.entry === item.entry &&
      last.pot === item.pot &&
      last.players === item.players
    ) return;

    history.unshift(item);
    if (history.length > 10) history.pop();

    localStorage.setItem("stepbetHistory", JSON.stringify(history));
  }

  //////////////////////////////////////////////////
  // RENDER HISTORY
  //////////////////////////////////////////////////
  function renderHistory() {
    if (!historyContainer) return;

    if (history.length === 0) {
      historyContainer.innerHTML = `
        <div style="opacity:0.5; font-size:13px;">
          No history yet
        </div>
      `;
      return;
    }

    historyContainer.innerHTML = "";

    history.forEach((h, index) => {
      const div = document.createElement("div");
      div.className = "history-item";

      let color = "#22c55e";
      let badge = "High";

      if (h.roi <= 0) {
        color = "#eab308";
        badge = "Draw";
      } else if (h.roi < 5) {
        color = "#f97316";
        badge = "Low";
      }

      const profit = h.payout - h.entry;

      div.innerHTML = `
        <div style="font-weight:600;">
          $${h.payout.toFixed(0)}
        </div>

        <div style="font-size:11px; color:${color};">
          ${profit >= 0 ? "+" : ""}$${profit.toFixed(0)}
          • ${h.roi >= 0 ? "+" : ""}${h.roi.toFixed(0)}%
        </div>

        <div style="font-size:10px; opacity:0.7;">
          ${badge}
        </div>
      `;

      // Tap = reload
      div.addEventListener("click", () => {
        entryInput.value = h.entry;
        potInput.value = h.pot;
        playersInput.value = h.players;
        calculate();
      });

      // Long press = delete
      let pressTimer;

      div.addEventListener("touchstart", () => {
        pressTimer = setTimeout(() => {
          if (confirm("Delete this entry?")) {
            history.splice(index, 1);
            localStorage.setItem("stepbetHistory", JSON.stringify(history));
            renderHistory();
          }
        }, 600);
      });

      div.addEventListener("touchend", () => clearTimeout(pressTimer));
      div.addEventListener("touchmove", () => clearTimeout(pressTimer));

      historyContainer.appendChild(div);
    });
  }

  //////////////////////////////////////////////////
  // EVENTS
  //////////////////////////////////////////////////
  [entryInput, potInput, playersInput].forEach(input =>
    input.addEventListener("input", calculate)
  );

  memberToggle.addEventListener("change", calculate);

  //////////////////////////////////////////////////
  // INIT
  //////////////////////////////////////////////////
  renderHistory();

});