import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { UserService } from 'src/app/core/services/user.service';
import { UserActions } from './_users.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { clgu } from 'src/types';

@Injectable()
export class UserEffects {

    constructor(
        private actions: Actions,
        private userService: UserService
    ) {}


    @Effect() public getUsers$ = this.actions
        .pipe(
            ofType(UserActions.GET_USERS),
            switchMap(() => {
                return this.userService.getUsers()
                    .pipe(
                        map(dbUsers => {
                            const users = dbUsers.map(db => new clgu.users.models.User(db));
                            return new UserActions.GetUsersSuccess(users);
                        }),
                        catchError(err => {
                            return of(new UserActions.GetUsersFail(err));
                        })
                    )
            })
        )
}