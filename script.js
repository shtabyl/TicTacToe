
function GameBoard() {
    const rows = 3;
    const columns = 3;
    const board = [];
    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < columns; j++) {
            board[i].push(Cell());
        }
    };
    
    const getBoard = () => board;
    const getRows = () => rows;
    const getColumns = () => columns;

    const markCell = (row, column, playerMark) => {
        board[row][column].addMark(playerMark);
    };
    
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    }

    return { getBoard, markCell, printBoard, getRows, getColumns };
}

function Cell() {
    let value = 0;

    const addMark = (playerMark) => {
        value = playerMark;
    };

    const getValue = () => value;

    return { addMark, getValue };
}

function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
) {
    const board = GameBoard();
    const cellsAmount = board.getRows() * board.getColumns();

    const players = [
        {
            name: playerOneName,
            mark: 1
        },
        {
            name: playerTwoName,
            mark: -1
        }
    ];

    const setPlayerName = (inputValues) => {
        for (let i = 0; i < players.length; i++) {
            players[i].name = inputValues[i].value;
        }
    };

    let activePlayer = players[0];

    let roundsPlayed = 0;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const getRoundsPlayed = () => roundsPlayed;

    const printNewRound = () => {
        // board.printBoard();
        // console.log(`${getActivePlayer().name}'s turn.`);
    };

    const checkForWinner = (row, column) => {
        const result = { row: 0, column: 0, crossUp: 0, crossDown: 0 };
        for (let i = 0; i < 3; i++) {
            if (board.getBoard()[1][1].getValue()) {
                result.crossDown += board.getBoard()[i][i].getValue();
                result.crossUp += board.getBoard()[2 - i][i].getValue();
            }
            result.row += board.getBoard()[row][i].getValue();
            result.column += board.getBoard()[i][column].getValue();
        }
        // console.log(result); // log result calculations
        if (
            Object.values(result).includes(3) 
            || Object.values(result).includes(-3)
            ) {
                return getActivePlayer().name;
        }
    };

    const playRound = (row, column) => {
        if (roundsPlayed === 0) {
            return;
        } 

        if (board.getBoard()[row][column].getValue() !== 0) {
            console.log('Invalid move');
            return;
        }

        roundsPlayed++;
        if (roundsPlayed <= 9) {
            console.log(`Round ${roundsPlayed}`); // log round number
        }
        // console.log(`Put ${getActivePlayer().name}'s mark into row ${row}, column ${column}`);
        
        board.markCell(row, column, getActivePlayer().mark);
        
        const winner = checkForWinner(row, column);

        if (winner) {
            stopGame(winner);
            return winner;
        } else if (roundsPlayed > cellsAmount) {
            stopGame(0);
            return 'Tie!';
        } else {
            switchPlayerTurn();
            printNewRound();
        }
    }

    const startGame = () => {
        board.getBoard().forEach(row => row.forEach(cell => cell.addMark(0)));
        activePlayer = players[0];
        roundsPlayed = 0;
        roundsPlayed++;
        console.log(`Round ${roundsPlayed}`); // log round number
        printNewRound();
    }
    
    const stopGame = (winner) => {
        roundsPlayed = 0;
        if (winner) {
            console.log(winner + ' WINS!');
            return `${winner} WINS!`;
        } else {
            console.log('Tie!');
            return 'Tie!';
        }
    }

    return { startGame, stopGame, playRound, getActivePlayer, switchPlayerTurn, getRoundsPlayed, checkForWinner, setPlayerName, board };
}

function ScreenController() {
    const playerTurnDiv = document.querySelector('.turn');
    const boardDiv = document.querySelector('.board');
    const startGameBtn = document.querySelector('.start-game');
    const resultDiv = document.querySelector('.result');
    const roundDiv = document.querySelector('.round');
    const playerNames = document.querySelectorAll('.player-name');
    
    // const game = GameController(playerNames[0].value, playerNames[1].value);
    const game = GameController();

    const changeNumbersToMarks = (cellValue) => {
        if (cellValue === 0) {
            return '';
        } else if (cellValue === 1) {
            return 'X';
        } else if (cellValue === -1) {
            return 'O';
        }
    }
    
    const updateScreen = () => {
        // clear the board
        boardDiv.textContent = '';

        // get the newest version of the board and player turn
        const activePlayer = game.getActivePlayer();
        const board = game.board.getBoard();

        // display player's turn, round when startBtn clicked
        if (game.getRoundsPlayed() > 0) {
            playerTurnDiv.textContent = `${activePlayer.name}'s turn...`;
            roundDiv.textContent = `Round ${game.getRoundsPlayed()}`;
        }

        // render board squares
        board.forEach((row, rowIndex) => {
            row.forEach((cell, columnIndex) => {
                const cellButton = document.createElement('button');
                cellButton.classList.add('cell');
                cellButton.dataset.row = rowIndex;
                cellButton.dataset.column = columnIndex;
                cellButton.textContent = changeNumbersToMarks(cell.getValue());
                boardDiv.appendChild(cellButton);
            });
        });
    }

    function clickHandleBoard(e) {
        const selectedRow = e.target.dataset.row;
        const selectedColumn = e.target.dataset.column;
        // make sure cell was clicked not the gaps between
        if (!selectedRow || !selectedColumn) {
            return;
        }

        const result = game.playRound(selectedRow, selectedColumn);
        if (result && result !== 'Tie!') {
            resultDiv.textContent = `${result} wins!`;
        } else if (result === 'Tie!') {
            resultDiv.textContent = 'Tie!';
        }
        updateScreen();
    }

    // Add event listener for cell
    boardDiv.addEventListener('click', clickHandleBoard);
    
    function clickStartGame() {
        game.startGame();
        game.setPlayerName(playerNames);
        resultDiv.textContent = '';
        updateScreen();
    }

    // Add event listener for start game
    startGameBtn.addEventListener('click', clickStartGame);

    // Initial render
    updateScreen();
}

ScreenController();

module.exports = { GameBoard, GameController };