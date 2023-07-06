class Calculator {
    constructor(previousDisplay,curentDisplay){
        this.previousDisplay = previousDisplay
        this.curentDisplay = curentDisplay
        this.clear()
    }

clear() {
    this.previousOperand = ""
    this.curentOperand = ""
    this.operation = undefined
}

delet() {
    this.curentOperand = this.curentOperand.toString().slice(0,-1)
}

appendNUmber(number) {
    if (number === "." && this.curentOperand.includes(".")) return
    this.curentOperand += number.toString()
}

chooseoperator(operation) {
    if (this.curentOperand === "") return
    if (this.previousOperand != "") {
        this.comupte()
    }

    this.operation = operation
    this.previousOperand = this.curentOperand
    this.curentOperand = ""
}

comupte() {
    let computation 
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.curentOperand)
    if (isNaN(prev) || isNaN(current)) return
    switch(this.operation){
        case "+":
            computation = prev + current
            break
        case "-":
            computation = prev - current
            break
        case "x":
            computation = prev * current
            break
        case "/":
            computation = prev / current
            break
        default:
            return    
    }
    this.curentOperand = computation
    this.operation = undefined
    this.previousOperand = ""
}

updateDisplay() {
    this.curentDisplay.innerHTML = this.curentOperand
    if (this.operation != null) {
        this.previousDisplay.innerHTML = `${this.previousOperand} ${this.operation}`
    }else
        this.previousDisplay.innerHTML = this.previousOperand

    }

}


const previousDisplay = document.querySelector("[data-previous")
const curentDisplay = document.querySelector("[data-curent]")

const numberButton = document.querySelectorAll("[data-namber]")
const operationButton = document.querySelectorAll("[data-operation]")

const delButton = document.querySelector("[delet-operation]")
const allClear_Button = document.querySelector("[all-clear]")
const eqvalButton = document.querySelector("[eqval-operation]")


const calculator = new Calculator(previousDisplay,curentDisplay)

numberButton.forEach(button => {
    button.addEventListener("click", () => {
        calculator.appendNUmber(button.innerHTML)
        calculator.updateDisplay()
    })
})

operationButton.forEach(button => {
    button.addEventListener("click", () => {
        calculator.chooseoperator(button.innerHTML)
        calculator.updateDisplay()
    })
})

eqvalButton.addEventListener("click", button => {
    calculator.comupte()
    calculator.updateDisplay()
})

allClear_Button.addEventListener("click", button => {
    calculator.clear()
    calculator.updateDisplay()
})

delButton.addEventListener("click", button => {
    calculator.delet()
    calculator.updateDisplay()
})