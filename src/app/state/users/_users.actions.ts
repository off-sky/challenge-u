import { Action } from '@ngrx/store';
import { clgu } from 'src/types';

export class UserActions {
    public static readonly GET_USERS = 'GET_USERS';
    public static readonly GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
    public static readonly GET_USERS_FAIL = 'GET_USERS_FAIL';




    public static readonly GetUsers = class implements Action {
        readonly type: string = UserActions.GET_USERS;
    }

    public static readonly GetUsersSuccess = class implements Action {
        readonly type: string = UserActions.GET_USERS_SUCCESS;
        constructor(public payload: clgu.users.db.UsersMap) {}
    }


    public static readonly GetUsersFail = class implements Action {
        readonly type: string = UserActions.GET_USERS_FAIL;
        constructor(public payload: clgu.common.Error) {
            
        }
    }
}