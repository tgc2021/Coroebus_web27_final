import { createAction, props } from '@ngrx/store';
import { Theme } from '../entity';

export const USER_THEME = '[Theme Page] Theme';
export const USER_THEME_SUCCESS = '[Theme Page] Theme Success';
export const USER_THEME_FAILURE = '[Theme Page] Theme Failure';

export const theme = createAction(
    USER_THEME,
    props<{ theme: Theme }>()
);

export const themeSuccess = createAction(
    USER_THEME_SUCCESS,
    props<any>()
)

export const themeFailure = createAction(
    USER_THEME_FAILURE,
    props<{ message: string }>()
)
