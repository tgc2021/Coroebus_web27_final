import { createAction, props } from '@ngrx/store';
import { User } from '../entity';

export const USER_LOGIN = '[Login Page] Login';
export const USER_LOGIN_SUCCESS = '[Login Page] Login Success';
export const USER_LOGIN_FAILURE = '[Login Page] Login Failure';
export const USER_SECURITYQUESTION = '[Security Question] Set';
export const USER_UPDATE = '[Update User Obj] Obj';
export const LOGOUT = '[Logout]';
export const login = createAction(
    USER_LOGIN,
    props<{ user: User }>()
);

export const loginSuccess = createAction(
    USER_LOGIN_SUCCESS,
    props<any>()
)

export const loginFailure = createAction(
    USER_LOGIN_FAILURE,
    props<{ message: string }>()
)

export const securityQuestion = createAction(
    USER_SECURITYQUESTION,
    props<{ securityQuestion: any }>()
)
export const updateUserObj = createAction(
    USER_UPDATE,
    props<{ data: any }>()
)
export const logout = createAction(
    LOGOUT,
    props<any>()
)
