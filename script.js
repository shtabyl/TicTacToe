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
        if (board[row][column].getValue() !== 0) {
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
    let value = 0;

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
            mark: 1
        },
        {
            name: playerTwoName,
            mark: -1
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

    const checkForWinner = (row, column) => {
        let resultRow = 0;
        let resultColumn = 0;
        let resultCrossDown = 0;
        let resultCrossUp = 0;
        for (let i = 0; i < 3; i++) {
            if (board.getBoard()[1][1].getValue()) {
                resultCrossDown += board.getBoard()[i][i].getValue();
                resultCrossUp += board.getBoard()[2 - i][i].getValue();
            }
            resultRow += board.getBoard()[row][i].getValue();
            resultColumn += board.getBoard()[i][column].getValue();
        }
        if (
            Math.abs(resultRow) === 3 
            || Math.abs(resultColumn) === 3 
            || Math.abs(resultCrossDown) === 3 
            || Math.abs(resultCrossUp) === 3
        ) {
            return getActivePlayer().name;
        }
    };

    

    const playRound = (row, column) => {
        console.log(`Put ${getActivePlayer().name}'s mark into row ${row}, column ${column}`);
        board.markCell(row, column, getActivePlayer().mark);

        const winner = checkForWinner(row, column);
        if (winner) {
            console.log(winner + ' WINS!')
            return;
        } else {
            switchPlayerTurn();
            printNewRound();
        }
    }

    printNewRound();

    return { playRound, getActivePlayer };
}


const game = GameController();