const screenDisplay = document.querySelector(".screen");
const buttons = document.querySelectorAll("button");
const deleteButton = document.querySelector(".delete");

let calculation = [];
let accumulativeCalator;

function calculate(button){
    const value = button.textContent;
    if (value === "CLR"){
        calculation = [];
        screenDisplay.textContent = "";
    }else if (value === "DEL"){
        calculation.pop();
        screenDisplay.textContent = calculation.join("");
    } else if( value === "="){
        screenDisplay.textContent = eval(accumulativeCalator);
    }else{
        calculation.push(value);
        accumulativeCalator = calculation.join("");
        screenDisplay.textContent = accumulativeCalator;

    }
}

buttons.forEach((button) => button.addEventListener("click", () => calculate(button)))