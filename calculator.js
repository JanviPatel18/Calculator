var mouseInput = false;


function append(value) {
  document.getElementById('display').textContent += value;
  mouseInput = true; 
}


function calculate() {
  var expression = document.getElementById('display').textContent;
  var result = evaluateExpression(expression);
  document.getElementById('display').textContent = result;
}

function evaluateExpression(expression) {
  var operators = ['x', '/', '+', '-'];
  for (var i = 0; i < operators.length; i++) {
    var operator = operators[i];
    var operatorIndex = expression.indexOf(operator);
    if (operatorIndex !== -1) {
      if (operator === '-' && operatorIndex === 0) {
        var num1 = 0;
        var num2 = evaluateExpression(expression.substring(operatorIndex + 1));
        return operate(num1, num2, operator);
      } else {
        var num1 = evaluateExpression(expression.substring(0, operatorIndex));
        var num2 = evaluateExpression(expression.substring(operatorIndex + 1));
        return operate(num1, num2, operator);
      }
    }
  }
  return parseFloat(expression);
}

function operate(num1, num2, operator) {
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case 'x':
      return num1 * num2;
    case '/':
      if (num2 === 0) {
        return 'Error';
      }
      return num1 / num2;
    case '+/-':
      return ;
    case '%':
      return ;
    default:
      return NaN;
  }
}

function calculatePercentage() {
  let display = document.getElementById('display');
  let currentValue = parseFloat(display.textContent);

  if (!isNaN(currentValue)) {
    // If the current value is a number
    let previousValue = parseFloat(display.getAttribute('data-previous-value'));
    let operator = display.getAttribute('data-operator');

    if (operator === null) {
      // If there's no previous operator, convert the current value to a percentage
      let percentageValue = currentValue / 100;
      display.textContent = percentageValue;
    } else {
      // If there's a previous operator, calculate the percentage based on the operator
      let result;
      switch (operator) {
        case '+':
          result = previousValue + (previousValue * (currentValue / 100));
          break;
        case '-':
          result = previousValue - (currentValue * (previousValue / 100));
          break;
        case 'x':
          result =  (currentValue / 100) * previousValue ;
          break;
        case '/':
          if (currentValue === 0) {
            return 'Error'; // Handle division by zero
          }
          result = previousValue / (currentValue / 100);
          break;
        default:
          result = NaN;
      }
      display.textContent = result;
    }
  } else {
    // If the current value is not a number, reset the display
    display.textContent = '';
  }
}









function clearDisplay() {
  document.getElementById('display').textContent = '';
}

document.getElementById('blank').addEventListener('click', function() {
  mouseInput = true; 
});

document.addEventListener('keydown', function() {
  if (mouseInput) {
    document.getElementById('blank').focus();
  }
  mouseInput = false; 
});



function toggleSign() {
  let displayElement = document.getElementById('display');
  let currentValue = parseFloat(displayElement.textContent);

  if (displayElement.textContent !== '') {
    if (!Number.isNaN(currentValue)) {
      displayElement.textContent = -currentValue;
    } else {
      displayElement.textContent = '';
    }
  } else {
    return ''; // Or handle empty display as needed
  }
  return displayElement.textContent; // Option to return the value as well
}


function updateDisplay(value) {
  document.getElementById('display').textContent = value;
}

Mousetrap.bind('0', function() { append('0'); });
Mousetrap.bind('1', function() { append('1'); });
Mousetrap.bind('2', function() { append('2'); });
Mousetrap.bind('3', function() { append('3'); });
Mousetrap.bind('4', function() { append('4'); });
Mousetrap.bind('5', function() { append('5'); });
Mousetrap.bind('6', function() { append('6'); });
Mousetrap.bind('7', function() { append('7'); });
Mousetrap.bind('8', function() { append('8'); });
Mousetrap.bind('9', function() { append('9'); });
Mousetrap.bind('*', function() { append('x'); });
Mousetrap.bind('/', function() { append('/'); });
Mousetrap.bind('+', function() { append('+'); });
Mousetrap.bind('-', function() { append('-'); });
Mousetrap.bind('.', function() { append('.'); });
Mousetrap.bind('enter', calculate);
Mousetrap.bind('esc', clearDisplay);

