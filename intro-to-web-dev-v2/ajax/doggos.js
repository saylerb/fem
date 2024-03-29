const DOG_URL = "https://dog.ceo/api/breeds/image/random";

const promise = fetch(DOG_URL);

promise
  .then(function(response) {
    const processingPromise = response.json();
    return processingPromise;
  })
  .then(function(processedResponse) {
    console.log(processedResponse);
    renderDoggo(processedResponse.message);
  });

function renderDoggo(url) {
  const element = document.querySelector(".doggos");

  const image = document.createElement("img");
  image.setAttribute("src", url);
  image.setAttribute("alt", "cute doggo");

  element.appendChild(image);
}
