import { clgu } from 'src/types';

export interface UsersState {
    users: {
        isLoading: boolean;
        error: clgu.common.Error;
        items: clgu.common.UpdatableDataObject<clgu.users.db.UsersMap>;
    }
}



export const userInitialState: UsersState = {
    users: {
        isLoading: false,
        error: null,
        items: null
    }
}