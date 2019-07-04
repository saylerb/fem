// Event delegation

const calculator = document.querySelector(".calculator");
const debugText = document.getElementById("debug");

let commands = [];

calculator.addEventListener("click", event => {
  const buttonText = event.target.innerHTML;

  if (event.target.tagName === "BUTTON") {
    commands = updateCommands(buttonText, commands);
  }

  debugText.innerHTML =
    event.target.tagName + "\nCommands:" + JSON.stringify(commands, null, 2);
});

function updateCommands(buttonText, commands) {
  const updated = commands.concat(buttonText);

  const isNumber = !Number.isNaN(parseInt(buttonText));

  if (!isNumber) {
    if (buttonText === "C") {
      return [];
    }
  }

  return updated;
}
