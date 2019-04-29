import { UsersState, userInitialState } from './_users.state';
import { YAction } from 'src/types/store';
import { clgu } from 'src/types';
import { UserActions } from './_users.actions';

export function usersReducer(state: UsersState = userInitialState, action: YAction<any>) {
    const newState = clgu.utils.cloneDeep(state) as UsersState;

    switch(action.type) {
        case UserActions.GET_USERS: {
            newState.users.isLoading = true;
            return newState;
        }

        case UserActions.GET_USERS_SUCCESS: {
            const users = action.payload as clgu.users.User[];
            newState.users.isLoading = false;
            newState.users.items = users;
            return newState;
        }

        case UserActions.GET_USERS_FAIL: {
            newState.users.isLoading = false;
            newState.users.error = action.payload;
            return newState;
        }

        default: return newState;
    }
}