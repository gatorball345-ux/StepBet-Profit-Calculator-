document.addEventListener("DOMContentLoaded", function () {

  alert("SCRIPT.JS IS LOADING");

  const btn = document.getElementById("testBtn");

  if (!btn) {
    alert("Button NOT found");
    return;
  }

  btn.addEventListener("click", function () {
    alert("BUTTON CLICK WORKS");
  });

});