let currentPlayer = "X";
let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let aiEnabled = true;

const statusDisplay = document.getElementById("status");
const gameBoard = document.getElementById("gameBoard");
const modeSelect = document.getElementById("mode");

const winConditions = [
  [0,1,2], [3,4,5], [6,7,8],
  [0,3,6], [1,4,7], [2,5,8],
  [0,4,8], [2,4,6]
];

function changeMode() {
  aiEnabled = modeSelect.value === "ai";
  resetGame(); // reset board when mode changes
}

function handleCellClick(index) {
  if (!gameActive || board[index] !== "") return;

  makeMove(index, currentPlayer);

  if (checkWin(currentPlayer)) {
    statusDisplay.textContent = `Player ${currentPlayer} wins!`;
    gameActive = false;
    highlightWin(currentPlayer);
    return;
  }

  if (board.every(cell => cell !== "")) {
    statusDisplay.textContent = "It's a draw!";
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.textContent = `Player ${currentPlayer}'s turn`;

  if (aiEnabled && currentPlayer === "O") {
    setTimeout(aiMove, 300); // Add small delay
  }
}

function makeMove(index, player) {
  board[index] = player;
  renderBoard();
}

function aiMove() {
  if (!gameActive) return;

  const emptyIndices = board
    .map((cell, i) => (cell === "" ? i : null))
    .filter(i => i !== null);

  const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  handleCellClick(randomIndex);
}

function checkWin(player) {
  return winConditions.some(condition =>
    condition.every(index => board[index] === player)
  );
}

function highlightWin(player) {
  const winningCombo = winConditions.find(condition =>
    condition.every(index => board[index] === player)
  );

  if (winningCombo) {
    winningCombo.forEach(index => {
      document.getElementsByClassName("cell")[index].classList.add("win");
    });
  }
}

function renderBoard() {
  gameBoard.innerHTML = "";
  board.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.textContent = cell;
    div.addEventListener("click", () => handleCellClick(index));
    gameBoard.appendChild(div);
  });
}

function resetGame() {
  currentPlayer = "X";
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  statusDisplay.textContent = `Player X's turn`;
  renderBoard();
}

// Initial render
changeMode();
