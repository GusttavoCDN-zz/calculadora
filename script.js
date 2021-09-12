class Calculadora {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()
    }

    clear() {
        this.currentOperand = ""
        this.previousOperand = ""
        this.previousOperandTextElement.innerText = ""
        this.currentOperandTextElement.innerText = ""
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number == "." && this.currentOperand.includes(".")) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(operation) {
        if (this.currentOperand == "") return
        if (this.previousOperand !== "") {
            this.compute()
        }

        this.operation = operation
        console.log(operation)
        this.previousOperand = this.currentOperand
        this.currentOperand = ""
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)

        if (isNaN(prev) || isNaN(current)) return

        switch (this.operation) {
            case "*":
                computation = prev * current
                break;
            case "÷":
                computation = prev / current
                break;
            case "+":
                computation = prev + current
                break;
            case "-":
                computation = prev - current
                break;
            default:
                return
        }

        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ""
    }

    getDisplayNumber(number) {
        const stringNumber = number.toString()
        const integerDigits = parseFloat(stringNumber.split(".")[0])
        const decimalDigits = stringNumber.split(".")[1]

        let integerDisplay
        if (isNaN(integerDigits)) {
            integerDisplay = ""
        } else {
            integerDisplay = integerDigits.toLocaleString("pt", {
                maximumFractionDigits: 0
            })
        }

        if (decimalDigits != null) {
            return `${integerDisplay}.${decimalDigits}`
        } else {
            return integerDisplay
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)

        if (this.operation != null) {
            this.previousOperandTextElement.innerText = `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandTextElement.innerText = ""
        }


    }
}


const btn_s = document.querySelectorAll('[data-number]')
const operation = document.querySelectorAll("[data-operation]")
const equal = document.querySelector("[data-equal]")
const btnClear = document.querySelector("[data-clear]")
const btnDelete = document.querySelector("[data-delete]")
const previousOperandTextElement = document.querySelector("[data-previous-operation]");
const currentOperandTextElement = document.querySelector("[data-current-operation]")

let calculadora = new Calculadora(previousOperandTextElement, currentOperandTextElement)

btn_s.forEach(button => {
    button.addEventListener("click", () => {
        calculadora.appendNumber(button.innerText);
        calculadora.updateDisplay()
    })
})


operation.forEach(button => {
    button.addEventListener("click", () => {
        calculadora.chooseOperation(button.innerText);
        calculadora.updateDisplay()
    })
})

equal.addEventListener("click", button => {
    calculadora.compute()
    calculadora.updateDisplay()
})

btnClear.addEventListener("click", () => {
    calculadora.clear()
})

btnDelete.addEventListener("click", () => {
    calculadora.delete()
    calculadora.updateDisplay()
})

// Adding keyboard support

window.addEventListener("keydown", (event) => {
    let numberCliked = document.querySelector(`[data-number="${event.key}"]`)
    if (numberCliked == null) return

    calculadora.appendNumber(numberCliked.innerText)
    calculadora.updateDisplay()
});


window.addEventListener("keydown", (event) => {
    let operationClicked = document.querySelector(`[data-operation="${event.key}"]`)
    
    if (operationClicked == null) return

    calculadora.chooseOperation(operationClicked.innerText);
    calculadora.updateDisplay()

});

window.addEventListener("keydown", (event) => {
    let equalCLiked = document.querySelector(`[data-equal="${event.key}"]`)

    if (equalCLiked == null && event.key != "Enter") return

    calculadora.compute()
    calculadora.updateDisplay()

});

window.addEventListener("keydown", (event) => {
    let deleteClicked = document.querySelector(`[data-delete="${event.key}"]`)

    if (deleteClicked == null) return

    calculadora.delete()
    calculadora.updateDisplay()
})


window.addEventListener("keydown", (event) => {
    let clearClicked = document.querySelector(`[data-clear="${event.key}"]`)

    if (clearClicked == null) return

    calculadora.clear()
})

