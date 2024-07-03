let editedPlayer = 0;
let activePlayer = 0;
let round = 0;
let wonPlayer = 0;

const players = [
  {
    name: "",
    symbol: "X",
  },
  {
    name: "",
    symbol: "O",
  },
];

let gameBoard = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

/*gameBoard.push("abc")
let newA = gameBoard.slice(1, 3)
console.log(newA)*/

const start = document.querySelector("#game-configuration #play");
const bar = document.getElementById('bar');
const nameBoard = document.querySelector('#game-configuration ol')

const aside = document.querySelector("aside");
const backdrop = document.getElementById("backdrop");

const edit1 = document.getElementById("edit1");
const edit2 = document.getElementById("edit2");

const confirmButton = document.getElementById("confirm");
const cancelButton = document.getElementById("cancel");

const form = document.querySelector("form");

const validText = document.getElementById("valid");
const label = document.querySelector("aside label");
const input = document.getElementById("player-name");

const gameArea = document.getElementById("game-active");
const textGame = document.getElementById("textGame");
const board = document.getElementById('game-board')
const gameFields = document.querySelectorAll("#game-board li");
const activePlayerName = document.getElementById('active-player-name');
const articleElement = document.querySelector("#game-active article");
const winner = document.querySelector("#game-active article h3");

edit1.addEventListener("click", openChooseName);
edit2.addEventListener("click", openChooseName);

cancelButton.addEventListener("click", closeChooseName);
backdrop.addEventListener("click", closeChooseName);

form.addEventListener("submit", saveConfiguration);

start.addEventListener("click", startGame);

for (const gameField of gameFields) {
  if (gameOver() == 0) {
    gameField.addEventListener("click", play);
  } 
}


