import { Action, createReducer, on } from '@ngrx/store';
import { User } from '../entity';
import * as userActions from '../actions';
import * as storage from '../state/storage';

export interface State {
    user: User;
    securityQuestion?: any
}

export const initialState: State = {
    user: storage.getItem('user').user,
    securityQuestion: storage.getItem('securityQuestion').securityQuestion
};

const loginReducer = createReducer(
    initialState,
    on(userActions.login, (state, { user }) => ({ ...state, user })),
    on(userActions.loginSuccess, (state, result) => ({ user: result.user })),
    on(userActions.signup, (state, { user }) => ({ user })),
    on(userActions.signupSuccess, (state, result) => ({ user: state.user })),
    on(userActions.securityQuestion, (state, { securityQuestion }) => ({ ...state, securityQuestion })),
    on(userActions.updateUserObj, (state, data) => {
        state.user.otherInfo = { ...data?.data }
        return state
    }),
    on(userActions.logout, (state) => {
        return {
            ...state,
            user: null,
            theme: null,
            game: null,
            securityQuestion: null
        }
    })
);
const securityReducer = createReducer(
    initialState,
    on(userActions.securityQuestion, (state, { securityQuestion }) => ({ ...state, securityQuestion })),
);
export function reducer(state: State | undefined, action: Action): any {
    return loginReducer(state, action);
}
export function securityQuestionReducer(state: State | undefined, action: Action): any {
    return securityReducer(state, action);
}

export const userLogin = (state: State) => {
    return {
        user: state.user,
    }
};
export const securityQuestion = (state: State) => {
    return {
        securityQuestion: state.securityQuestion,
    }
};

