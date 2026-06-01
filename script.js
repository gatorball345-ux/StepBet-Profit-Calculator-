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
    if (memberToggle.checked) {
      modeLabel.textContent = "Member";
    } else {
      modeLabel.textContent = "Non-Member (-15%)";
    }
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

    // Apply fee
    let adjustedPot = pot;
    if (!memberToggle.checked) {
      adjustedPot = pot * 0.85;
    }

    // Break-even
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
    // BUILD OUTPUT (SAFE STRING CONCAT)
    //////////////////////////////////////////////////
    let output = "";

    output += "<div><strong>Payout:</strong> $" + payout + "</div>";

    output += "<div class='" + (profit >= 0 ? "positive" : "negative") + "'>";

    output += "Break-even: " + breakEvenPlayers + " players → $" + entry.toFixed(2) + " (0.0% ROI)<br>";

    output += players + " players: " +
      (profit >= 0 ? "+" : "") +
      "$" + profit + " (" + roi + "% ROI)";

    output += "</div>";

    result.innerHTML = output;

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

    for (let i = 0; i < history.length; i++) {
      const h = history[i];
      const div = document.createElement("div");
      div.className = "history-item";
      div.innerText = "$" + h.payout + " (" + h.roi + "% ROI)";
      historyDiv.appendChild(div);
    }
  }

  //////////////////////////////////////////////////
  // EXPORT
  //////////////////////////////////////////////////
  window.exportCSV = function () {
    if (!history.length) {
      alert("No data");
      return;
    }

    let csv = "Entry,Pot,Players,Payout,ROI\n";

    for (let i = 0; i < history.length; i++) {
      const h = history[i];
      csv += h.entry + "," + h.pot + "," + h.players + "," + h.payout + "," + h.roi + "\n";
    }

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

  fileInput.addEventListener("change", function (e) {

    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {

      const rows = event.target.result.split("\n").slice(1);

      history = [];

      for (let i = 0; i < rows.length; i++) {
        const row = rows[i].split(",");
        if (!row[0]) continue;

        history.push({
          entry: +row[0],
          pot: +row[1],
          players: +row[2],
          payout: +row[3],
          roi: +row[4]
        });
      }

      localStorage.setItem("stepbetHistory", JSON.stringify(history));
      renderHistory();
    };

    reader.readAsText(file);
  });

  //////////////////////////////////////////////////
  // INIT
  //////////////////////////////////////////////////
  renderHistory();

});