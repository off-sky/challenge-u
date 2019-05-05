import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/core/services/database.service';
import { Observable, of } from 'rxjs';
import { clgu } from 'src/types';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChallengeActionService {

  private CHALLENGES_PATH = 'challenges';
  private CHALLENGE_USER_DATE_PATH = 'challenges_users_dates';
  private CHALLENGE_BY_USER_PATH = 'users_challenges';
  private COMMON_CHALLENGE_DAYS_PATH = 'challenges_dates';
  private MEASUREMENTS_PATH = 'challenges_measurements';
  private PARTICIPANTS_PATH = 'challenges_participants';
  private USERS_REQUIREMENTS_PATH = 'users_requirements';
  private REQUIREMENTS_PATH = 'challenges_days_requirements';

  constructor(
    private dbService: DatabaseService
  ) { }

  public showUpDate(request: clgu.challenges.DayShowUpRequest): Observable<void> {
      const obj = this.getShowUpObject(request);
      return this.dbService.set(`${this.CHALLENGE_USER_DATE_PATH}/${request.challengeId}/${request.userId}/${request.dayId}`, obj);
  }

  public updateBasicChallengeInfo(challengeId: string, req: clgu.challenges.UpdateBasicInfoRequest): Observable<any> {
      const nameUpdate = req.name ? this.dbService.set(`${this.CHALLENGES_PATH}/${challengeId}/name`, req.name) : of(null);
      const descrUpdate = req.description ?  this.dbService.set(`${this.CHALLENGES_PATH}/${challengeId}/description`, req.description) : of(null);

      return combineLatest(nameUpdate, descrUpdate);
  }

  public updateChallengeDates(challengeId: string, req: number[]): Observable<any> {
      const updateObj = this.getDateObj(req);
      return  this.dbService.set(`${this.COMMON_CHALLENGE_DAYS_PATH}/${challengeId}`, updateObj);
  }

  public updateChallengeParticipants(challengeId: string, userIds: string[], deletedUsers: string[]): Observable<any> {
    const challPartObs = this.dbService.set(`${this.PARTICIPANTS_PATH}/${challengeId}`, this.getParticipantsObj(userIds));
    const userChallengesObs = userIds.map(userId => {
      return this.dbService.set(`${this.CHALLENGE_BY_USER_PATH}/${userId}/${challengeId}`, { id: challengeId, created_at: new Date().getTime() });
    });

    const deletedObs = deletedUsers.map(userId => {
      return this.dbService.set(`${this.CHALLENGE_BY_USER_PATH}/${userId}/${challengeId}`, null);
    })

    return combineLatest(challPartObs, ...userChallengesObs, ...deletedObs);
  }


  public updateMeasurements(challengeId: string, measurements: clgu.challenges.Measurement[]): Observable<any> {
    const measurementObj = this.getMeasurementsObj(measurements);
    return this.dbService.set(`${this.MEASUREMENTS_PATH}/${challengeId}`, measurementObj);
  }

  public addRequirements(request: clgu.challenges.AddRequirementsRequest): Observable<any[]> {
    const obs: Observable<any>[] = request.dates.map(ts => {
      return this.dbService.set(`${this.REQUIREMENTS_PATH}/${request.challengeId}/${ts}`, request.requirements);
    });
    obs.push(
      this.dbService.push(`${this.USERS_REQUIREMENTS_PATH}/${request.userId}`, request.requirements)
    );
    return combineLatest(...obs);
  }

  private getShowUpObject(req: clgu.challenges.DayShowUpRequest): clgu.challenges.db.UserChallengeDay {
    const result = {
      timestamp: parseInt(req.dayId, 10)
    } as clgu.challenges.db.UserChallengeDay;
    if (req.measurements) {
      result.measurements = req.measurements;
    }
    if (req.requirements) {
      result.requirements = req.requirements;
    }
    return result;
  }


  private getDateObj(dates: number[]): clgu.challenges.db.CommonChallengeDays {
    const res = {};
    dates.forEach(d => {
      res['' + d] = {
        timestamp: d
      }
    });
    return res;
  }

  private getMeasurementsObj(req: clgu.challenges.Measurement[]): any {
    const measurements = {};
    if (req) {
  
      req.forEach((m, ind) => {
        measurements[`measurement_${ind}`] = {
          display_name: m.displayName,
          type: m.type
        }
      });
    }
    return measurements;
}


  private getParticipantsObj(userIds: string[]): clgu.challenges.db.ChallengeParticipants {
    const res = {};
    userIds.forEach(id => {
      res[id] = id;
    });
    return res;
  }
}
