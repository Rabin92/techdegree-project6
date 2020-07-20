// Storing selected elements from DOM in a variable as a reference
const qwerty = document.querySelector("#qwerty");
const phrase = document.querySelector("#phrase");
const startButton = document.querySelector(".btn__reset");
const overlay = document.querySelector("#overlay");
const ul = document.querySelector("#phrase ul");
const letters = document.querySelectorAll(".letter");

// Missed Variable
let missed = 0;

// Storing movieLists in an array
const movieLists = [
  "Hacksaw Ridge",
  "The Lion King",
  "Toy Story",
  "Into the Wild",
  "The Terminator",
];

// Attaching event listener to the 'Start Game' button
startButton.addEventListener("click", () => {
  overlay.style.display = "none"; // Start game
});

// Return a random phrase from an array (phrases)
const getRandomPhraseAsArray = (arr) => {
  const randomPhrase = arr[Math.floor(Math.random() * arr.length)]; // Bracket notation access the array value.
  const splitPhrase = randomPhrase.toUpperCase().split(""); // Split a string into an array of substrings.
  return splitPhrase;
};

// Calling a function and passing an argument: (movieLists)
getRandomPhraseAsArray(movieLists);

// Add phrase to display
const addPhrasetoDisplay = (arr) => {
  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement("LI"); // Create <li> node.
    li.textContent = arr[i]; // Insert arr character inside <li>
    ul.appendChild(li); // Append <li> node to the <ul>.
    // Conditional Statement
    if (arr[i] != " ") {
      li.className = "letter";
    } else {
      li.className = "space";
    }
  }
};

// Calling a function
const phraseArray = getRandomPhraseAsArray(movieLists);
addPhrasetoDisplay(phraseArray);

// Check if a letter is in the phrase
const checkLetter = (button) => {
  let matched = null;
  for (let i = 0; i < letters.length; i++) {
    if (buttonClicked === letters[i].textContent) {
      // Comparing textContent of button and <li class="letter">.
      letters[i].classList.add("show");
      matched = true;
    }
  }
  // Showing the found letters
  return matched;
};

// Listen for the onscreen keyboard to be clicked
qwerty.addEventListener("click", (e) => {
  const button = e.target;
  if (button.tagName === "BUTTON") {
    button.classList.add("chosen"); // Add a class to the selected letters.
    button.disabled = true; // Disable the letter that has been clicked.
  }
  const letterFound = checkLetter(button.textContent.toUpperCase()); // Call a checkLetter function
});
