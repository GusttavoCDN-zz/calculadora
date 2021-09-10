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

equal.addEventListener("click", button => {
    alert("VOCÊ SABIA?? PESSOAS QUE USAM UMA CALCULADORA EM VEZ DE DECORAR A TABUADA TEM 100% A MAIS DE CHANCE DE SEREM CORNOS!")
}, {once: true})
