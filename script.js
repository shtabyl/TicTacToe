function createUser (name, mark) {
    return {name, mark}
}

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

    const markCell = (row, column, playerMark) => {
        // if (board[row][column].getValue() !== 0) {
        //     return;
        // }
        board[row][column].addMark(playerMark);
    };
    
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    }

    return { getBoard, markCell, printBoard };
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

    let activePlayer = players[0];

    let roundsPlayed = 0;

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
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
        console.log(result);
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
        console.log(`Round ${roundsPlayed}`); // log round number
        console.log(`Put ${getActivePlayer().name}'s mark into row ${row}, column ${column}`);
        
        board.markCell(row, column, getActivePlayer().mark);
        
        const winner = checkForWinner(row, column);

        if (winner) {
            stopGame(winner);
            return;
        } else if (roundsPlayed === 9) {
            stopGame(0);
        } else {
            switchPlayerTurn();
            printNewRound();
        }
    }

    const startGame = () => {
        printNewRound();
        roundsPlayed++;
        console.log(`Round ${roundsPlayed}`); // log round number
    }
    
    const stopGame = (winner) => {
        if (winner) {
            console.log(winner + ' WINS!');
        } else {
            console.log('Tie!');
        }
        board.getBoard().map((row) => row.map((cell) => cell.addMark(0)));
        roundsPlayed = 0;
    }

    return { startGame, startGame, playRound, getActivePlayer };
}


const game = GameController();