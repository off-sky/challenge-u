import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/core/services/database.service';
import { Observable, of } from 'rxjs';
import { combineLatest } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { clgu } from '../../../../types';

@Injectable({
  providedIn: 'root'
})
export class ChallengeInfoService {

  private CHALLENGE_BY_USER_PATH = 'users_challenges';
  private CHALLENGES_PATH = 'challenges';
  private COMMON_CHALLENGE_DAYS_PATH = 'challenges_dates';
  private USER_CHALLENGE_DAYS_PATH = 'challenges_users_dates';
  private USER_REQUIREMENT_PATH = 'users_requirements';
  private PARTICIPANTS_PATH = 'challenges_participants';
  private MEASUREMENTS_PATH = 'challenges_measurements';
  private USERS_PATH = 'users';

  constructor(
    private dbService: DatabaseService
  ) { }


  public getChallengeList(userId: string): Observable<any> {
    return this.dbService.listen(`${this.CHALLENGE_BY_USER_PATH}/${userId}`)
      .pipe(
        switchMap((res) => {
          if (res) {
            const dbArr = Object.keys(res)
              .map(key => res[key]);

              dbArr.sort((a, b) => a.created_at - b.created_at);

            const obs = dbArr.map(dbObj => this.dbService.readOnce(`${this.CHALLENGES_PATH}/${dbObj.id}`));

            return combineLatest(obs);

          }
          return of(null)
        })
      )
  }


  public getRequirementPresets(userId: string): Observable<clgu.challenges.db.Requirements> {
      return this.dbService.readOnce(`${this.USER_REQUIREMENT_PATH}/${userId}`, null, null, null, null, 10);
  }


  public getChallengeDetails(challengeId: string): Observable<clgu.challenges.db.ChallengeDetails> {
    const challengeObj$: Observable<clgu.challenges.db.ChallengeObj> = this.dbService.readOnce(`${this.CHALLENGES_PATH}/${challengeId}`);
    const participantsObj$: Observable<clgu.users.db.UserLike[]> = this.dbService.readOnce(`${this.PARTICIPANTS_PATH}/${challengeId}`)
            .pipe(
              switchMap((partObj) => {
                  if (partObj) {
                    const obs = Object.keys(partObj)
                      .map(userId => this.dbService.readOnce(`${this.USERS_PATH}/${userId}`))

                    return combineLatest(obs);
                  }
              })
            )
    const commonChallengeDays$ = this.dbService.readOnce(`${this.COMMON_CHALLENGE_DAYS_PATH}/${challengeId}`);
    const userChallengeDays$ = this.dbService.readOnce(`${this.USER_CHALLENGE_DAYS_PATH}/${challengeId}`);
    const measurements$ = this.dbService.readOnce(`${this.MEASUREMENTS_PATH}/${challengeId}`);

    return combineLatest(
      challengeObj$,
      participantsObj$,
      commonChallengeDays$,
      userChallengeDays$,
      measurements$
    )
    .pipe(
      map(vals => {
        const chall = vals[0];
        const userArr = vals[1];
        const commonDates = vals[2];
        const userDates = vals[3];
        const measurements = vals[4];
        return {
          challenge: chall,
          common_days: commonDates,
          users_days: userDates,
          common_measurements: measurements,
          participants: userArr
        }
      })
    );
  }



}
