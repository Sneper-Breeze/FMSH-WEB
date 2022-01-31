
const calc = document.getElementById("calc")
const display = document.getElementById("display")
const calcButtonResult = document.getElementById("calcButtonResult")

// console.log(calc, display, calcButtonResult)

function onNumberButtonClick(ev) {
   var element = ev.target
   if (element.classList.contains("number-btn")) {
      display.innerText += element.innerText;
   }
}

calc.addEventListener("click", onNumberButtonClick)