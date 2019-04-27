import { RouterReducerState } from '@ngrx/router-store';
import { AuthState } from './auth/_auth.state';
import { clgu } from 'src/types';

export interface AppState {
    router: RouterReducerState<clgu.store.router.RouterStateUrl>;
    auth: AuthState;
}