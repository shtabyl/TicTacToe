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
        if (board[row][column].getValue() !== null) {
            return
        }
        board[row][column].addMark(playerMark);
    };
    
    const printBoard = () => {
        const boardWithCellValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardWithCellValues);
    }

    return {getBoard, markCell, printBoard};
}

function Cell() {
    let value = null;

    const addMark = (playerMark) => {
        value = playerMark; // value = player.mark;
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
            mark: 0
        },
        {
            name: playerTwoName,
            mark: 1
        }
    ];

    let activePlayer = players[0];

    const switchPlayerTurn = () => {
        activePlayer = activePlayer === players[0] ? players[1] : players[0];
    };

    const getActivePlayer = () => activePlayer;

    const printNewRound = () => {
        board.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    };

    const playRound = (row, column) => {
        console.log(`Put ${getActivePlayer().name}'s mark into row ${row}, column ${column}`);
        board.markCell(row, column, getActivePlayer().mark)
        
        switchPlayerTurn();
        printNewRound();
    }

    printNewRound();

    return { playRound, getActivePlayer };
}


const game = GameController();