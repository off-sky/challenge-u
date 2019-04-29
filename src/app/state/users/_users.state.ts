import { clgu } from 'src/types';

export interface UsersState {
    users: {
        isLoading: boolean;
        error: clgu.common.Error;
        items: clgu.users.User[];
    }
}



export const userInitialState: UsersState = {
    users: {
        isLoading: false,
        error: null,
        items: []
    }
}