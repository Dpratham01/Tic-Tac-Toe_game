let board = Array(9).fill(null);
let currentPlayer;
const scores = {};
let player1, player2;
const symbol1 = 'X';
const symbol2 = 'O';

function startGame() {
    player1 = document.getElementById("player1").value.trim();
    player2 = document.getElementById("player2").value.trim();

    if (!player1 || !player2) {
        alert("Please enter names for both players.");
        return;
    }

    document.getElementById("game-setup").style.display = "none";
    document.getElementById("game").style.display = "block";

    currentPlayer = player1;
    scores[player1] = scores[player1] || 0;
    scores[player2] = scores[player2] || 0;

    resetGame(); // Reset the board and scores
    updateTurnInfo();
    updateScoreboard();
}

function renderBoard() {
    const boardElement = document.getElementById("board");
    boardElement.innerHTML = '';

    board.forEach((cell, index) => {
        const cellElement = document.createElement("div");
        cellElement.classList.add("cell");
        cellElement.innerText = cell || '';
        cellElement.onclick = () => makeMove(index);
        boardElement.appendChild(cellElement);
    });
}

function makeMove(index) {
    if (board[index] || checkWinner() || checkDraw()) return;

    board[index] = currentPlayer === player1 ? symbol1 : symbol2;
    renderBoard();

    if (checkWinner()) {
        setTimeout(() => {
            document.getElementById("result-message").innerText = `Congratulations ${currentPlayer}, you win!`;
            scores[currentPlayer]++;
            updateScoreboard();
            saveScores();
        }, 100);
    } else if (checkDraw()) {
        setTimeout(() => {
            document.getElementById("result-message").innerText = "It's a Draw!";
        }, 100);
    } else {
        currentPlayer = currentPlayer === player1 ? player2 : player1;
        updateTurnInfo();
    }
}

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    return winningCombinations.some(([a, b, c]) => {
        return board[a] && board[a] === board[b] && board[a] === board[c];
    });
}

function checkDraw() {
    return board.every(cell => cell !== null);
}

function updateTurnInfo() {
    document.getElementById("turn-info").innerText = `Current Player: ${currentPlayer}`;
}

function updateScoreboard() {
    document.getElementById("player1-score").innerText = `${player1}: ${scores[player1]}`;
    document.getElementById("player2-score").innerText = `${player2}: ${scores[player2]}`;
}

function resetGame() {
    board = Array(9).fill(null);
    renderBoard();
    document.getElementById("result-message").innerText = "";

    // Reset both players' scores to 0
    scores[player1] = 0;
    scores[player2] = 0;
    updateScoreboard();
}

function rematch() {
    board = Array(9).fill(null);
    renderBoard();
    document.getElementById("result-message").innerText = "";
    currentPlayer = player1;
    updateTurnInfo();
}

function saveScores() {
    // Logic to save scores (e.g., to localStorage) can be implemented here
}

function toggleDarkMode() {
    document.body.classList.toggle("dark-mode");
    const button = document.getElementById("toggle-mode");
    button.innerText = document.body.classList.contains("dark-mode") ? "Switch to Light Mode" : "Switch to Dark Mode";
}

function toggleScoreboard() {
    const scoreboard = document.getElementById('scoreboard');
    const toggleButton = document.getElementById('toggle-scoreboard');

    if (scoreboard.style.display === 'none' || !scoreboard.style.display) {
        scoreboard.style.display = 'block';
        toggleButton.innerText = 'Hide Scoreboard';
    } else {
        scoreboard.style.display = 'none';
        toggleButton.innerText = 'Show Scoreboard';
    }
}

