document.addEventListener("DOMContentLoaded", () => {

  const entryInput = document.getElementById("entry");
  const potInput = document.getElementById("pot");
  const playersInput = document.getElementById("players");
  const memberToggle = document.getElementById("memberToggle");
  const calculateBtn = document.getElementById("calculateBtn");
  const result = document.getElementById("result");
  const historyDiv = document.getElementById("history");
  const fileInput = document.getElementById("fileInput");
  const modeLabel = document.getElementById("modeLabel");

  let history = JSON.parse(localStorage.getItem("stepbetHistory")) || [];

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
  function calculate() {
    const entry = parseFloat(entryInput.value);
    const pot = parseFloat(potInput.value);
    const players = parseFloat(playersInput.value);

    if (!entry || !pot || !players) {
      result.innerHTML = "Enter all fields";
      return null;
    }

    const adjustedPot = memberToggle.checked ? pot : pot * 0.85;

    //////////////////////////////////////////////////
    // BREAK-EVEN
    //////////////////////////////////////////////////
    const breakEvenPlayers = Math.round(adjustedPot / entry);
    const breakEvenPayout = entry;
    const breakEvenROI = 0.0;

    //////////////////////////////////////////////////
    // ACTUAL RESULT
    //////////////////////////////////////////////////
    let payout = adjustedPot / players;

    if (players === breakEvenPlayers) {
      payout = entry;
    }

    payout = Number(payout.toFixed(2));
    const profit = Number((payout - entry).toFixed(2));
    const roi = Number(((profit / entry) * 100).toFixed(1));

    //////////////////////////////////////////////////
    // DISPLAY LINES
    //////////////////////////////////////////////////
    const breakEvenLine = `
      Break-even: ${breakEvenPlayers} players → $${breakEvenPayout.toFixed(2)} (${breakEvenROI.toFixed(1)}% ROI)
    `;

    const playerLine = `
      ${players} players: ${profit >= 0 ? "+" : ""}$${profit} (${roi}% ROI)
    `;

    //////////////////////////////////////////////////
    // RESULT UI
    //////////////////////////////////////////////////
    result.innerHTML = `
      <div><strong>Payout:</strong> $${payout}</div>

      <div class="${profit >= 0 ? "positive" : "negative"}">
        ${breakEvenLine}<br>
        ${playerLine}
      </div>
    `;

    return { entry, pot, players, payout, roi };
  }

  //////////////////////////////////////////////////
  // BUTTON
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
    historyDiv.innerHTML = "";

    history.forEach(h => {
      const div = document.createElement("div");
      div.className = "history-item";
      div.innerText = `$${h.payout} (${h.roi}% ROI)`;
      historyDiv.appendChild(div);
    });
  }

  //////////////////////////////////////////////////
  // EXPORT
  //////////////////////////////////////////////////
  window.exportCSV = function () {
    if (!history.length) return alert("No data");

    let csv = "Entry,Pot,Players,Payout,ROI\n";

    history.forEach(h => {
      csv += `${h.entry},${h.pot},${h.players},${h.payout},${h.roi}\n`;
    });

    const blob = new Blob([csv], { type: "text/csv" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "stepbet.csv";
    link.click();
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
  // IMPORT
  //////////////////////////////////////////////////
  window.openImport = function () {
    fileInput.click();
  };

  fileInput.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (event) => {
      const rows = event.target.result.split("\n").slice(1);

      history = rows.map(row => {
        const [entry, pot, players, payout, roi] = row.split(",");
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

  renderHistory();

});