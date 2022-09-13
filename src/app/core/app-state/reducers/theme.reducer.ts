import { Action, createReducer, on } from '@ngrx/store';
import * as themeActions from '../actions';
import { Theme } from '../entity';
import * as storage from '../state/storage';

export interface State {
    theme: Theme;
}

export const initialState: State = {
    theme: storage.getItem('theme')?.theme,
};

const themeReducer = createReducer(
    initialState,
    on(themeActions.theme, (state, { theme }) => ({ ...state, theme })),
    on(themeActions.themeSuccess, (state, result) => ({ theme: result.theme })),
);

export function reducer(state: State | undefined, action: Action): any {
    return themeReducer(state, action);
}

export const usertheme = (state: State) => {
    return {
        theme: state.theme,
    }
};
