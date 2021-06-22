function displayFunction(digit) {
    let previousDisplay = document.getElementById("display").innerText;
    const previousDigit = previousDisplay[previousDisplay.length - 1];
    let newDisplay;

    // Display Initial Digits
    if (previousDisplay === "0" && digit !== "+" && digit !== "-" && digit !== "*" && digit !== "/" && digit !== ".") {
        newDisplay = digit;
    }

    // Display Arithmetic Signs
    else if (digit === "+" || digit === "-" || digit === "*" || digit === "/") {
        for (let i = 1; i < previousDisplay.length - 1; i++) {
            if (previousDisplay[i] === "+" || previousDisplay[i] === "-" || previousDisplay[i] === "*" || previousDisplay[i] === "/") {
                arithmeticCalculation();
                previousDisplay = document.getElementById("display").innerText;
            }
        }
        if (previousDigit === ".") {
            newDisplay = previousDisplay;
        }
        else if (previousDigit === "+" || previousDigit === "-" || previousDigit === "*" || previousDigit === "/") {
            newDisplay = previousDisplay.slice(0, -1) + digit;
        }
        else {
            newDisplay = previousDisplay + digit;
        }
    }

    // Display Floating Point
    else if (digit === ".") {
        if (previousDigit === "+" || previousDigit === "-" || previousDigit === "*" || previousDigit === "/") {
            newDisplay = previousDisplay + "0" + digit;
        }
        else if (previousDigit === ".") {
            newDisplay = previousDisplay;
        }
        else {
            const splitsByDot = previousDisplay.split(".");
            if (splitsByDot.length === 1) {
                newDisplay = previousDisplay + digit;
            }
            else {
                let lastSplit = splitsByDot[splitsByDot.length - 1];
                let i;
                for (i = 0; i < lastSplit.length; i++) {
                    if (lastSplit[i] === "+" || lastSplit[i] === "-" || lastSplit[i] === "*" || lastSplit[i] === "/") {
                        newDisplay = previousDisplay + digit;
                        break;
                    }
                }
                if (i === lastSplit.length) {
                    newDisplay = previousDisplay;
                }
            }
        }
    }

    else {
        newDisplay = previousDisplay + digit;
    }

    document.getElementById("display").innerText = newDisplay;
}


document.getElementById("digits-container").addEventListener("click", function (event) {
    const digit = event.target.innerText;
    if (digit === "AC") {
        document.getElementById("display").innerText = "0";
    }
    else if (digit === "=") {
        arithmeticCalculation();
    }
    else {
        displayFunction(digit);
    }
});


function arithmeticCalculation() {
    const equation = document.getElementById("display").innerText;
    const firstPart = parseFloat(equation);
    let secondPart;
    let sign = "";
    for (let i = 0; i < equation.length; i++) {
        if (equation[i] === "+" || equation[i] === "-" || equation[i] === "*" || equation[i] === "/") {
            sign = equation[i];
            secondPart = equation.slice(i + 1);
            break;
        }
    }
    secondPart = parseFloat(secondPart);
    let result = 0;
    
    if (sign === "" || isNaN(secondPart)) {
        result = equation;
    }
    else if (sign === "+") {
        result = firstPart + secondPart;
    }
    else if (sign === "-") {
        result = firstPart - secondPart;
    }
    else if (sign === "*") {
        result = firstPart * secondPart;
    }
    else if (sign === "/") {
        result = firstPart / secondPart;
    }
    document.getElementById("display").innerText = result;
}