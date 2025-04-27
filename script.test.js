const GameBoard = require('./script.js').GameBoard;
const GameController = require('./script.js').GameController;

test('correct board', () => {
    const board = GameBoard();
    expect(board.getBoard().length).toBe(board.getRows());
    expect(board.getBoard().map(row => row.length)).toEqual([board.getColumns(), board.getColumns(), board.getColumns()]);
});

test('board filled with zeros', () => {
    const board = GameBoard();
    expect(board.getBoard().map(row => row.map(cell => cell.getValue()))).toEqual([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);
});

test('mark cell', () => {
    const board = GameBoard();
    board.markCell(0, 0, 1);
    expect(board.getBoard()[0][0].getValue()).toBe(1);
    expect(board.getBoard().map(row => row.map(cell => cell.getValue()))).toEqual([[1, 0, 0], [0, 0, 0], [0, 0, 0]]);
    board.markCell(1, 1, -1);
    expect(board.getBoard()[1][1].getValue()).toBe(-1);
    expect(board.getBoard().map(row => row.map(cell => cell.getValue()))).toEqual([[1, 0, 0], [0, -1, 0], [0, 0, 0]]);
});

test('switch player turn', () => {
    const game = GameController();
    game.startGame();
    expect(game.getActivePlayer().name).toBe('Player One');
    game.switchPlayerTurn();
    expect(game.getActivePlayer().name).toBe('Player Two');
});

test('do not start game until started', () => {
    const game = GameController();
    game.playRound(0, 0);
    expect(game.getActivePlayer().name).toBe('Player One');
    expect(game.getRoundsPlayed()).toBe(0);
    game.startGame();
    expect(game.getActivePlayer().name).toBe('Player One');
    expect(game.getRoundsPlayed()).toBe(1);
});

test('start new game', () => {
    const game = GameController();
    game.startGame();
    expect(game.getActivePlayer().name).toBe('Player One');
    expect(game.getRoundsPlayed()).toBe(1);
});

test('invalid move', () => {
    const game = GameController();
    game.startGame();
    expect(game.getActivePlayer().name).toBe('Player One');
    expect(game.getRoundsPlayed()).toBe(1);
    game.playRound(1, 1);
    expect(game.getRoundsPlayed()).toBe(2);
    expect(game.getActivePlayer().name).toBe('Player Two');
    game.playRound(1, 1);
    expect(game.getRoundsPlayed()).toBe(2);
    expect(game.getActivePlayer().name).toBe('Player Two');
});

test('round played', () => {
    const game = GameController();
    game.startGame();
    expect(game.getActivePlayer().name).toBe('Player One');
    expect(game.getRoundsPlayed()).toBe(1);
    game.playRound(0, 1);
    expect(game.board.getBoard()[0][1].getValue()).toBe(1);
    expect(game.getActivePlayer().name).toBe('Player Two');
    expect(game.getRoundsPlayed()).toBe(2);
    game.playRound(1, 0);
    expect(game.board.getBoard().map(row => row.map(cell => cell.getValue()))).toEqual([[0, 1, 0], [-1, 0, 0], [0, 0, 0]]);
    expect(game.getActivePlayer().name).toBe('Player One');
    expect(game.getRoundsPlayed()).toBe(3);
});

test('check for winner row 0 for player one', () => {
    const game = GameController();
    game.startGame();
    game.playRound(0, 0);
    game.playRound(1, 1);
    game.playRound(0, 1);
    game.playRound(1, 2);
    expect(game.playRound(0, 2)).toBe('Player One');
});

test('check for winner row 0 for player two', () => {
    const game = GameController();
    game.startGame();
    game.playRound(1, 0);
    game.playRound(0, 0);
    game.playRound(1, 2);
    game.playRound(0, 1);
    game.playRound(2, 1);
    expect(game.playRound(0, 2)).toBe('Player Two');
});

test('check for winner row 1 for player one', () => {
    const game = GameController();
    game.startGame();
    game.playRound(1, 0);
    game.playRound(2, 1);
    game.playRound(1, 1);
    game.playRound(2, 2);
    expect(game.playRound(1, 2)).toBe('Player One');
});

test('check for winner row 1 for player two', () => {
    const game = GameController();
    game.startGame();
    game.playRound(0, 0);
    game.playRound(1, 1);
    game.playRound(0, 1);
    game.playRound(1, 2);
    game.playRound(2, 2);
    expect(game.playRound(1, 0)).toBe('Player Two');
});

test('check for winner row 2 for player one', () => {
    const game = GameController();
    game.startGame();
    game.playRound(2, 0);
    game.playRound(0, 1);
    game.playRound(2, 1);
    game.playRound(0, 2);
    expect(game.playRound(2, 2)).toBe('Player One');
});

test('check for winner row 2 for player two', () => {
    const game = GameController();
    game.startGame();
    game.playRound(0, 0);
    game.playRound(2, 1);
    game.playRound(0, 1);
    game.playRound(2, 2);
    game.playRound(1, 1);
    expect(game.playRound(2, 0)).toBe('Player Two');
});

test('check for winner column 0 for player one', () => {
    const game = GameController();
    game.startGame();
    game.playRound(0, 0);
    game.playRound(0, 1);
    game.playRound(1, 0);
    game.playRound(0, 2);
    expect(game.playRound(2, 0)).toBe('Player One');
});

test('check for winner column 0 for player two', () => {
    const game = GameController();
    game.startGame();
    game.playRound(1, 2);
    game.playRound(0, 0);
    game.playRound(0, 1);
    game.playRound(1, 0);
    game.playRound(1, 1);
    expect(game.playRound(2, 0)).toBe('Player Two');
});

test('check for winner column 1 for player one', () => {
    const game = GameController();
    game.startGame();
    game.playRound(0, 1);
    game.playRound(0, 0);
    game.playRound(1, 1);
    game.playRound(0, 2);
    expect(game.playRound(2, 1)).toBe('Player One');
});

test('check for winner column 1 for player two', () => {
    const game = GameController();
    game.startGame();
    game.playRound(1, 2);
    game.playRound(0, 1);
    game.playRound(0, 0);
    game.playRound(1, 1);
    game.playRound(2, 2);
    expect(game.playRound(2, 1)).toBe('Player Two');
});

test('check for winner column 2 for player one', () => {
    const game = GameController();
    game.startGame();
    game.playRound(0, 2);
    game.playRound(0, 1);
    game.playRound(1, 2);
    game.playRound(0, 0);
    expect(game.playRound(2, 2)).toBe('Player One');
});

test('check for winner column 2 for player two', () => {
    const game = GameController();
    game.startGame();
    game.playRound(1, 0);
    game.playRound(0, 2);
    game.playRound(0, 1);
    game.playRound(1, 2);
    game.playRound(2, 1);
    expect(game.playRound(2, 2)).toBe('Player Two');
});

test('check for winner crossDown for player one', () => {
    const game = GameController();
    game.startGame();
    game.playRound(0, 0);
    game.playRound(0, 1);
    game.playRound(1, 1);
    game.playRound(1, 2);
    expect(game.playRound(2, 2)).toBe('Player One');
});

test('check for winner crossDown for player two', () => {
    const game = GameController();
    game.startGame();
    game.playRound(0, 1);
    game.playRound(0, 0);
    game.playRound(1, 2);
    game.playRound(1, 1);
    game.playRound(2, 1);
    expect(game.playRound(2, 2)).toBe('Player Two');
});

test('check for winner crossUp for player one', () => {
    const game = GameController();
    game.startGame();
    game.playRound(2, 0);
    game.playRound(0, 1);
    game.playRound(1, 1);
    game.playRound(1, 0);
    expect(game.playRound(0, 2)).toBe('Player One');
});

test('check for winner crossUp for player two', () => {
    const game = GameController();
    game.startGame();
    game.playRound(0, 0);
    game.playRound(2, 0);
    game.playRound(1, 0);
    game.playRound(1, 1);
    game.playRound(0, 1);
    expect(game.playRound(0, 2)).toBe('Player Two');
});

test('tie when all cells are filled and no winner', () => {
    const game = GameController();
    game.startGame();
    game.playRound(1, 1);
    game.playRound(0, 0);
    game.playRound(0, 2);
    game.playRound(2, 0);
    game.playRound(2, 2);
    game.playRound(1, 2);
    game.playRound(1, 0);
    game.playRound(0, 1);
    expect(game.playRound(2, 1)).toBe('Tie!');
    expect(game.getRoundsPlayed()).toBe(0);
});
