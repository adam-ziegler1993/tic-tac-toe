// Gameboard Object
const gameBoard = {
    board: ["", "", "", "", "", "", "", "", ""],

    updateBoard(index, symbol) {
        if (this.board[index] === "") {
            this.board[index] = symbol;
            return true;
        }
        return false;
    },

    resetBoard() {
        this.board = ["", "", "", "", "", "", "", "", ""];
    },

    displayBoard() {
        const squares = document.querySelectorAll('.square');
        squares.forEach((square, index) => {
            square.textContent = this.board[index];
        });
    }
};

// Player Object
const Player = (name, symbol) => {
    return {
        name,
        symbol,
        wins: 0
    };
};

// Gameplay Object
const game = {
    players: [],
    currentPlayerIndex: 0,
    isGameActive: true,
    winningScore: 3,

    initializeGame() {
        // Prompt for player names and symbols
        const playerOneName = prompt("Player One: What's your name?");
        const playerOneSymbol = prompt(`${playerOneName}, choose your symbol (X or O)`).toUpperCase();
        const playerTwoName = prompt("Player Two: What's your name?");
        const playerTwoSymbol = playerOneSymbol === 'X' ? 'O' : 'X'; // Assign the opposite symbol to Player Two

        this.players.push(Player(playerOneName, playerOneSymbol));
        this.players.push(Player(playerTwoName, playerTwoSymbol));

        alert(`We have a HUGE tic-tac-toe battle today between ${this.players[0].name} (${this.players[0].symbol}) and ${this.players[1].name} (${this.players[1].symbol})! First to 3 wins is declared the overall winner!`);

        this.addEventListeners();
        this.updateTurnPrompt();
        gameBoard.displayBoard();
    },

    switchPlayer() {
        this.currentPlayerIndex = this.currentPlayerIndex === 0 ? 1 : 0;
        this.updateTurnPrompt();
    },

    handleSquareClick(index) {
        if (!this.isGameActive) return;

        const currentPlayer = this.players[this.currentPlayerIndex];
        const moveSuccessful = gameBoard.updateBoard(index, currentPlayer.symbol);

        if (moveSuccessful) {
            gameBoard.displayBoard();
            if (this.checkWinner()) {
                alert(`${currentPlayer.name} wins this round!`);
                currentPlayer.wins += 1;
                this.checkOverallWinner();
            } else if (this.checkDraw()) {
                alert("It's a draw!");
                this.resetRound();
            } else {
                this.switchPlayer();
            }
        }
    },

    checkWinner() {
        const winningCombinations = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];

        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return gameBoard.board[a] && gameBoard.board[a] === gameBoard.board[b] && gameBoard.board[a] === gameBoard.board[c];
        });
    },

    checkDraw() {
        return gameBoard.board.every(cell => cell !== "");
    },

    updateTurnPrompt() {
        const currentPlayer = this.players[this.currentPlayerIndex];
        alert(`${currentPlayer.name}'s turn (${currentPlayer.symbol})`);
    },

    checkOverallWinner() {
        const currentPlayer = this.players[this.currentPlayerIndex];
        if (currentPlayer.wins >= this.winningScore) {
            alert(`${currentPlayer.name} is the overall winner with ${currentPlayer.wins} wins!`);
            this.isGameActive = false;
            this.resetGame();
        } else {
            this.resetRound();
        }
    },

    addEventListeners() {
        const squares = document.querySelectorAll('.square');
        squares.forEach((square, index) => {
            square.addEventListener('click', () => this.handleSquareClick(index));
        });
    },

    resetRound() {
        gameBoard.resetBoard();
        gameBoard.displayBoard();
        this.isGameActive = true;
        this.updateTurnPrompt();
    },

    resetGame() {
        gameBoard.resetBoard();
        gameBoard.displayBoard();
        this.isGameActive = true;
        this.currentPlayerIndex = 0;
        this.players.forEach(player => player.wins = 0);
        this.updateTurnPrompt();
    }
};

// Initialize the game when the page loads
document.addEventListener("DOMContentLoaded", () => {
    game.initializeGame();
});
