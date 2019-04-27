import { AuthState, authInitialState } from "./_auth.state";
import { Action } from "@ngrx/store";
import { clgu } from '../../../types';
import { AuthActions } from './_auth.actions';

export function authReducer(state: AuthState = authInitialState, action: clgu.store.YAction<any>): AuthState {
    const newState = clgu.utils.cloneDeep(state) as AuthState;
    switch (action.type) {

        case AuthActions.CHECK_AUTH: {
            newState.authCheck.user = null;
            newState.authCheck.isChecking = true;
            return newState;
        }

        case AuthActions.CHECK_AUTH_AUTHED: {
            newState.authCheck.user = action.payload;
            newState.authCheck.isChecking = false;
            return newState;
        }

        case AuthActions.CHECK_AUTH_NOT_AUTHED: {
            newState.authCheck.user = null;
            newState.authCheck.isChecking = false;
            return newState;
        }

        case AuthActions.LOGIN_FACEBOOK: {
            newState.login.isLoading = true;
            newState.login.error = null;
            return newState;
        }

        case AuthActions.LOGIN_FACEBOOK_SUCCESS: {
            newState.login.isLoading = false;
            newState.authCheck.user = action.payload;
            return newState;
        }

        case AuthActions.LOGIN_FACEBOOK_FAIL: {
            newState.login.isLoading = false;
            newState.login.error = action.payload;
            newState.authCheck.user = null;
            return newState;
        }

        case AuthActions.SIGNOUT: {
            newState.logout.isLoading = true;
            newState.logout.error = null;
            return newState;
        }

        case AuthActions.SIGNOUT_SUCCESS: {
            newState.logout.isLoading = false;
            newState.logout.error = null;
            return newState;
        }

        case AuthActions.SIGNOUT_FAIL: {
            newState.logout.isLoading = false;
            newState.logout.error = action.payload;
            return newState;
        }


        default: return state;
    }
}