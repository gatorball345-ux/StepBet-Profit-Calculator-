const modeSelect = document.getElementById("modeSelect");
const potField = document.getElementById("potField");
const playersField = document.getElementById("playersField");

const potInput = document.getElementById("pot");
const playersInput = document.getElementById("players");
const winnersInput = document.getElementById("winners");
const entryInput = document.getElementById("entry");

const toggle = document.getElementById("memberToggle");
const feeToggle = document.getElementById("feeToggle");

const result = document.getElementById("result");
const modeLabel = document.getElementById("modeLabel");
const button = document.getElementById("calcBtn");

// SWITCH MODES
modeSelect.addEventListener("change", () => {
  if (modeSelect.value === "pot") {
    potField.classList.remove("hidden");
    playersField.classList.add("hidden");
  } else {
    potField.classList.add("hidden");
    playersField.classList.remove("hidden");
  }
  saveInputs();
});

// MEMBER TOGGLE LABEL
toggle.addEventListener("change", () => {
  if (toggle.checked) {
    modeLabel.textContent = "Mode: Member game (no 15% fee)";
  } else {
    modeLabel.textContent = "Mode: Non-member game (15% fee applied)";
  }
  saveInputs();
});

// CALCULATE
button.addEventListener("click", () => {
  let totalPot;

  const winners = parseFloat(winnersInput.value);
  const entry = parseFloat(entryInput.value);

  if (modeSelect.value === "pot") {
    totalPot = parseFloat(potInput.value);

    // ✅ Apply fee ONLY if user toggles it
    if (feeToggle.checked) {
      totalPot *= 0.85;
    }

  } else {
    const players = parseFloat(playersInput.value);
    if (!players) {
      result.textContent = "Enter players.";
      return;
    }

    totalPot = players * entry;

    // ✅ Auto apply fee for non-member games
    if (!toggle.checked) {
      totalPot *= 0.85;
    }
  }

  if (!totalPot || !winners || !entry) {
    result.textContent = "Fill all fields.";
    return;
  }

  const payout = Math.round((totalPot / winners) * 100) / 100;
  const profit = Math.round((payout - entry) * 100) / 100;

  result.innerHTML = `
    Payout per winner: $${payout.toFixed(2)} <br>
    Profit: $${profit.toFixed(2)}
  `;

  saveInputs();
});

// SAVE INPUTS
function saveInputs() {
  localStorage.setItem("mode", modeSelect.value);
  localStorage.setItem("pot", potInput.value);
  localStorage.setItem("players", playersInput.value);
  localStorage.setItem("winners", winnersInput.value);
  localStorage.setItem("entry", entryInput.value);
  localStorage.setItem("toggle", toggle.checked);
  localStorage.setItem("feeToggle", feeToggle.checked);
}

// LOAD INPUTS
window.addEventListener("load", () => {
  modeSelect.value = localStorage.getItem("mode") || "pot";
  potInput.value = localStorage.getItem("pot") || "";
  playersInput.value = localStorage.getItem("players") || "";
  winnersInput.value = localStorage.getItem("winners") || "";
  entryInput.value = localStorage.getItem("entry") || "";

  toggle.checked = localStorage.getItem("toggle") === "true";
  feeToggle.checked = localStorage.getItem("feeToggle") === "true";

  modeSelect.dispatchEvent(new Event("change"));
  toggle.dispatchEvent(new Event("change"));
});

// INSTALL PROMPT
let deferredPrompt;

window.addEventListener("beforeinstallprompt", (e) => {
  e.preventDefault();
  deferredPrompt = e;

  const btn = document.createElement("button");
  btn.textContent = "Install App";

  document.querySelector(".app").appendChild(btn);

  btn.addEventListener("click", () => {
    deferredPrompt.prompt();
    deferredPrompt.userChoice.then(() => {
      deferredPrompt = null;
      btn.remove();
    });
  });
});