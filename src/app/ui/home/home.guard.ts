import { CanActivate, Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from '../../state/app.state';
import { AuthActions } from '../../state/auth/_auth.actions'
import { Injectable } from '@angular/core';
import { filter, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class HomeGuard implements CanActivate {

    constructor(
        private store: Store<AppState>,
        private router: Router
    ) {

    }
    
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        this.store.dispatch(new AuthActions.CheckAuth())

        return this.store.select(state => state.auth.authCheck)
            .pipe(
                filter(state => !state.isChecking),
                map(state => !!state.user),
                tap(isAuthed => {
                    if (!isAuthed) {
                        this.router.navigate(['login'])
                    }
                })
            )
    }
}