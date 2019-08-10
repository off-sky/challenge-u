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
  private CHALLENGES_CATEGORIES_PATH = 'challenges_categories';
  private CHALLENGE_BY_USER_PATH = 'users_challenges';
  private COMMON_CHALLENGE_DAYS_PATH = 'challenges_dates';
  private MEASUREMENTS_PATH = 'challenges_measurements';
  private PARTICIPANTS_PATH = 'challenges_participants';
  private PRESETS_PATH = 'challenges_measurements_presets';

  constructor(
    private dbService: DatabaseService
  ) { }


  public addCategory(challengeId: string, category: string): Observable<any> {
    const ref = `${this.CHALLENGES_CATEGORIES_PATH}/${challengeId}`;
    return this.dbService.push(ref, category);
  }

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


  public updateMeasurements(request: clgu.challenges.EditMeasurementsRequest): Observable<any> {
    const updateObj = {};
    const measurementObj = this.getMeasurementsObj(request.measurements)
    request.userIds.forEach(userId => {
      request.stamps.forEach(stamp => {
          const ref = `${request.challengeId}/${stamp}/${userId}` 
          updateObj[ref] = measurementObj;
      });
    })
    return this.dbService.update(this.MEASUREMENTS_PATH, updateObj);
  }

  public addMeasurementPresets(challengeId: string, userId: string, req: clgu.challenges.MeasurementPreset): Observable<any> {
      const ref = `${this.PRESETS_PATH}/${challengeId}/${userId}`;
      const measDb = this.getMeasurementsObj(req.measurements);
      const res = {
        name: req.name,
        measurements: measDb,
        created_at: this.dbService.getTimestampField()
      }
      return this.dbService.push(ref, res);
  }

  // TODO: Implement delete challenge
  public leaveChallenge(challengeId: string, userId: string): Observable<void> {
    const challengesByUserRef = `${this.CHALLENGE_BY_USER_PATH}/${userId}/${challengeId}`;
    const usersByChallengeRef = `${this.PARTICIPANTS_PATH}/${challengeId}/${userId}`;
    const updateObj = {
      [challengesByUserRef]: null,
      [usersByChallengeRef]: null
    }
    return this.dbService.update(undefined, updateObj);
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
        const res = {
          id: m.id,
          display_name: m.displayName,
          type: m.type,
          order_no: m.orderNo
        }
        if (m.formula) {
          const formula = {};
          m.formula.forEach((f, ind) => {
            formula['' + ind] = f;
          })
          res['formula'] = formula;
        }
        if (m.category) {
          res['category'] = m.category;
        }
        measurements[m.id] = res;
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
