const buttonList = document.querySelectorAll("button");
const display = document.querySelector(".display");
const decimalButton = document.querySelector(".period");
let num1,num2, op;
let resetDisplayOnNextButton = false;
for (let i = 0; i <buttonList.length; i++ ) {
    buttonList[i].addEventListener("click", (e) => {
        let buttonText = e.target.textContent;
        evalButtonPress(buttonText);
    });
}


function evalButtonPress(keypress){
    switch (keypress) {
/*
        Operator functions have two cases:
        1: Operator not defined, then first number not defined
            
        2: Previous operator defined and thus first number defined.
            We have the second case to allow users to chain operators like ((4 + 2) - 3) * 5
*/
        case "+" :
        case "-" :
        case "/" :
        case "x" :
            
            //Case 1: operator not yet defined, First number not defined.
            if (num1 === undefined) {
                num1 = parseFloat(display.textContent);
                console.log(num1);
            }
            //case 2: user attempts to press an operator after pressing a previous operator
            if (num1 != undefined && op != undefined){
                num2 = parseFloat(display.textContent);
                let result = operate(op,num1,num2);
                display.textContent = result;
                [op,num1,num2] = [undefined,result,undefined];
            }
            op = keypress;
            resetDisplayOnNextButton = true;
            decimalButton.disabled = false;
            break;    

        case "=":
            if(num1 == undefined){
                num1 = parseFloat(display.textContent);
            } else {
                num2 = parseFloat(display.textContent);
            }
            let result = operate(op,num1,num2);
            display.textContent = result;
            resetDisplayOnNextButton = true;
            [op,num1,num2] = [undefined,result,undefined];
            decimalButton.disabled = false;
            break;

        case "⌫":
            let oldText = display.textContent
            display.textContent = oldText.slice(0,oldText.length-1);
            break;

        case "C":
            [op,num1,num2] = [undefined,undefined,undefined];
            display.textContent = 0;
            break;

        case ".":
            resetDisplayOnNextButton = false;
            display.textContent += ".";
            decimalButton.disabled = true;
        
        case "%":
            resetDisplayOnNextButton = false;
            result = display.textContent;
            display.textContent = result / 0.01;

        default:
            if(display.textContent == 0 || resetDisplayOnNextButton === true) {
                display.textContent = keypress;
                resetDisplayOnNextButton = false;
            } else {
                display.textContent += keypress;
            }
            break;
    }
}




function operate (op,a,b) {
    console.log(`op = ${op},num1 = ${a}, num2 = ${b}`);
    if(op == undefined) return a;

    switch (op){
        case ("+"):
            return (a + b);
        case ("-"):
            return (a - b);
        case ("x"):
            return (a * b);
        case ("/"):
            return (a/b);
        default:
            return "ERROR, INVALID OPERATOR"
    }
}






