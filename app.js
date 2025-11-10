let experssion = "";

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
    let splitExpression = expression.split(/(\+|\-|\/|X)/);
    console.log(splitExpression);
}

function digitClicked(e) {
    const display = document.querySelector("#display");
    display.value += e.target.textContent;
}

function operClicked(e) {
    const display = document.querySelector("#display");
    experssion += display.value;
    experssion += e.target.textContent;
    display.value = "";
}

function equalClicked(e) {
    const display = document.querySelector("#display");
    experssion += display.value;
    display.value = "";
    operator(experssion);
    // TO-DO OPERATION OF CALC
}

function clearClicked(e) {
    const display = document.querySelector("#display");
    experssion = "";
    display.value = "";
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


