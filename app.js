let gameSequence = [];
let userSequence = [];

const buttons = ["yellow", "red", "purple", "green"];

let isGameStarted = false;
let level = 0;

const levelDisplay = document.querySelector("h2");

document.addEventListener("keypress", function (event) {
  if (!isGameStarted) {
    console.log("Game has started");
    isGameStarted = true;
    levelUp();
  }
});

function flashButton(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 250);
}

function userClickHandler() {
  const clickedButton = this;
  flashButton(clickedButton);

  const clickedColor = clickedButton.getAttribute("id");
  userSequence.push(clickedColor);

  checkAnswer(userSequence.length - 1);
}

function levelUp() {
  userSequence = [];
  level++;
  levelDisplay.innerText = `Level ${level}`;

  const randomIndex = Math.floor(Math.random() * buttons.length);
  const randomColor = buttons[randomIndex];
  const randomButton = document.querySelector(`.${randomColor}`);
  gameSequence.push(randomColor);
  console.log(gameSequence);
  flashButton(randomButton);
}

function checkAnswer(index) {
  if (userSequence[index] === gameSequence[index]) {
    if (userSequence.length === gameSequence.length) {
      setTimeout(levelUp, 1000);
    }
  } else {
    levelDisplay.innerHTML = `Game Over! Your score was <b>${level}</b> <br> Press any key to start.`;
    document.querySelector("body").style.backgroundColor = "red";
    setTimeout(function () {
      document.querySelector("body").style.backgroundColor = "white";
    }, 150);
    resetGame();
  }
}

const allButtons = document.querySelectorAll(".btn");
allButtons.forEach(button => button.addEventListener("click", userClickHandler));

function resetGame() {
  isGameStarted = false;
  gameSequence = [];
  userSequence = [];
  level = 0;
}

