const input = document.querySelector("input");
const result = document.querySelector(".result");
const errorDiv = document.querySelector(".error");
const pleaseWait = document.createElement("span");

pleaseWait.innerText = "Please wait...";
const noResult = document.createElement("span");
noResult.innerText = "No results";

input.addEventListener("keyup", function (event) {
  console.log("Search value", event.target.value);

  errorDiv.innerHTML = "";
  result.appendChild(pleaseWait);

  fetch(
    "https://itunes.apple.com/search?&entity=song&term=" + event.target.value
  )
    .then((response) => response.json())
    .then((json) => {
      result.innerHTML = "";
      if (json.resultCount === 0) {
        result.appendChild(noResult);
      } else {
        json.results.forEach((song) => {
          const listElement = createListElement(song);
          result.appendChild(listElement);
        });
      }
    })
    .catch((err) => displayError(err));
});

function createListElement(songObject) {
  const li = document.createElement("li");
  li.innerHTML = `${songObject.artistName} : ${songObject.trackName}`;
  return li;
}

function displayError(err) {
  result.innerHTML = "";
  const message = document.createElement("span");
  message.innerText = "Something went wrong! " + err.message;
  errorDiv.appendChild(message);
}
