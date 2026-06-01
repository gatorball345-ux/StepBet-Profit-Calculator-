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
  const historyDiv = document.getElementById("history");
  const fileInput = document.getElementById("fileInput");

  //////////////////////////////////////////////////
  // STATE
  //////////////////////////////////////////////////
  let history = JSON.parse(localStorage.getItem("stepbetHistory")) || [];

  //////////////////////////////////////////////////
  // CALCULATE (BUTTON ONLY)
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

    //////////////////////////////////////////////////
    // ✅ ROI FIX (1 decimal like StepBet)
    //////////////////////////////////////////////////
    const roi = Number(((profit / entry) * 100).toFixed(1));

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
  // 🔒 FIX DUPLICATE LISTENERS (CRITICAL)
  //////////////////////////////////////////////////
  calculateBtn.replaceWith(calculateBtn.cloneNode(true));
  const newBtn = document.getElementById("calculateBtn");

  newBtn.addEventListener("click", () => {
    const data = calculate();
    if (!data) return;

    // Prevent duplicate entries
    const last = history[0];
    if (
      last &&
      last.entry === data.entry &&
      last.pot === data.pot &&
      last.players === data.players
    ) return;

    history.unshift(data);
    if (history.length > 10) history.pop();

    localStorage.setItem("stepbetHistory", JSON.stringify(history));
    renderHistory();
  });

  //////////////////////////////////////////////////
  // HISTORY
  //////////////////////////////////////////////////
  function renderHistory() {
    historyDiv.innerHTML = "";

    history.forEach(h => {
      const div = document.createElement("div");
      div.className = "history-item";
      div.innerText = `$${h.payout} (${h.roi}%)`;
      historyDiv.appendChild(div);
    });
  }

  //////////////////////////////////////////////////
  // EXPORT CSV
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
        h.roi.toFixed(1)
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
    localStorage.removeItem("stepbetHistory");
    history = [];
    renderHistory();
  };

  //////////////////////////////////////////////////
  // IMPORT CSV
  //////////////////////////////////////////////////
  window.openImport = function () {
    fileInput.click();
  };

  fileInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {
      const rows = event.target.result.split("\n").slice(1);

      history = rows.map(r => {
        const [entry, pot, players, payout, roi] = r.split(",");
        return {
          entry: +entry,
          pot: +pot,
          players: +players,
          payout: +payout,
          roi: +roi
        };
      }).filter(r => r.entry);

      localStorage.setItem("stepbetHistory", JSON.stringify(history));
      renderHistory();
    };

    reader.readAsText(file);
  });

  //////////////////////////////////////////////////
  // INITIAL LOAD
  //////////////////////////////////////////////////
  renderHistory();

});