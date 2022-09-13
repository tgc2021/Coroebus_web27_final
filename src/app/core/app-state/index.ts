import { environment } from '@env';
import {
    ActionReducer,
    ActionReducerMap,
    createFeatureSelector,
    createSelector,
    MetaReducer
} from '@ngrx/store';
import { localStorageSync } from 'ngrx-store-localstorage';
import * as fromUser from './reducers/user.reducer';
import * as fromTheme from './reducers/theme.reducer';
import * as fromGame from './reducers/game.reducer';


export interface State {
    user: fromUser.State;
    theme: fromTheme.State;
    game: fromGame.State;
    securityQuestion?: fromUser.State
}

export const reducers: ActionReducerMap<State> = {
    user: fromUser.reducer,
    theme: fromTheme.reducer,
    game: fromGame.reducer,
    securityQuestion: fromUser.securityQuestionReducer,
};

const reducerKeys = ['user', 'theme', 'game', 'securityQuestion'];
export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({ keys: reducerKeys })(reducer);
}

export const metaReducers: MetaReducer<State>[] = !environment.production ? [localStorageSyncReducer] : [localStorageSyncReducer];

export const getLoginState = createFeatureSelector<fromUser.State>('user');
export const getsecurityQuestionState = createFeatureSelector<fromUser.State>('securityQuestion');
export const getThemeState = createFeatureSelector<fromTheme.State>('theme');
export const getGameState = createFeatureSelector<fromGame.State>('game');


export const userLogin = createSelector(
    getLoginState,
    fromUser.userLogin
);

export const usertheme = createSelector(
    getThemeState,
    fromTheme.usertheme
);
export const usergame = createSelector(
    getGameState,
    fromGame.usergame
);
export const securityQuestion = createSelector(
    getsecurityQuestionState,
    fromUser.securityQuestion
);

