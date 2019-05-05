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
  private REQUIREMENTS_PATH = 'challenges_days_requirements';

  constructor(
    private dbService: DatabaseService
  ) { }


  public getChallengesByUser(userId: string): Observable<any> {
    return this.dbService.readOnce(`${this.CHALLENGE_BY_USER_PATH}/${userId}`);
  }

  public listenChallengesByUser(userId: string): Observable<any> {
    return this.dbService.listen(`${this.CHALLENGE_BY_USER_PATH}/${userId}`);
  }


  public getRequirementPresets(userId: string): Observable<clgu.challenges.db.Requirements> {
      return this.dbService.readOnce(`${this.USER_REQUIREMENT_PATH}/${userId}`, null, null, null, null, 10);
  }

  public getChallengeBasicInfo(challengeId: string): Observable<clgu.challenges.db.ChallengeObj> {
    return this.dbService.readOnce(`${this.CHALLENGES_PATH}/${challengeId}`);
  }

  public getCommonChallengesDates(challengeId: string): Observable<clgu.challenges.db.CommonChallengeDays> {
    return this.dbService.readOnce(`${this.COMMON_CHALLENGE_DAYS_PATH}/${challengeId}`);
  }

  public getChallengesParticipants(challengeId: string): Observable<{ [id: string]: string}> {
    return this.dbService.readOnce(`${this.PARTICIPANTS_PATH}/${challengeId}`);
  }


  public listenChallengesParticipants(challengeId: string): Observable<{ [id: string]: string}> {
    return this.dbService.listen(`${this.PARTICIPANTS_PATH}/${challengeId}`);
  }

  public getChallengeRequirements(challengeId: string): Observable<clgu.challenges.db.ChallengeRequirements> {
    return this.dbService.readOnce(`${this.REQUIREMENTS_PATH}/${challengeId}`);
  }

  public listenChallengeRequirements(challengeId: string): Observable<clgu.challenges.db.ChallengeRequirements> {
    return this.dbService.listen(`${this.REQUIREMENTS_PATH}/${challengeId}`);
  }

  public getUserChallengeDates(challengeId: string): Observable<clgu.challenges.db.UserChallengeDayMap> {
    return  this.dbService.readOnce(`${this.USER_CHALLENGE_DAYS_PATH}/${challengeId}`);
  }

  public listenUserChallengeDates(challengeId: string): Observable<clgu.challenges.db.UserChallengeDayMap> {
    return  this.dbService.listen(`${this.USER_CHALLENGE_DAYS_PATH}/${challengeId}`);
  }

  public getMeasurements(challengeId: string): Observable<clgu.challenges.db.Measurements> {
    return this.dbService.readOnce(`${this.MEASUREMENTS_PATH}/${challengeId}`);
  }

  public listenMeasurements(challengeId: string): Observable<clgu.challenges.db.Measurements> {
    return this.dbService.listen(`${this.MEASUREMENTS_PATH}/${challengeId}`);
  }


}
