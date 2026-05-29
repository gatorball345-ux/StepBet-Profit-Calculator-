const potInput = document.getElementById("pot");
const winnersInput = document.getElementById("winners");
const entryInput = document.getElementById("entry");
const result = document.getElementById("result");

document.getElementById("calcBtn").addEventListener("click", () => {
  const pot = parseFloat(potInput.value);
  const winners = parseFloat(winnersInput.value);
  const entry = parseFloat(entryInput.value);

  if (!pot || !winners || !entry) {
    result.textContent = "Please fill all fields.";
    return;
  }

  const payout = Math.round((pot / winners) * 100) / 100;
  const profit = Math.round((payout - entry) * 100) / 100;

  result.innerHTML = `
    Payout per winner: $${payout.toFixed(2)} <br>
    Profit: $${profit.toFixed(2)}
  `;
});