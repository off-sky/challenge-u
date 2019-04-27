import { Injectable } from '@angular/core';
import * as firebase from 'firebase/app';
import 'firebase/auth';

import { Observable, of } from 'rxjs';
import { from } from 'rxjs';
import { clgu } from '../../../types';

import { UserService } from './user.service';
import { map, catchError, tap, take, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private userService: UserService

  ) {
  }


  public currentUser(): Observable<clgu.users.db.UserLike> {
      return new Observable<clgu.users.db.FBUser>(observer => {
        const off = firebase.auth().onAuthStateChanged(user => {
          if (user) {
            observer.next(user);
          } else {
            observer.next(null);
          }
          off();
        })
      })
      .pipe(
        take(1),
        switchMap(user => {
          console.log({ fbUser: user });
          if (!user) {
            return of(null)
          }
          return this.userService.getDbUserFromFbUser(user);
        }),
        tap(user => console.log({ dbUser: user }))
      )
  }


  public loginFacebook(): Observable<clgu.users.db.UserLike> {
    const provider = new firebase.auth.FacebookAuthProvider();
    firebase.auth().signInWithRedirect(provider);
    return from(firebase.auth().getRedirectResult())
      .pipe(
        switchMap(result => {
          const user = result.user;
          return this.userService.getDbUserFromFbUser(user);
        }),
        catchError(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(error);
          // The email of the ser's account used.
          throw ({
            code: errorCode,
            description: errorMessage
          });
        })
      );
  }


  public signOut(): Observable<void> {
    return from(firebase.auth().signOut())
  }

 

}
