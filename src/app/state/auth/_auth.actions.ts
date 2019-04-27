import { Action } from "@ngrx/store";
import { clgu } from '../../../types';

export class AuthActions {


    public static readonly CHECK_AUTH = '[Auth] CHECK_AUTH';
    public static readonly CHECK_AUTH_AUTHED = '[Auth] CHECK_AUTH_AUTHED';
    public static readonly CHECK_AUTH_NOT_AUTHED = '[Auth] CHECK_AUTH_NOT_AUTHED';

    public static readonly LOGIN_FACEBOOK = '[Auth] LOGIN_FACEBOOK';
    public static readonly LOGIN_FACEBOOK_SUCCESS = '[Auth] LOGIN_FACEBOOK_SUCCESS';
    public static readonly LOGIN_FACEBOOK_FAIL = '[Auth] LOGIN_FACEBOOK_FAIL';

    public static readonly SIGNUP_FACEBOOK = '[Auth] SIGNUP_FACEBOOK';
    public static readonly SIGNUP_FACEBOOK_SUCCESS = '[Auth] SIGNUP_FACEBOOK_SUCCESS';
    public static readonly SIGNUP_FACEBOOK_FAIL = '[Auth] SIGNUP_FACEBOOK_FAIL';

    public static readonly SIGNOUT = '[Auth] SIGNOUT';
    public static readonly SIGNOUT_SUCCESS = '[Auth] SIGNOUT_SUCCESS';
    public static readonly SIGNOUT_FAIL = '[Auth] SIGNOUT_FAIL';


    public static CheckAuth = class implements Action {
        public readonly type = AuthActions.CHECK_AUTH;

        constructor() {}
    }


    public static CheckAuthAuthed = class implements Action {
        public readonly type = AuthActions.CHECK_AUTH_AUTHED;

        constructor(public payload: clgu.users.User) {
        }
    }


    public static CheckAuthNotAuthed = class implements Action {
        public readonly type = AuthActions.CHECK_AUTH_NOT_AUTHED;

        constructor() {
        }
    }


    public static LoginFacebook = class implements Action {
        public readonly type = AuthActions.LOGIN_FACEBOOK;

        constructor() {
        }
    }


    public static LoginFacebookSuccess = class implements Action {
        public readonly type = AuthActions.LOGIN_FACEBOOK_SUCCESS;

        constructor(public payload: clgu.users.User) {
        }
    }


    public static LoginFacebookFail = class implements Action {
        public readonly type = AuthActions.LOGIN_FACEBOOK_FAIL;

        constructor(public payload: clgu.common.Error) {
        }
    }


    public static SignupFacebook = class implements Action {
        public readonly type = AuthActions.SIGNUP_FACEBOOK;

        constructor() {
        }
    }


    public static SignupFacebookSuccess = class implements Action {
        public readonly type = AuthActions.SIGNUP_FACEBOOK_SUCCESS;

        constructor() {
        }
    }


    public static SignupFacebookFail = class implements Action {
        public readonly type = AuthActions.SIGNUP_FACEBOOK_FAIL;

        constructor() {
        }
    }



    public static Signout = class implements Action {
        public readonly type = AuthActions.SIGNOUT;

        constructor() {
        }
    }


    public static SignoutSuccess = class implements Action {
        public readonly type = AuthActions.SIGNOUT_SUCCESS;

        constructor() {
        }
    }


    public static SignoutFail = class implements Action {
        public readonly type = AuthActions.SIGNOUT_FAIL;

        constructor(public payload: clgu.common.Error) {
        }
    }
    

}