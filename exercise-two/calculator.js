// Event delegation

const calculator = document.querySelector(".calculator");
const debugText = document.getElementById("debug");

const commands = [];

calculator.addEventListener("click", event => {
  if (event.target.tagName === "BUTTON") {
    const buttonText = event.target.innerHTML;

    commands.push(buttonText);
  }
  debugText.innerHTML =
    event.target.tagName + "\nCommands:" + JSON.stringify(commands, null, 2);
});
