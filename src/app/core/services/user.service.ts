import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { clgu } from '../../../types';
import { DatabaseService } from './database.service';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private USER_REF = 'users';

  constructor(
    private dbService: DatabaseService
  ) { }


  public getDbUserFromFbUser(fbUser: clgu.users.db.FBUser): Observable<clgu.users.db.UserLike> {
      if (!fbUser) {
        return of(null);
      }
      return this.saveUserInfoIfAbsent(this.getDbUserObjFromFbUser(fbUser))
        .pipe(
          switchMap(() => this.getUserDetails(fbUser.uid))
        )
  }


  public getUsers(): Observable<{ [userId: string]: clgu.users.db.UserLike}> {
      return this.dbService.readOnce(this.USER_REF)
  }


  public getUserDetails(id: string): Observable<clgu.users.db.UserLike> {
      const ref = `${this.USER_REF}/${id}`;
      return this.dbService.readOnce(ref);
  }


  private saveUserInfoIfAbsent(user: clgu.users.db.UserLike): Observable<void> {
      const userRef = `${this.USER_REF}/${user.id}`;
      return this.dbService.exists(userRef)
          .pipe(
            switchMap(exists => {
              if (!exists) {
                const userCleaned = clgu.utils.removeUndefined(user);
                return this.dbService.set(userRef, userCleaned);
              }
              return of(null);
            })
          );
  }


  private getDbUserObjFromFbUser(fbUser: clgu.users.db.FBUser): clgu.users.db.UserLike {
      if (!fbUser) {
        return undefined;
      }
      const result = {
        id: fbUser.uid,
        email: fbUser.email,
        display_name: fbUser.displayName,
      } as clgu.users.db.UserLike;

      if (fbUser.photoURL) {
        result.photo_data = fbUser.photoURL;
      }

      if (fbUser.phoneNumber) {
        result.phone = fbUser.phoneNumber;
      }

      return result;
  }



  






 
}
