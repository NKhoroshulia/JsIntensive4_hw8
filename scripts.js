const numberButtons = document.querySelectorAll("[number]");
const operationButtons = document.querySelectorAll("[operation]");
const equalsButton = document.querySelector("[equals]");
const deleteButton = document.querySelector("[delete]");
const allClearButton = document.querySelector("[clear]");
const firstOperandTextElement = document.querySelector("[first-operand]");
const secondOperandTextElement = document.querySelector("[second-operand]");

class Calculator {
    constructor(firstOperandTextElement, secondOperandTextElement){
        this.firstOperandTextElement = firstOperandTextElement;
        this.secondOperandTextElement = secondOperandTextElement;
        this.readyToReset = false;
        this.clear();
    }

    clear() {
        this.secondOperand = "";
        this.firstOperand = "";
        this.operation = undefined;

    }

    delete() {
        this.secondOperand = this.secondOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === "." && this.secondOperand.includes(".")) return
        this.secondOperand = this.secondOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.secondOperand === "") return
        if (this.secondOperand !== "" && this.firstOperand !== "") this.calculate();
        this.operation = operation;
        this.firstOperand = this.secondOperand;
        this.secondOperand = "";
    }

    calculate() {
        let result;
        const first = parseFloat(this.firstOperand);
        const second = parseFloat(this.secondOperand);
        if (isNaN(first) || isNaN(second)) return;
        switch (this.operation)  {
            case "+":
                result = first + second;
                break;
            case "-":
                result = first - second;
                break;
            case "*":
                result = first * second;
                break;
            case "÷":
                result = first / second;
                break;
            default:
                return;
        }
        this.readyToReset = true;
        this.secondOperand = String(result).slice(0, 9);
        this.operation = undefined;
        this.firstOperand = "";
    }

    updateDisplay() {
        this.secondOperandTextElement.innerText = this.secondOperand;
        if (this.operation != null) {
            this.firstOperandTextElement.innerText = `${this.firstOperand} ${this.operation}`;
        } else {
            this.firstOperandTextElement.innerText = "";
        }

    }
}

const calculator = new Calculator(firstOperandTextElement,
    secondOperandTextElement);

allClearButton.addEventListener("click", () => {
    calculator.clear();
    calculator.updateDisplay();
})

numberButtons.forEach(button => {
    button.addEventListener("click", () => {
        if(calculator.firstOperand === "" && calculator.secondOperand !== "" && calculator.readyToReset) {
            calculator.secondOperand = "";
            calculator.readyToReset = false;
        }
        calculator.appendNumber(button.innerText)
        calculator.updateDisplay();
    })
})

operationButtons.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay();
    })
})

equalsButton.addEventListener("click", button => {
    calculator.calculate();
    calculator.updateDisplay();
})

deleteButton.addEventListener("click", button => {
    calculator.delete();
    calculator.updateDisplay();
})
