
const input = document.querySelector(`.input`);
const numberButtons = document.querySelectorAll(`.number`);

let pressed = 0;
let nextOperation = 0;

for (let i = 0; i < numberButtons.length; i++) {
    numberButtons[i].addEventListener(`click`, function () {
        displayValue = numberButtons[i].textContent;
        if (input.textContent === `0` && !input.textContent.includes(`.`)) {
            input.textContent = ``
        } else if ((pressed === 1) || (pressed === -1)) {
            input.textContent = ``;
            pressed = 0;
        }
        input.textContent += displayValue;
    })
}

const clearButton = document.querySelector(`.clear`)
clearButton.addEventListener(`click`, clearInput);

function clearInput() {
    nextOperation = 0;
    pressed = 0;
    values.first = ``;
    values.second = ``;
    input.textContent = `0`;
}

values = {
    first: "",
    operator: "",
    second: ""
}

operators = [`+`, `-`, `x`, `:`]

operations = {
    [`+`]: (a, b) => a + b,
    [`-`]: (a, b) => a - b,
    [`x`]: (a, b) => a * b,
    [`:`]: (a, b) => a / b
}

function operate(firstValue, operator, secondValue) {
    nextOperation = 0;
    values.second = input.textContent;
    returnValues()
    firstValue = returnedValues[0];
    operator = returnedValues[1];
    secondValue = returnedValues[2];
    input.textContent = Math.floor(operations[operator](+firstValue, +secondValue)*100)/100
    pressed = -1;
}

const equalsButton = document.querySelector(`.equals`);
equalsButton.addEventListener(`click`, operate);

const operatorButton = document.querySelectorAll(`.operator`)
for (let i = 0; i < operatorButton.length; i++) {
    operatorButton[i].addEventListener(`click`, function () {
        if (nextOperation === 1) {
            operate(values.first, values.operator, values.second)
            nextOperation = 1;
            values.operator = operatorButton[i].textContent;
            values.first = input.textContent;
        } else if (pressed != 1) {
            pressed = 1;
            values.operator = operatorButton[i].textContent;
            values.first = input.textContent;
            nextOperation = 1;
        }
    })
}

function returnValues() {
    return returnedValues = [values.first, values.operator, values.second]
}

const dotButton = document.querySelector(`.dot`);
dotButton.addEventListener(`click`, addDot);

function addDot() {
    if (!input.textContent.includes(`.`)) {
        input.textContent += `.`
    }
}

const eraseButton = document.querySelector(`.erase`);
eraseButton.addEventListener(`click`, deleteDigit);

function deleteDigit() {
    if (input.textContent.length <= 1) {
        input.textContent = "0"
    } else if (input.textContent !== "0") {
        input.textContent = input.textContent.slice(0, input.textContent.length-1);
    }
}