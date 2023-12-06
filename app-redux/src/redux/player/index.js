/**
 *  This is the reducer for the tic-tac-toe game
 */

//## Constants
export const INCREASE_WINNER_COUNT = "INCREASE_WINNER_COUNT";
export const CHANGE_PLAYER_NAME = "CHANGE_PLAYER_NAME"

//## Actions
export const increaseWinnerCount = (winner) => ({
  type: INCREASE_WINNER_COUNT,
  payload: { winner },
});

export const changePlayerName = (playerName, isX) => ({
  type: CHANGE_PLAYER_NAME,
  payload: {playerName, isX},
})

const initialWinnerState = {
  xPlayer: {
    playerName: "",
    playerCount: 0,
  },
  oPlayer: {
    playerName: "",
    playerCount: 0,
  },
};

//## Reducer
const WinnerReducer = (state = initialWinnerState, action) => {
  switch (action.type) {
    case INCREASE_WINNER_COUNT:
      return increaseWinnerNumber(state, action.payload);

    case CHANGE_PLAYER_NAME:
      return updatePlayerName(state, action.payload);

    default:
      return state;
  }
};

function updatePlayerName(state, {playerName, isX}) {
  const chosenPlayer = isX ? "xPlayer" : "oPlayer";
  return {
    ...state,
    [chosenPlayer]: {
      ...state['xPlayer'],
      playerName: playerName,
    }
  } 
}

function increaseWinnerNumber(state, { winner }) {
  const winnerPlayer = winner === "X" ? "xPlayer" : "oPlayer";
  const updatedCount = state[winnerPlayer].playerCount + 1;

  console.log("count before is:", winnerPlayer, updatedCount);
  return {
    ...state,
    [winnerPlayer]: {
      ...state[winnerPlayer],
      playerCount: updatedCount,
    },
  };
}

export default WinnerReducer;
