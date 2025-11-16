import { setupCalculator } from "./modules/setup.js";

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


function main() {
    setupCalculator();
}

main();


// TO-DO
// keyboard support
// make the calculator looks nicer

export { operator }