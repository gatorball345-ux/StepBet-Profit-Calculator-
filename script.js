document.addEventListener("DOMContentLoaded", () => {

  const entryInput = document.getElementById("entry");
  const potInput = document.getElementById("pot");
  const playersInput = document.getElementById("players");
  const memberToggle = document.getElementById("memberToggle");
  const calculateBtn = document.getElementById("calculateBtn");
  const result = document.getElementById("result");
  const historyContainer = document.getElementById("history");
  const fileInput = document.getElementById("fileInput");

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
      return null;
    }

    const requiredPot = entry * players;

    let payout;
    let isDraw = false;

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
  // BUTTON CLICK (ONLY SAVE HERE)
  //////////////////////////////////////////////////
  calculateBtn.addEventListener("click", () => {
    const data = calculate();
    if (!data) return;

    history.unshift(data);
    if (history.length > 10) history.pop();

    localStorage.setItem("stepbetHistory", JSON.stringify(history));
    renderHistory();
  });

  //////////////////////////////////////////////////
  // HISTORY
  //////////////////////////////////////////////////
  function renderHistory() {
    if (!history.length) {
      historyContainer.innerHTML = "";
      return;
    }

    historyContainer.innerHTML = "";

    history.forEach((h) => {
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
  // CSV EXPORT
  //////////////////////////////////////////////////
  window.exportCSV = function () {
    if (!history.length) return alert("No data");

    let csv = "Entry,Pot,Players,Payout,ROI\n";

    history.forEach(h => {
      csv += [
        h.entry.toFixed(2),
        h.pot.toFixed(2),
        h.players,
        h.payout.toFixed(2),
        h.roi.toFixed(2)
      ].join(",") + "\n";
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "stepbet-history.csv";
    a.click();
  };

  //////////////////////////////////////////////////
  // CLEAR
  //////////////////////////////////////////////////
  window.openClearMenu = function () {
    localStorage.clear();
    location.reload();
  };

  //////////////////////////////////////////////////
  // IMPORT
  //////////////////////////////////////////////////
  window.openImport = function () {
    fileInput.click();
  };

});