const display = document.getElementById("display");

function arithmeticCalculation() {
  const equation = display.innerText;
  const lastDigit = equation[equation.length - 1];
  let result = 0;

  if (lastDigit === ".") {
    result = equation;
  } else {
    let firstPart = parseFloat(equation);
    let secondPart;
    let operator = "";
    for (let i = 1; i < equation.length; i++) {
      if (
        equation[i] === "+" ||
        equation[i] === "-" ||
        equation[i] === "×" ||
        equation[i] === "÷"
      ) {
        operator = equation[i];
        secondPart = equation.slice(i + 1);
        break;
      }
    }
    secondPart = parseFloat(secondPart);

    if (operator === "" || isNaN(secondPart)) {
      result = equation;
    } else if (operator === "+") {
      result = firstPart + secondPart;
    } else if (operator === "-") {
      result = firstPart - secondPart;
    } else if (operator === "×") {
      result = firstPart * secondPart;
    } else if (operator === "÷") {
      result = firstPart / secondPart;
    }

    // result = "" + result;
    // if (result.indexOf(".") >= 0) {
    //   result = +result;
    //   result = result.toFixed(6);
    // }
  }

  display.innerText = result;
}

function displayFunction(digit) {
  let previousDisplay = display.innerText;
  const previousDigit = previousDisplay[previousDisplay.length - 1];
  let newDisplay;

  // Display Initial Digits
  if (
    previousDisplay === "0" &&
    digit !== "+" &&
    digit !== "-" &&
    digit !== "×" &&
    digit !== "÷" &&
    digit !== "."
  ) {
    newDisplay = digit;
  }

  // Display Arithmetic Operators
  else if (digit === "+" || digit === "-" || digit === "×" || digit === "÷") {
    for (let i = 1; i < previousDisplay.length - 1; i++) {
      if (
        previousDisplay[i] === "+" ||
        previousDisplay[i] === "-" ||
        previousDisplay[i] === "×" ||
        previousDisplay[i] === "÷"
      ) {
        arithmeticCalculation();
        previousDisplay = display.innerText;
      }
    }
    if (previousDigit === ".") {
      newDisplay = previousDisplay;
    } else if (
      previousDigit === "+" ||
      previousDigit === "-" ||
      previousDigit === "×" ||
      previousDigit === "÷"
    ) {
      newDisplay = previousDisplay.slice(0, -1) + digit;
    } else {
      newDisplay = previousDisplay + digit;
    }
  }

  // Display Floating Point
  else if (digit === ".") {
    if (
      previousDigit === "+" ||
      previousDigit === "-" ||
      previousDigit === "×" ||
      previousDigit === "÷"
    ) {
      newDisplay = previousDisplay + "0" + digit;
    } else if (previousDigit === ".") {
      newDisplay = previousDisplay;
    } else {
      const splitsByDot = previousDisplay.split(".");
      if (splitsByDot.length === 1) {
        newDisplay = previousDisplay + digit;
      } else {
        let lastSplit = splitsByDot[splitsByDot.length - 1];
        let i;
        for (i = 0; i < lastSplit.length; i++) {
          if (
            lastSplit[i] === "+" ||
            lastSplit[i] === "-" ||
            lastSplit[i] === "×" ||
            lastSplit[i] === "÷"
          ) {
            newDisplay = previousDisplay + digit;
            break;
          }
        }
        if (i === lastSplit.length) {
          newDisplay = previousDisplay;
        }
      }
    }
  } else {
    newDisplay = previousDisplay + digit;
  }

  display.innerText = newDisplay;
}

document
  .getElementById("digits-container")
  .addEventListener("mousedown", function (event) {
    const digit = event.target.innerText;
    const displayEquation = display.innerText;

    if (
      displayEquation.indexOf("e") < 0 &&
      displayEquation.indexOf("Infinity") < 0 &&
      displayEquation.indexOf("NaN") < 0
    ) {
      if (digit === "AC") {
        display.innerText = "0";
      } else if (digit === "=") {
        arithmeticCalculation();
      } else {
        displayFunction(digit);
      }
    } else {
      if (digit === "AC") {
        display.innerText = "0";
      }
    }
  });
