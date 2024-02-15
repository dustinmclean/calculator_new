// --- Global Variables --- //

let operator = "";
let previousValue = "";
let currentValue = "";
let previousOperator = "";



// --- Selectors --- //

const numberButtons = document.querySelectorAll("[data-number]");
const operationButtons = document.querySelectorAll("[data-operation]");
const equalsButton = document.querySelector("[data-equals]");
const deleteButton = document.querySelector("[data-delete]");
const clearButton = document.querySelector("[data-clear]");
const previousOperandTextElement = document.querySelector("[data-previous-operand]");
const currentOperandTextElement = document.querySelector("[data-current-operand]");

// --- Event Listeners & Function Calling --- // 

numberButtons.forEach((number) => number.addEventListener("click", (e) => {
    
    getNumberFromHtml(e.target.textContent)
    currentOperandTextElement.textContent = currentValue;

}))

operationButtons.forEach((op) => op.addEventListener("click", (e) => {
    handleOperator(e.target.textContent);
    previousOperandTextElement.textContent = previousValue + " " + operator;
    currentOperandTextElement.textContent = currentValue;
}))

clearButton.addEventListener("click", () => {
    previousValue = "";
    currentValue = "";
    operator = "";
    previousOperandTextElement.textContent = currentValue;
    currentOperandTextElement.textContent = currentValue;
})

equalsButton.addEventListener("click", () => {
    if (currentValue != "" && previousValue != "") {
    calculate();
    previousOperandTextElement.textContent = "";
    currentOperandTextElement.textContent = previousValue;
  }
})

deleteButton.addEventListener("click", () => {
    currentValue = currentValue.slice(0, -1)
    currentOperandTextElement.textContent = currentValue;
})

// --- Function Declarations --- //


function getNumberFromHtml(num) {
    if (num === "." && currentValue.includes(".")) return;
    if (currentValue.length <= 16) {
    currentValue += num;
  }
}

function handleOperator(op) {
    operator = op;
    previousValue = currentValue;
    currentValue = "";
}




function calculate() {
    previousValue = Number(previousValue);
    currentValue = Number(currentValue);

    if (operator === "+") {
        previousValue += currentValue;
        currentValue = previousValue;
    } else if (operator === "−") {
        previousValue -= currentValue; 
        currentValue = previousValue;
    } else if (operator === "×") {
        previousValue *= currentValue;
        currentValue = previousValue;
    } else if (operator === "÷") {
        previousValue /= currentValue;
        currentValue = previousValue;
    }

    previousValue = roundNumber(previousValue);
    previousValue = previousValue.toString();
    currentValue = currentValue.toString();
   
}

function roundNumber(num) {
    return Math.round(num * 1000) / 1000;
}

