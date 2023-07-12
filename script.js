//calc2 branch

const display = document.querySelector(".display");
const operandBtns = document.querySelectorAll(".operand");
const operatorBtns = document.querySelectorAll(".operator");
const clearBtn = document.querySelector('.clearBtn');
const flipSignBtn = document.querySelector('.flipSign');


const calculator = {
  inputOperand: [],
  operandStr: "",
  inputOperator: [],
  history: [], //one pair of operations

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
    if (b === 0) {
      return NaN;
    }
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
        return "unknown operator";
    }
  },
}
function isOperator(str) {
  switch (str) {
    case "+":
    case "-":
    case "*":
    case "/":
      return true;
  }
  return false;

}
function isOperand(str) {
  str = Number(str);
  if (typeof str == 'number' && !isNaN(str)) {
    return true;
  }
  return false;

}
function updateDisplay(text) {
  text = +text;
  text = (text.toString().length > 9 ? text.toExponential(5) : text)
  display.textContent += text;

}
function clearDisplay() {
  display.textContent = "";
}
function getDisplayOutput() {
  return display.textContent;
}
function isDuplicateOperator(regex) {
  lastCharacter = calculator.inputOperator[calculator.inputOperator.length - 1]
  if (lastCharacter) {
    if (lastCharacter.match(regex)) {
      return true;
    }
  }

  return false;
}
function solveAsEquals() {
  let solution = 0;

  let operand1 = calculator.inputOperand[0];
  let operand2 = calculator.inputOperand[1]
  let operator = calculator.inputOperator[0];
  calculator.history[0] = operand1;
  calculator.history[1] = operator;
  calculator.history[2] = operand2;


  solution = calculator.operate(operand1, operator, operand2);
  display.classList.add('solution');
  clearDisplay();
  updateDisplay(solution);

  calculator.inputOperand = [];
  calculator.inputOperand.push(solution);
  calculator.inputOperator = [];
  calculator.operandStr = "";
}
function calculateOutput(e) {
  let currentInput = e.target.textContent; //str
  let solution = 0;


  //Checks if an operator is the current value
  if (isOperator(currentInput)) {
    //solves the first pair of operations before adding more operands/operators

    if (calculator.inputOperand.length >= 1 && calculator.inputOperator.length == 1 && calculator.operandStr.length) {
      calculator.inputOperand.push(calculator.operandStr);

      // let operand1 = calculator.inputOperand[0];
      // let operand2 = calculator.inputOperand[1]
      // let operator = calculator.inputOperator[0];
      // calculator.history[0] = operand1;
      // calculator.history[1] = operator;
      // calculator.history[2] = operand2;


      // solution = calculator.operate(operand1, operator, operand2);
      // display.classList.add('solution');
      // clearDisplay();
      // updateDisplay(solution);

      // calculator.inputOperand = [];
      // calculator.inputOperand.push(solution);
      // calculator.inputOperator = [];
      // calculator.operandStr = "";
      solveAsEquals();

    }

    if (calculator.inputOperator.length == 1) {
      calculator.inputOperator.pop(); //prevents overloading more than one operator
    }
    if (calculator.operandStr) {

      calculator.inputOperand.push(calculator.operandStr);
      calculator.operandStr = "";
    }
    calculator.inputOperator.push(currentInput);
  } else if (display.className.includes('solution') && isOperand(currentInput)) {
    clearDisplay();
    calculator.inputOperand = [];
    calculator.operandStr += currentInput;
    updateDisplay(calculator.operandStr);


  } else if (isOperand(currentInput)) {
    clearDisplay();
    calculator.operandStr += currentInput;
    updateDisplay(calculator.operandStr);

  }

  display.classList.remove('solution');

  if (currentInput == "=") {
    if (calculator.operandStr && calculator.inputOperand.length && calculator.inputOperator.length) {
      calculator.inputOperand.push(calculator.operandStr);
      // let operand1 = calculator.inputOperand[0];
      // let operand2 = calculator.inputOperand[1]
      // let operator = calculator.inputOperator[0];
      // calculator.history[0] = operand1;
      // calculator.history[1] = operator;
      // calculator.history[2] = operand2;


      // solution = calculator.operate(operand1, operator, operand2);
      // display.classList.add('solution');
      // clearDisplay();
      // updateDisplay(solution);

      // calculator.inputOperand = [];
      // calculator.inputOperand.push(solution);
      // calculator.inputOperator = [];
      // calculator.operandStr = "";
      solveAsEquals()
    } else if (calculator.inputOperand.length == 1 && currentInput == "=" && calculator.history) {
      //contineus to solve operation when repeatedly hitting '='
      let operand1 = calculator.inputOperand[0];
      let operator = calculator.history[1];
      let operand2 = calculator.history[2];

      calculator.history[0] = operand1;
      calculator.history[1] = operator;
      calculator.history[2] = operand2;

      solution = calculator.operate(operand1, operator, operand2);
      display.classList.add('solution');
      clearDisplay();
      updateDisplay(solution);

      calculator.inputOperand = [];
      calculator.inputOperand.push(solution);
      calculator.inputOperator = [];
      calculator.operandStr = "";
    }
  }


  // let storedOperators = calculator.inputOperand.match(operators); //array; example: ["+", "-"]


  // if (storedOperators && storedOperators.length == 2) {
  //   let [operand1, operand2] = calculator.inputOperand.split(operators);
  //   solution = calculator.operate(operand1, storedOperators[0], operand2);
  //   display.classList.add('solution');

  //   updateDisplay(solution);
  //   calculator.inputOperand = solution + storedOperators[1];

  // } else if (currentInput == "=" && storedOperators.length == 1) {
  //   let currentOperands = calculator.inputOperand.split(operators); //holds solution
  //   let pastOperands = calculator.inputOperator.split(operators);
  //   let pastOperator = calculator.inputOperator.match(operators);

  //   let operand1 = currentOperands[0];
  //   let operator = pastOperator[0];
  //   let operand2 = pastOperands[1];

  //   if (!operand2) {
  //     return;
  //   }

  //   solution = calculator.operate(operand1, operator, operand2);
  //   display.classList.add('solution');
  //   updateDisplay(solution);
  //   calculator.inputOperand = solution + '=';
  // }


  console.log('inputOperands: ' + calculator.inputOperand);
  console.log('inputOperators: ' + calculator.inputOperator);
  console.log('operandStr: ' + calculator.operandStr);
  console.log('history: ' + calculator.history);


}
flipSignBtn.addEventListener("click", function () {
  if (getDisplayOutput()) {
    let solution = getDisplayOutput();
    let newSolution = solution * -1;
    newSolution = newSolution.toString();
    clearDisplay()
    if (calculator.operandStr.length) {
      calculator.operandStr = newSolution;
    } else if (calculator.inputOperand.length) {
      calculator.inputOperand.pop();
      calculator.inputOperand.push(newSolution);
    }
    updateDisplay(newSolution)
  }
})

clearBtn.addEventListener("click", function () {
  calculator.inputOperand = [];
  calculator.inputOperator = [];
  calculator.operandStr = "";
  calculator.history = [];

  clearDisplay();
  updateDisplay(0);
  display.classList.add("solution");
  console.clear();
})
operandBtns.forEach((operand) => {
  operand.addEventListener("click", calculateOutput);
})
operatorBtns.forEach((operator) => {
  operator.addEventListener("click", calculateOutput);
})

updateDisplay(0);
display.classList.add("solution");
