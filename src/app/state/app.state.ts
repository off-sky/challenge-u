import { RouterReducerState } from '@ngrx/router-store';
import { AuthState } from './auth/_auth.state';
import { clgu } from 'src/types';
import { UsersState } from './users/_users.state';
import { ChallengesState } from './challenges/_challenges.state';
import { WidgetState } from './widgets/_widget.state';

export interface AppState {
    router: RouterReducerState<clgu.store.router.RouterStateUrl>;
    auth: AuthState;
    users: UsersState;
    challenges: ChallengesState;
    widgets: WidgetState;
}