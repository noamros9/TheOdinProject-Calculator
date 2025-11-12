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
    return calc(parseFloat(expression[0]), parseFloat(expression[2]), expression[1]);
}

function digitClicked(e) {
    const display = document.querySelector("#display");
    if (operPressedFlag) {
        display.value = "";
        display.placeholder = "";
    }
    display.value += e.target.textContent;
    operPressedFlag = false;

}

function operClicked(e) {
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
        expression.push(e.target.textContent);
        operPressedFlag = true;

    } else {
        expression.pop();
        expression.push(e.target.textContent);
    }
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
}

function equalClicked(e) {
    const display = document.querySelector("#display");
    operPressedFlag = false;
    expression.push(display.value);
    const res = operator(expression);
    expression = [];
    display.value = (Math.round(res * 100000) / 100000).toString();
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

    const negateButton = document.querySelector("#negate-button");
    negateButton.addEventListener("click", (e) => negateClicked(e));

    const equalButton = document.querySelector("#equal-button");
    equalButton.addEventListener("click", (e) => equalClicked(e));

    const clearButton = document.querySelector("#clear-button");
    clearButton.addEventListener("click", (e) => clearClicked(e));
}

function main() {
    setupCalculator();
}

main();


//TO-DO
//refresh display screen when a button is pushed
//add a minus button (turn the plus oper to plus/minus button)
//highlight what operation is selected