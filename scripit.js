/* =================================
   NEO CALCULATOR // 2050
   JAVASCRIPT FUNCTIONALITY
================================= */
let current = "";
let previous = "";
let operator = null;
const currentDisplay = document.getElementById("current");
const previousDisplay = document.getElementById("previous");
/* ================================
   UPDATE DISPLAY
================================ */
function updateDisplay() {
    currentDisplay.textContent = current || "0";
    if (operator && previous !== "") {
        previousDisplay.textContent = `${previous} ${getOperatorSymbol(operator)}`;
    } else {
        previousDisplay.textContent = "";
    }
}
/* ================================
   OPERATOR SYMBOLS
================================ */
function getOperatorSymbol(op) {
    const symbols = {
        "+": "+",
        "-": "−",
        "*": "×",
        "/": "÷",
        "%": "%"
    };
    return symbols[op] || op;
}
/* ================================
   ADD NUMBER
================================ */
function addNumber(number) {
    // Prevent multiple decimal points
    if (number === "." && current.includes(".")) {
        return;
    }
    // Start decimal with 0
    if (number === "." && current === "") {
        current = "0.";
    } else {
        current += number;
    }
    updateDisplay();
}
/* ================================
   CHOOSE OPERATOR
================================ */
function chooseOperator(selectedOperator) {
    if (current === "" && previous === "") {
        return;
    }
    // Calculate previous operation first
    if (
        current !== "" &&
        previous !== "" &&
        operator !== null
    ) {
        calculate();
    }
    // Store current number
    if (previous === "") {
        previous = current;
    }
    current = "";
    operator = selectedOperator;
    updateDisplay();
}
/* ================================
   CALCULATE
================================ */
function calculate() {
    if (
        previous === "" ||
        current === "" ||
        operator === null
    ) {
        return;
    }
    const firstNumber = parseFloat(previous);
    const secondNumber = parseFloat(current);
    let result;
    switch (operator) {
        case "+":
            result = firstNumber + secondNumber;
            break;
        case "-":
            result = firstNumber - secondNumber;
            break;
        case "*":
            result = firstNumber * secondNumber;
            break;
        case "/":
            if (secondNumber === 0) {
                showError();
                return;
            }
            result = firstNumber / secondNumber;
            break;
        case "%":
            if (secondNumber === 0) {
                showError();
                return;
            }
            result = firstNumber % secondNumber;
            break;
        default:
            return;
    }
    // Remove floating-point errors
    result = parseFloat(result.toFixed(10));
    current = result.toString();
    previous = "";
    operator = null;
    updateDisplay();
}
/* ================================
   CLEAR ALL
================================ */
function clearCalculator() {
    current = "";
    previous = "";
    operator = null;
    currentDisplay.classList.remove("error");
    updateDisplay();
}
/* ================================
   DELETE LAST NUMBER
================================ */
function deleteNumber() {
    if (current === "") {
        return;
    }
    current = current.slice(0, -1);
    updateDisplay();
}
/* ================================
   ERROR
================================ */
function showError() {
    current = "ERROR";
    previous = "";
    operator = null;
    currentDisplay.classList.add("error");
    setTimeout(() => {
        current = "";
        currentDisplay.classList.remove("error");
        updateDisplay();
    }, 1500);
}
/* ================================
   KEYBOARD SUPPORT
================================ */
document.addEventListener("keydown", function(event) {
    const key = event.key;
    // Numbers
    if (key >= "0" && key <= "9") {
        currentDisplay.classList.remove("error");
        addNumber(key);
        return;
    }
    // Decimal
    if (key === ".") {
        addNumber(".");
        return;
    }
    // Operators
    if (
        key === "+" ||
        key === "-" ||
        key === "*" ||
        key === "/" ||
        key === "%"
    ) {
        currentDisplay.classList.remove("error");
        chooseOperator(key);
        return;
    }
    // Enter or =
    if (key === "Enter" || key === "=") {
        calculate();
        return;
    }
    // Backspace
    if (key === "Backspace") {
        deleteNumber();
        return;
    }
    // Escape
    if (key === "Escape") {
        clearCalculator();
        return;
    }
});
/* ================================
   START CALCULATOR
================================ */
updateDisplay();