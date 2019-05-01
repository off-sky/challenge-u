import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/core/services/database.service';
import { Observable } from 'rxjs';
import { clgu } from 'src/types';
import { combineLatest } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChallengeActionService {

  private CHALLENGE_DATES_PATH = 'challenges_dates';
  private CHALLENGE_USER_DATE_PATH = 'challenges_users_dates';
  private USERS_REQUIREMENTS_PATH = 'users_requirements';

  constructor(
    private dbService: DatabaseService
  ) { }

  public showUpDate(request: clgu.challenges.DayShowUpRequest): Observable<void> {
      const obj = this.getShowUpObject(request);
      return this.dbService.set(`${this.CHALLENGE_USER_DATE_PATH}/${request.challengeId}/${request.userId}/${request.dayId}`, obj);
  }

  public addRequirements(request: clgu.challenges.AddRequirementsRequest): Observable<any[]> {
    const obs: Observable<any>[] = request.dates.map(ts => {
      return this.dbService.set(`${this.CHALLENGE_DATES_PATH}/${request.challengeId}/${ts}/requirements`, request.requirements);
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
}
