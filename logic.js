let playerText = document.querySelector(".playerText");
let boxes = Array.from(document.getElementsByClassName("box"));
let restartBtn = document.querySelector(".reset");
let turnX = document.querySelector(".turn1")
let turnO = document.querySelector(".turn2")

let winnerIndicator = getComputedStyle(document.body).getPropertyValue(
  "--winning-blocks"
);
let drawIndicator = getComputedStyle(document.body).getPropertyValue(
  "--draw-blocks"
);
turnX.style.color ="var(--turn-color)"
const O_TEXT = "O";
const X_TEXT = "X";
let currentPlayer = X_TEXT;

let spaces = Array(9).fill(null);
let countnum = 0;

const startGame = () => {
  boxes.forEach((box) => box.addEventListener("click", boxClicked));
};

function boxClicked(e) {
  const id = e.target.id;
  countnum++;

  if (!spaces[id] && countnum < 9) {
    spaces[id] = currentPlayer;
    e.target.innerText = currentPlayer;

    if (playerHasWon() !== false) {
      playerText.innerText = `${currentPlayer} has won!`;
      countnum = 10;
      let winning_blocks = playerHasWon();

      winning_blocks.map(
        (box) => (boxes[box].style.backgroundColor = winnerIndicator)
      );
      boxes.forEach((box) => {
        box.disabled = true;
      });
      return;
    }

    currentPlayer = currentPlayer == X_TEXT ? O_TEXT : X_TEXT;
    if (currentPlayer == X_TEXT) {
        turnX.style.color ="var(--turn-color)"
        turnO.style.color ="#333" 
    }
    else {
      turnO.style.color ="var(--turn-color)"
      turnX.style.color ="#333"
    }
  }
  if (countnum === 9) {
    playerText.innerText = `It's a tie !!!`;
    boxes.forEach((box) => (box.style.color = drawIndicator));
    playerText.style.color = drawIndicator;
  }
}

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function playerHasWon() {
  for (const condition of winningCombos) {
    let [a, b, c] = condition;

    if (spaces[a] && spaces[a] == spaces[b] && spaces[a] == spaces[c]) {
      return [a, b, c];
    }
  }
  return false;
}

restartBtn.addEventListener("click", restart);

function restart() {
  spaces.fill(null);
  turnX.style.color ="var(--turn-color)"
  turnO.style.color ="#333"
  boxes.forEach((box) => {
    box.innerText = "";
    box.style.backgroundColor = "";
    box.style.color = "#f2c14e";
  });

  playerText.innerText = "";
  countnum = 0;
  currentPlayer = X_TEXT;
  boxes.forEach((box) => {
    box.disabled = false;
  });
}

startGame();
