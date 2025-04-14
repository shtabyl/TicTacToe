# TicTacToe
Web version of Tic Tac Toe game.

Add GameBoard() function.
    Create game board by implementing 2D array.
    Put in each cell of the game board a function that return two methods: addMark() and getValue().
    Add function that changes cell value only if the cell is empty.
    Add function that gets game board current values and print the board.

Add Cell() function that returns its value or changes it.

Add main game function that gets user names.
    Declare board with GameBoard(), declare players.
    Declare activePlayer.
    Play a round:
        Mark one cell.
        Switch the player turn.
        Print changed board.
        Check for the winner.
            if (someone wins) { return message }
    Add start new game function:
        Clear board.
        Print new round.