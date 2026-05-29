function calc() {
  let players = parseFloat(document.getElementById('players').value);
  let winners = parseFloat(document.getElementById('winners').value);
  let entry = parseFloat(document.getElementById('entry').value);

  const resultEl = document.getElementById('result');

  if (!players || !winners || !entry) {
    resultEl.textContent = "Please enter all values.";
    return;
  }

  if (winners > players) {
    resultEl.textContent = "Winners cannot exceed total players.";
    return;
  }

  let profit = (0.85 * players * entry / winners) - entry;
  resultEl.textContent = "Your profit is: $" + profit.toFixed(2);
}

document.getElementById('calcBtn').addEventListener('click', calc);