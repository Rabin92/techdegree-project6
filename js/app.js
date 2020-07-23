// Storing selected elements from DOM in a variable as a reference
const onScreenKeyboard = document.querySelector("#qwerty");
const startButton = document.querySelector(".btn__reset");
const ul = document.querySelector("#phrase ul");
const overlay = document.querySelector("#overlay");
const button = document.querySelectorAll("button");
const img = document.querySelectorAll(".tries img");

// Missed Variable
let missed = 0;

// Storing movieLists in an array
const movieLists = [
  "Hacksaw Ridge",
  "Into the Wild",
  "The Terminator",
  "Legend",
  "Joker",
  "The Lion King",
  "Toy Story",
];

// Attaching event listener to the 'Start Game' button
startButton.addEventListener("click", () => {
  overlay.style.display = "none"; // Start game

  // Call resetGame function
  resetGame();
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
    li.textContent = arr[i]; // Insert array character inside <li>
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
let phraseArray = getRandomPhraseAsArray(movieLists);
addPhrasetoDisplay(phraseArray);

// Check if a letter is in the phrase
const checkLetter = (button) => {
  const letters = document.querySelectorAll(".letter");
  let matched = null;
  for (let i = 0; i < letters.length; i++) {
    if (letters[i].textContent === button) {
      // Compare li textContent with button
      letters[i].classList.add("show");
      matched = true;
    }
  }
  // Showing the found letters
  return matched;
};

// Listen for the onscreen keyboard to be clicked
onScreenKeyboard.addEventListener("click", (e) => {
  const button = e.target;
  if (button.tagName === "BUTTON") {
    button.classList.add("chosen"); // Add a class to the selected letters.
    button.disabled = true; // Disable the letter that has been clicked.

    const letterFound = checkLetter(button.textContent.toUpperCase()); // Call a checkLetter function
    if (!letterFound) {
      // If the letter is not found, replace with 'lostHeart' image.
      const img = document.querySelectorAll(".tries img");
      img[missed].src = "images/lostHeart.png";
      missed++;
    }
    checkWin(); // Call a checkLetter function
  }
});

// Check if the game has been won or lost
const checkWin = () => {
  const li_letter = document.querySelectorAll("#phrase .letter");
  const li_show = document.querySelectorAll("#phrase .show");
  const title = document.querySelector(".title");

  if (li_letter.length === li_show.length) {
    // Comparing the length
    overlay.classList.replace("start", "win"); // Replace className.
    title.innerHTML = `You Won! <img class="wink_emoji" src="images/wink.png" alt="wink"><br>Would you like to play again?`;
    overlay.style.display = "flex";
    startButton.textContent = "Play Again";
  } else if (missed > 4) {
    overlay.classList.replace("start", "lose");
    title.innerHTML = `You loose! <img class="sad_emoji" src="images/sad.png" alt="sad_emoji"><br>Would you like to try again? `;
    overlay.style.display = "flex";
    startButton.textContent = "Try Again";
  }
};

// Reset a game function
const resetGame = () => {
  missed = 0; // Missed counter

  const letters = document.querySelectorAll(".letter");
  for (let i = 0; i < letters.length; i++) {
    letters[i].classList.remove("show");
  }

  for (let i = 0; i < img.length; i++) {
    img[i].src = "images/liveHeart.png";
  }

  for (let i = 0; i < button.length; i++) {
    button[i].classList.remove("chosen");
    button[i].removeAttribute("disabled");
  }

  ul.textContent = "";
  phraseArray = getRandomPhraseAsArray(movieLists);
  addPhrasetoDisplay(phraseArray);
};
