/**
 *  This is the reducer that withholds logic for 
 *  the actual tic-tac-toe game in the app.
 */


//## Constants
export const SELECT_SQUARE = 'SELECT_SQUARE';
export const SELECT_MOVE = 'SELECT_MOVE';
export const RESTART_GAME = 'RESTART_GAME';
//## Actions
export const selectSquare = (squareNumber) => ({type: SELECT_SQUARE, payload: {squareNumber}});
export const selectMove = (moveNumber) => ({type: SELECT_MOVE, payload: {moveNumber}});
export const restartGame = () => ({type: RESTART_GAME})

const initialState = {
    history: [
        {
            squares: Array(9).fill(null)
        }
    ],
    stepNumber: 0,
    xIsNext: true,
};

//## Reducer
const GameReducer = (state = initialState, action) => {

    switch (action.type) {

        case RESTART_GAME:
            return updateRestartStarter(state.xIsNext);
        
        case SELECT_SQUARE:
            return updateSelectedSquare(state, action.payload);

        case SELECT_MOVE:
            return updateSelectedMove(state, action.payload);

        default:
            return state;
    }
};

//adjust move from player 1 to player 2
function updateSelectedMove(state, {moveNumber}) {
    return Object.assign({}, state, {
        stepNumber: moveNumber,
        xIsNext: (moveNumber % 2) === 0
    })
}

function updateRestartStarter(starter) {
    return Object.assign({}, initialState, {
        xIsNext: !starter
    })
}

//updates the chosen squares, checks if there's a winner
function updateSelectedSquare(state, {squareNumber}) {

    const history = state.history.slice(0, state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    // if there is a winner, or the requested square already has a value then no change
    if (calculateWinner(squares) || squares[squareNumber]) {
        return state;
    }
    squares[squareNumber] = state.xIsNext ? "X" : "O";

    const winner = calculateWinner(squares) ? calculateWinner(squares)[0] : null;
    const winningLine = calculateWinner(squares) ? calculateWinner(squares)[1] : null;
    console.log("winning line is", winningLine);
 
    return {
        history: history.concat([
            {
                squares: squares
            }
        ]),
        stepNumber: history.length,
        xIsNext: !state.xIsNext,
        winner: winner,
        winningLine: winningLine
    };
}

/**
 * checks if any squares match the winning lines
 */
function calculateWinner(squares) {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return [squares[a], lines[i]];
        }
    }
    return null;
}


export default GameReducer;