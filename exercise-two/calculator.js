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
  const updatedDisplay = [...displayChars];

  const isNumber = !Number.isNaN(parseInt(buttonText));

  if (!isNumber) {
    if (buttonText === "C") {
      return [[], []];
    } else if (buttonText === "←") {
      return [
        updatedCommands,
        updatedDisplay.splice(0, updatedDisplay.length - 1)
      ];
    } else {
      return [updatedCommands, []]; // An operator was pressed
    }
  } else {
    updatedDisplay.push(buttonText);
  }

  return [updatedCommands, updatedDisplay];
}

function renderDisplay(displayChars) {
  const display = document.querySelector(".display");

  display.innerHTML = displayChars.join("");
}
