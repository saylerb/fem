const calculator = document.querySelector(".calculator");
const debugText = document.getElementById("debug");

let commands = [];
let displayChars = [];

calculator.addEventListener("click", event => {
  const buttonText = event.target.innerHTML;

  if (event.target.tagName === "BUTTON") {
    [commands, displayChars] = update(buttonText, commands, displayChars);
  }

  renderDisplay(displayChars);

  debugText.innerHTML =
    event.target.tagName +
    "\nCommands:" +
    JSON.stringify(commands, null, 2) +
    "\nDisplay:" +
    JSON.stringify(displayChars, null, 2);
});

function update(buttonText, commands, displayChars) {
  const updatedCommands = commands.concat(buttonText);

  if (buttonText === "C") {
    return [[], []];
  }

  if (buttonText === "←") {
    return [updatedCommands, displayChars.splice(0, displayChars.length - 1)];
  }

  if (buttonText === "=") {
    const result = calculate(commands);
    return [updatedCommands, [result.toString()]];
  }

  if (!isNumber(buttonText)) {
    return [updatedCommands, []];
  }

  // A number was pressed
  return [updatedCommands, displayChars.concat(buttonText)];
}

function renderDisplay(displayChars) {
  const display = document.querySelector(".display");

  display.innerHTML = displayChars.join("");
}

function calculate(commands) {
  let result = null;
  let operator = null;

  const combined = combineCommands(commands);

  combined.forEach(thing => {
    if (!isNumber(thing)) {
      operator = thing;
    }

    if (isNumber(thing) && result === null) {
      result = parseInt(thing);
      operator = null;
    }

    if (isNumber(thing)) {
      if (operator === "+") result += parseInt(thing);
      if (operator === "×") result *= parseInt(thing);
      if (operator === "÷") result /= parseInt(thing);
      if (operator === "-") result -= parseInt(thing);
    }
  });
  return Math.floor(result);
}

function combineCommands(commands) {
  const combined = [];
  let current = "";

  commands.forEach(command => {
    if (isNumber(command)) {
      current = current.concat(command);
    } else {
      combined.push(current);
      current = "";
      combined.push(command);
    }
  });

  combined.push(current);

  console.log(combined);

  return combined;
}

function isNumber(text) {
  return !Number.isNaN(parseInt(text));
}
