document.addEventListener("DOMContentLoaded", () => {

  const entryInput = document.getElementById("entry");
  const potInput = document.getElementById("pot");
  const playersInput = document.getElementById("players");
  const memberToggle = document.getElementById("memberToggle");
  const result = document.getElementById("result");
  const historyContainer = document.getElementById("history");
  const fileInput = document.getElementById("fileInput");

  let history = JSON.parse(localStorage.getItem("stepbetHistory")) || [];

  //////////////////////////////////////////////////
  // CALCULATE (WITH 15% FIX)
  //////////////////////////////////////////////////
  function calculate() {
    const entry = parseFloat(entryInput.value);
    const pot = parseFloat(potInput.value);
    const players = parseFloat(playersInput.value);

    if (!entry || !pot || !players) {
      result.innerHTML = "<div style='opacity:0.6'>Enter all fields</div>";
      return;
    }

    // ✅ 15% fee logic
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

    saveToHistory({ entry, pot, players, payout, roi });
    renderHistory();
  }

  function saveToHistory(item) {
    const last = history[0];
    if (last && last.entry === item.entry && last.pot === item.pot && last.players === item.players) return;

    history.unshift(item);
    if (history.length > 10) history.pop();

    localStorage.setItem("stepbetHistory", JSON.stringify(history));
  }

  function renderHistory() {
    if (!historyContainer) return;

    if (history.length === 0) {
      historyContainer.innerHTML = `<div style="opacity:0.5;">No history yet</div>`;
      return;
    }

    historyContainer.innerHTML = "";

    history.forEach((h, index) => {
      const div = document.createElement("div");
      div.className = "history-item";

      let color = "#22c55e";
      if (h.roi <= 0) color = "#eab308";
      else if (h.roi < 5) color = "#f97316";

      const profit = h.payout - h.entry;

      div.innerHTML = `
        <div>$${h.payout.toFixed(0)}</div>
        <div style="color:${color}; font-size:11px;">
          ${profit >= 0 ? "+" : ""}$${profit.toFixed(0)} • ${h.roi.toFixed(0)}%
        </div>
      `;

      div.addEventListener("click", () => {
        entryInput.value = h.entry;
        potInput.value = h.pot;
        playersInput.value = h.players;
        calculate();
      });

      let timer;
      div.addEventListener("touchstart", (e) => {
        e.preventDefault();
        timer = setTimeout(() => {
          if (confirm("Delete this entry?")) {
            history.splice(index, 1);
            localStorage.setItem("stepbetHistory", JSON.stringify(history));
            renderHistory();
          }
        }, 600);
      }, { passive: false });

      div.addEventListener("touchend", () => clearTimeout(timer));
      div.addEventListener("touchmove", () => clearTimeout(timer));

      historyContainer.appendChild(div);
    });
  }

  fileInput.addEventListener("change", function (e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = function (event) {
      const rows = event.target.result.split("\n").slice(1);

      const parsed = rows.map(r => {
        const [entry, pot, players, payout, roi] = r.split(",");
        return {
          entry: +entry,
          pot: +pot,
          players: +players,
          payout: +payout,
          roi: +roi
        };
      }).filter(r => r.entry);

      localStorage.setItem("stepbetHistory", JSON.stringify(parsed));
      alert("Import successful");
      location.reload();
    };

    reader.readAsText(file);
  });

  [entryInput, potInput, playersInput].forEach(input =>
    input.addEventListener("input", calculate)
  );

  memberToggle.addEventListener("change", calculate);

  renderHistory();
});

//////////////////////////////////////////////////
// CONTROLS
//////////////////////////////////////////////////

window.openImport = function () {
  document.getElementById("fileInput").click();
};

window.openClearMenu = function () {
  const choice = prompt(`Clear:
1 = History
2 = Inputs
3 = All`);

  if (choice === "1") {
    localStorage.removeItem("stepbetHistory");
    location.reload();
  }

  if (choice === "2") {
    document.getElementById("entry").value = "";
    document.getElementById("pot").value = "";
    document.getElementById("players").value = "";
  }

  if (choice === "3") {
    localStorage.clear();
    location.reload();
  }
};

window.exportCSV = function () {
  const history = JSON.parse(localStorage.getItem("stepbetHistory")) || [];
  if (!history.length) return alert("No data");

  let csv = "Entry,Pot,Players,Payout,ROI\n";

  history.forEach(h => {
    csv += `${h.entry},${h.pot},${h.players},${h.payout},${h.roi}\n`;
  });

  const blob = new Blob([csv], { type: "text/csv" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "stepbet-history.csv";
  a.click();
};