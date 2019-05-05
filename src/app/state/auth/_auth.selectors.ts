import { AppState } from '../app.state';
import { Observable } from 'rxjs';
import { clgu } from 'src/types';
import { Store } from '@ngrx/store';

export class AuthSelectors {

    public static currentUser$ = function(store: Store<AppState>): Observable<clgu.users.User> {
        return store.select(state => state.auth.authCheck.user)
    }
}