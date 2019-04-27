import { clgu } from '../../../types';

export interface AuthState {
    
    authCheck: {
        isChecking: boolean;
        user: clgu.users.User;
        error: clgu.common.Error;
    };

    login: {
        isLoading: boolean;
        isSuccess: boolean;
        error: clgu.common.Error;
    };


    logout: {
        isLoading: boolean;
        error: clgu.common.Error;
    }


    
}




export const authInitialState: AuthState = {
    
    authCheck: {
        isChecking: false,
        user: null,
        error: null
    },

    login: {
        isLoading: false,
        isSuccess: false,
        error: null
    },

    logout: {
        isLoading: false,
        error: null
    }
    
}