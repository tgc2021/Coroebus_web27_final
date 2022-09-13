import { createAction, props } from '@ngrx/store';
import { Game } from '../entity';

export const USER_GAME = '[Game Page] Game';
export const USER_GAME_SUCCESS = '[Game Page] Game Success';
export const USER_GAME_FAILURE = '[Game Page] Game Failure';

export const game = createAction(
    USER_GAME,
    props<{ game: Game }>()
);

export const gameSuccess = createAction(
    USER_GAME_SUCCESS,
    props<any>()
)

export const gameFailure = createAction(
    USER_GAME_FAILURE,
    props<{ message: string }>()
)
