document.addEventListener('DOMContentLoaded', () => {
    // 1. Set up the Variables (initialized to numbers, not null)
    let firstnum = 0.0;
    let secondnum = 0.0;
    let result = 0.0;
    let operation = ""; // will be "+", "-", "/", or "*"

    const display = document.getElementById('display');
    if (!display) return;

    // Utility: safely get display text (empty -> "")
    function getDisplayText() {
        return display.value.trim();
    }

    // Append a character to the display (numbers and decimal)
    function appendToDisplay(text) {
        display.value = getDisplayText() + text;
    }

    // Clear display
    function clearDisplay() {
        display.value = "";
    }

    // Format number: show integers without decimals, otherwise up to 3 decimals
    function formatThreeDecimals(num) {
        // if num is not finite (e.g. division by zero) -> show Error
        if (!isFinite(num)) return "Error";

        const n = Number(num);
        // If it's effectively an integer, show it without trailing .0
        if (Number.isInteger(n)) {
            return n.toString();
        }

        // Otherwise show up to 3 decimal places, trimmed
        return parseFloat(n.toFixed(3)).toString();
    }

    // Numeric buttons handlers
    const numButtons = [
        'btn0', 'btn1', 'btn2', 'btn3', 'btn4', 'btn5', 'btn6', 'btn7', 'btn8', 'btn9'
    ];
    numButtons.forEach(id => {
        const el = document.getElementById(id);
        if (!el) return;
        el.addEventListener('click', () => {
            appendToDisplay(el.textContent);
        });
    });

    // Decimal button - only allow one decimal point
    const btnDecimal = document.getElementById('btnDecimal');
    if (btnDecimal) {
        btnDecimal.addEventListener('click', () => {
            if (getDisplayText().indexOf('.') < 0) {
                // If display is empty and user presses '.', prepend 0
                if (getDisplayText() === "") appendToDisplay("0.");
                else appendToDisplay('.');
            }
        });
    }

    // Plus/Minus toggle
    const btnPlusMinus = document.getElementById('btnPlusMinus');
    if (btnPlusMinus) {
        btnPlusMinus.addEventListener('click', () => {
            const txt = getDisplayText();
            if (txt === "") return;
            let val = parseFloat(txt);
            if (isNaN(val)) return;
            val *= -1;
            display.value = formatThreeDecimals(val);
        });
    }

    // Clear
    const btnClear = document.getElementById('btnClear');
    if (btnClear) {
        btnClear.addEventListener('click', () => {
            clearDisplay();
            // also reset stored state (matches many calculators)
            firstnum = 0.0;
            secondnum = 0.0;
            result = 0.0;
            operation = "";
        });
    }

    // Operator handlers: store firstnum, clear display, set operation
    function operatorHandler(op) {
        const txt = getDisplayText();
        if (txt === "") {
            // if user presses an operator repeatedly, just change the operation
            operation = op;
            return;
        }
        const parsed = parseFloat(txt);
        if (isNaN(parsed)) return;
        firstnum = parsed;
        display.value = "";
        operation = op;
    }

    const btnAdd = document.getElementById('btnAdd');
    if (btnAdd) btnAdd.addEventListener('click', () => operatorHandler('+'));
    const btnSubtract = document.getElementById('btnSubtract');
    if (btnSubtract) btnSubtract.addEventListener('click', () => operatorHandler('-'));
    const btnDivide = document.getElementById('btnDivide');
    if (btnDivide) btnDivide.addEventListener('click', () => operatorHandler('/'));
    const btnMultiply = document.getElementById('btnMultiply');
    if (btnMultiply) btnMultiply.addEventListener('click', () => operatorHandler('*'));

    // Equal button: parse second number, compute result, and display formatted
    const btnEqual = document.getElementById('btnEqual');
    if (btnEqual) {
        btnEqual.addEventListener('click', () => {
            const txt = getDisplayText();
            if (txt === "") return; // nothing to compute
            secondnum = parseFloat(txt);
            if (isNaN(secondnum)) return;

            switch (operation) {
                case '+':
                    result = firstnum + secondnum;
                    break;
                case '-':
                    result = firstnum - secondnum;
                    break;
                case '/':
                    result = firstnum / secondnum;
                    break;
                case '*':
                    result = firstnum * secondnum;
                    break;
                default:
                    // if no operation set, do nothing
                    return;
            }
            display.value = formatThreeDecimals(result);
            // allow chaining: treat result as firstnum for next op
            firstnum = result;
            operation = "";
        });
    }

    // Optional: keyboard support (digits, ., + - * / Enter for =, Backspace = C)
    document.addEventListener('keydown', (e) => {
        if (e.key >= '0' && e.key <= '9') {
            appendToDisplay(e.key);
            e.preventDefault();
            return;
        }
        if (e.key === '.' || e.key === ',') {
            if (btnDecimal) btnDecimal.click();
            e.preventDefault();
            return;
        }
        if (['+', '-', '/', '*'].includes(e.key)) {
            operatorHandler(e.key);
            e.preventDefault();
            return;
        }
        if (e.key === 'Enter' || e.key === '=') {
            if (btnEqual) btnEqual.click();
            e.preventDefault();
            return;
        }
        if (e.key === 'Backspace') {
            // behave like Clear: empty and reset
            if (btnClear) btnClear.click();
            e.preventDefault();
            return;
        }
    });
});