
const calc = document.getElementById("calc")
const display = document.getElementById("display")
const calcButtonResult = document.getElementById("calcButtonResult")
op = true
point = false

// console.log(calc, display, calcButtonResult)

function onNumberButtonClick(ev) {
   var element = ev.target
   console.log(ev)
   if(element.id == "calcButtonReset"){
      display.innerText = ''
      op = false
      point = false
   }
   else if (element.classList.contains("number-btn")) {
      display.innerText += element.innerText;
      op = false;
   }
   else if(element.classList.contains("calc-btn")){
      if(element.id == "calcButtonPoint" && !point && !op){
         display.innerText += element.innerText;
         point = true
      }
      else if(!op && element.id != "calcButtonPoint"){
         display.innerText += element.innerText;
         op = true;
         point = false;
      }
   }
   else if(element.id == "calcButtonResult" && !op){
      console.log("Ok")
      display.innerText = eval(display.innerText)
   }
}

calc.addEventListener("click", onNumberButtonClick)