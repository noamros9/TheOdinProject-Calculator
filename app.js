let expression = [];
let operPressedFlag = false;

function calc(a, b, oper) {
    switch (oper) {
        case "+":
            return a + b;
        case "-":
            return a - b;
        case "X":
            return a * b;
        case "/":
            return a / b;
    }
}

function operator(expression) {
    return calc(parseInt(expression[0]), parseInt(expression[2]), expression[1]);
}

function digitClicked(e) {
    const display = document.querySelector("#display");
    display.value += e.target.textContent;
    operPressedFlag = false;
}

function operClicked(e) {
    const display = document.querySelector("#display");
    if (!operPressedFlag) {
        expression.push(display.value);
        expression.push(e.target.textContent);
        display.value = "";
        display.placeholder = "";
        operPressedFlag = true;
    } else {
        expression.pop();
        expression.push(e.target.textContent);
    }
}

function equalClicked(e) {
    const display = document.querySelector("#display");
    operPressedFlag = false;
    expression.push(display.value);
    const res = operator(expression);
    expression = [];
    display.value = res.toString();
}

function clearClicked(e) {
    const display = document.querySelector("#display");
    operPressedFlag = false;
    expression = [];
    display.value = "";
    display.placeholder = "0";
}

function setupCalculator() {
    const digitButtons = document.querySelectorAll(".digit-button, #decimal-button");
    digitButtons.forEach((button) => {
        button.addEventListener("click", (e) => digitClicked(e));
    })

    const operButtons = document.querySelectorAll(".oper-button");
    operButtons.forEach((button) => {
        button.addEventListener("click", (e) => operClicked(e));
    })

    const equalButton = document.querySelector("#equal-button");
    equalButton.addEventListener("click", (e) => equalClicked(e));

    const clearButton = document.querySelector("#clear-button");
    clearButton.addEventListener("click", (e) => clearClicked(e));
}

function main() {
    setupCalculator();
}

main();


