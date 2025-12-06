console.log("Calculator script loaded.");

const display = document.getElementById("display");
const buttons = document.querySelectorAll(".button");

let currentInput = "0";
let previousInput = "";
let operator = null;
let shouldResetScreen = false;

function updateDisplay() {
    display.textContent = currentInput;
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const id = button.id;
        const value = button.textContent;

        if (id >= "0" && id <= "9") {
            handleNumber(value);
        }
        else if (id == "decimal") {
            handleDecimal();
        }
        //oprator clicked
        else if (id == "add" || id == "subtract" || id == "multiply" || id == "divide") {
            handleOperator(value);
        }
        else if (id == "equals") {
            handleEquals();
        }
        else if (id == "clear") {
            handleClear();
        }
        else if (id == "delete") {
            handleDelete();
        }
        else if( id == "percent") {
            handlePercent();
        }

        updateDisplay();
    });
});

function handleNumber(num) {
    if (shouldResetScreen) {
        currentInput = num;
        shouldResetScreen = false;
    }
    else if (currentInput === "0") {
        currentInput = num;   //replace zero
    } else {
        currentInput += num;   //append number
    }
}

function handleDecimal() {
    if (shouldResetScreen) {
        currentInput = "0.";
        shouldResetScreen = false;
        return;
    }
    if(!currentInput.includes(".")) {
        currentInput += ".";
    }
}

function handleOperator(op) {
    if (operator != null && !shouldResetScreen) {
        handleEquals();
    }
    previousInput = currentInput;
    operator = op;
    shouldResetScreen = true;

}

function handleEquals() {
    if (operator == null || shouldResetScreen) return;

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    if (isNaN(prev) || isNaN(current)) return;
    let result = 0;

    switch (operator) {
        case "+":
            result = prev + current;
            break;
        case "-":
            result = prev - current;
            break;
        case "*":
            result = prev * current;
            break;
        case "/":
            if (current === 0) {
                result = "Cannot Divide By Zero";
            } else {
                result = prev / current;
            }
            break;
        default:
            return;
    }

    currentInput = result.toString();
    operator = null;
    previousInput = "";
    shouldResetScreen = true;
}

function handleClear() {
    currentInput = "0";
    previousInput = "";
    operator = null;
    shouldResetScreen = false;
}

function handleDelete() {
    if (shouldResetScreen) return;
    if (currentInput.length == 1) {
        currentInput = "0";
    }
    else {
        currentInput = currentInput.slice(0, -1);
    }
}
function handlePercent() {
    const value = parseFloat(currentInput);
    if (isNaN(value)) return;
    currentInput = (value / 100).toString();
}
