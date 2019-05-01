import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { AuthActions } from './_auth.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { AuthService } from '../../core/services/auth.service';
import { of } from 'rxjs';
import { tap } from 'rxjs/internal/operators';
import { Router } from '@angular/router';
import { clgu } from '../../../types';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { UserActions } from '../users/_users.actions';
import { ChallengesActions } from '../challenges/_challenges.actions';

@Injectable()
export class AuthEffects {

  constructor(
      private actions: Actions,
      private authService: AuthService,
      private router: Router,
      private store: Store<AppState>
    ) { }


  @Effect() public checkAuth$ = this.actions
    .pipe(
        ofType(AuthActions.CHECK_AUTH),
        switchMap(() => {
            return this.authService.currentUser()
                .pipe(
                    map(user => {
                        if (user) {
                            return new AuthActions.CheckAuthAuthed(new clgu.users.models.User(user))
                        } else {
                            return new AuthActions.CheckAuthNotAuthed();
                        }
                    })
                )
        })
    );


    @Effect() public checkAuthAuthed$ = this.actions
        .pipe(
            ofType(AuthActions.CHECK_AUTH_AUTHED),
            switchMap(() => {
                this.store.dispatch(new UserActions.GetUsers());
                this.store.dispatch(new ChallengesActions.FetchRequirementsPresets());
                return of(new ChallengesActions.StartListenChallengeList());
            })
        )


    @Effect() public loginFacebook$ = this.actions
        .pipe(
            ofType(AuthActions.LOGIN_FACEBOOK),
            switchMap(() => {
                return this.authService.loginFacebook()
                    .pipe(
                        map(user => new AuthActions.LoginFacebookSuccess(new clgu.users.models.User(user))),
                        catchError(err => of(new AuthActions.LoginFacebookFail(err)))
                    )
            })
        );


    @Effect() public signOut$ = this.actions
        .pipe(
            ofType(AuthActions.SIGNOUT),
            switchMap(() => {
                return this.authService.signOut()
                    .pipe(
                        map(() => new AuthActions.SignoutSuccess()),
                        tap(() => {
                            this.router.navigate(['login']);
                        }),
                        catchError((err) => of(new AuthActions.SignoutFail(err)))
                    )
            })
        );

    

}