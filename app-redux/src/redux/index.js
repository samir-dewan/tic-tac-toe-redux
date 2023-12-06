import { combineReducers } from 'redux';

import gameReducer from './game';
import WinnerReducer from './player';

export const rootReducer = combineReducers({
    game:  gameReducer,
    winner: WinnerReducer
});
