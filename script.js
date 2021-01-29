function display(numberOrSign){
    const previousDisplay = document.getElementById("display").innerText;
    let newDisplay;
    if(previousDisplay != "0" || numberOrSign == "+" || numberOrSign == "-" || numberOrSign == "*" || numberOrSign =="/"){
        newDisplay = previousDisplay + numberOrSign;
    }
    else{
        newDisplay = numberOrSign;
    }
    document.getElementById("display").innerText = newDisplay;
}


const numbers = document.getElementsByClassName("numbers");
for (let i = 0; i < numbers.length; i++) {
    const number = numbers[i];
    number.addEventListener("click", function(){
        display(number.innerText);
    });
}

document.getElementById("clear").addEventListener("click", function(){
    document.getElementById("display").innerText = "0";
});

const arithmeticSigns = document.getElementsByClassName("arithmetic-signs");
for (let i = 0; i < arithmeticSigns.length; i++) {
    const arithmeticSign = arithmeticSigns[i];
    arithmeticSign.addEventListener("click", function(){
        display(arithmeticSign.innerText);
    });
}

document.getElementById("equal").addEventListener("click", function(){
    const arithmeticOperation = document.getElementById("display").innerText;
    const firstPart = parseFloat(arithmeticOperation);
    let secondPart;
    let sign = "";
    for (let i = 0; i < arithmeticOperation.length; i++) {
        if(arithmeticOperation[i] == "+" || arithmeticOperation[i] == "-" || arithmeticOperation[i] == "*" || arithmeticOperation[i] == "/"){
            sign = arithmeticOperation[i];
            secondPart = arithmeticOperation.slice(i+1);
            break;
        }
    }
    secondPart = parseFloat(secondPart);
    let result = 0;
    if(sign == ""){
        result = arithmeticOperation;
    }
    else if(sign == "+"){
        result = firstPart + secondPart;
    }
    else if(sign == "-"){
        result = firstPart - secondPart;
    }
    else if(sign == "*"){
        result = firstPart * secondPart;
    }
    else{
        result = firstPart / secondPart;
    }
    result = result.toFixed(2);
    document.getElementById("display").innerText = result;
});