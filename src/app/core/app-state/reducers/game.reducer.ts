import { Action, createReducer, on } from '@ngrx/store';
import * as gameActions from '../actions';
import { Game } from '../entity';
import * as storage from '../state/storage';

export interface State {
    game: Game;
}

export const initialState: State = {
    game: storage.getItem('game')?.game,
};

const gameReducer = createReducer(
    initialState,
    on(gameActions.game, (state, { game }) => ({ ...state, game })),
    on(gameActions.gameSuccess, (state, result) => ({ game: result.game })),
);

export function reducer(state: State | undefined, action: Action): any {
    return gameReducer(state, action);
}

export const usergame = (state: State) => {
    return {
        game: state.game,
    }
};
