const display = document.querySelector(".display");
const operandBtns = document.querySelectorAll(".operand");
const operatorBtns = document.querySelectorAll(".operator");
const clearBtn = document.querySelector('.clearBtn');


const calculator = {
  input: "",
  history: "",

  add: function (a, b) {
    return a + b;
  },
  subtract: function (a, b) {
    return a - b;
  },
  multiply: function (a, b) {
    return a * b;
  },
  divide: function (a, b) {
    return a / b;
  },
  operate: function (operand1, operator, operand2) {
    operand1 = +operand1;
    operand2 = +operand2;

    switch (operator) {
      case "+":
        return this.add(operand1, operand2);
      case "-":
        return this.subtract(operand1, operand2);
      case "*":
        return this.multiply(operand1, operand2);
      case "/":
        return this.divide(operand1, operand2);
      default:
        return "unknown";
    }
  },
}
function isOperator(str) {
  switch (str) {
    case "+":
    case "-":
    case "*":
    case "/":
    case "=":
      return true;
  }
  return false;

}
function isOperand(str) {
  str = Number(str);
  console.log(str);
  if (typeof str == 'number' && !isNaN(str)) {
    return true;
  }
  return false;

}
function updateDisplay(text) {

  display.textContent += text;

}
function clearDisplay() {
  display.textContent = "";
}
function getDisplayOutput() {
  return display.textContent;
}
function isDuplicateOperator(regex) {
  lastCharacter = calculator.input[calculator.input.length - 1]
  if (lastCharacter.match(regex)) {
    return true;
  }
  return false;
}
function calculateOutput(e) {
  let currentInput = e.target.textContent; //str
  let solution;
  let operators = /[+-/*=]+/g;

  //clears the display when an operator is inputed
  if (isOperator(currentInput)) {
    clearDisplay();
    if (isDuplicateOperator(operators)) {
      let lastChar = calculator.input[calculator.input.length - 1]
      calculator.input = calculator.input.replace(lastChar, "");
      calculator.history = calculator.history.replace(lastChar, "");
    }
  } else if (display.className.includes('solution')) {
    clearDisplay();
    updateDisplay(currentInput);
  } else {
    updateDisplay(currentInput);
  }
  calculator.input += currentInput;
  calculator.history += currentInput;
  display.classList.remove('solution');

  let storedOperators = calculator.input.match(operators); //array; example: ["+", "-"]


  if (storedOperators && storedOperators.length == 2) {
    let [operand1, operand2] = calculator.input.split(operators);
    solution = calculator.operate(operand1, storedOperators[0], operand2);
    display.classList.add('solution');

    updateDisplay(solution);
    calculator.input = solution + storedOperators[1];
  } else if (currentInput == "=" && storedOperators.length == 1) {
    let currentOperands = calculator.input.split(operators);
    let operand1 = currentOperands[0];
    let operator = calculator.history[calculator.history.length - 3];
    let operand2 = calculator.history[calculator.history.length - 2];

    solution = calculator.operate(operand1, operator, operand2);
    display.classList.add('solution');
    updateDisplay(solution);
    calculator.input = solution + '=';
  }


  console.log('input: ' + calculator.input);
  console.log('History: ' + calculator.history);
}

clearBtn.addEventListener("click", function () {
  calculator.input = "";
  calculator.history = "";
  clearDisplay();
  console.clear();
})
operandBtns.forEach((operand) => {
  operand.addEventListener("click", calculateOutput);
})
operatorBtns.forEach((operator) => {
  operator.addEventListener("click", calculateOutput);
})
