import { operator } from "../app.js";

let expression = [];
let operPressedFlag = false;


function freeButtons(buttonName = "both") {
    const decimalButton = document.querySelector("#decimal-button");
    const decimalClicked = true ? decimalButton.classList.contains("decimal-clicked") : false;
    switch (buttonName) {
        case "decimal":
            if (decimalClicked) {
                decimalButton.classList.remove("decimal-clicked");
                decimalButton.disabled = false;
            }
            break;
        case "oper":
            operPressedFlag = false;
            break;
        case "both":
            if (decimalClicked) {
                decimalButton.classList.remove("decimal-clicked");
                decimalButton.disabled = false;
            }
            operPressedFlag = false;
    }
}

function digitClicked(e, is_keyboard_event = false) {
    const display = document.querySelector("#display");
    if (operPressedFlag) {
        display.value = "";
        display.placeholder = "";
    }
    if (is_keyboard_event) {
        display.value += e.key;
    } else {
        display.value += e.target.textContent;
    }
    freeButtons("oper");
}

function decimalClicked(e, is_keyboard_event = false) {
    const display = document.querySelector("#display");
    if (!e.target.classList.contains('decimal-clicked')) {
        if (is_keyboard_event) {
            display.value += e.key;
        } else {
            display.value += e.target.textContent;
        }
        e.target.disabled = true;
        e.target.classList.add('decimal-clicked');
    }
    freeButtons("oper");
}

function operClicked(e, is_keyboard_event = false) {
    const display = document.querySelector("#display");
    if (!operPressedFlag) {
        if (expression.length % 2 === 0) {
            expression.push(display.value);
        }
        if (expression.length === 3) {
            const res = operator(expression).toString();
            expression = [res];
            display.value = res;
        }
        if (is_keyboard_event) {
            expression.push(e.key);
        } else {
            expression.push(e.target.textContent);
        }
        operPressedFlag = true;
    } else {
        expression.pop();
        expression.push(e.target.textContent);
    }
    freeButtons("decimal");
}

function negateClicked(e) {
    const display = document.querySelector("#display");
    if (display.value !== "" && expression.length % 2 === 0) {
        expression.push(display.value);
    }
    if (expression.length % 2 === 1) {
        if (parseFloat(expression[expression.length - 1]) > 0) {
            expression[expression.length - 1] = `-${expression[expression.length - 1]}`;
        } else if (parseFloat(expression[expression.length - 1]) < 0) {
            expression[expression.length - 1] = `${(expression[expression.length - 1]).slice(1)}`;
        }
        display.value = expression[expression.length - 1];
    }
    freeButtons("oper");
}

function equalClicked(e) {
    const display = document.querySelector("#display");
    expression.push(display.value);
    const res = operator(expression);
    expression = [];
    display.value = (Math.round(res * 100000) / 100000).toString();
    freeButtons();
}

function clearClicked(e) {
    const display = document.querySelector("#display");
    display.value = "";
    display.placeholder = "0";
    expression = [];
    freeButtons();
}

function backspaceClicked(e) {
    const display = document.querySelector("#display");
    if (display.value.length > 0) {
        display.value = display.value.slice(0, - 1);
        display.placeholder = "";
    }
    freeButtons();
}

function setupKeyboardSupport() {
    document.addEventListener('keydown', (e) => {
        const is_keyboard_event = true;
        if (e.key >= '0' && e.key <= '9') {
            digitClicked(e, is_keyboard_event);
        }
        if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
            operClicked(e, is_keyboard_event);
        }
        if (e.key === '.') {
            decimalClicked(e, is_keyboard_event);
        }
        if (e.key === 'Enter') {
            equalClicked(e);
        }
        if (e.key === 'Backspace') {
            backspaceClicked(e);
        }
        if (e.key === 'Delete') {
            clearClicked(e);
        }

    })
}

function setupCalculator() {
    const digitButtons = document.querySelectorAll(".digit-button");
    digitButtons.forEach((button) => {
        button.addEventListener("click", (e) => digitClicked(e));
    })

    const decimalButton = document.querySelector("#decimal-button");
    decimalButton.addEventListener("click", (e) => decimalClicked(e));

    const operButtons = document.querySelectorAll(".oper-button");
    operButtons.forEach((button) => {
        button.addEventListener("click", (e) => operClicked(e));
    })

    const negateButton = document.querySelector("#negate-button");
    negateButton.addEventListener("click", (e) => negateClicked(e));

    const equalButton = document.querySelector("#equal-button");
    equalButton.addEventListener("click", (e) => equalClicked(e));

    const clearButton = document.querySelector("#clear-button");
    clearButton.addEventListener("click", (e) => clearClicked(e));

    const backspaceButton = document.querySelector("#backspace-button");
    backspaceButton.addEventListener("click", (e) => backspaceClicked(e));

    setupKeyboardSupport();
}


export { expression, setupCalculator }