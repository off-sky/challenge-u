import { Injectable } from '@angular/core';
import { clgu } from '../../../../types';
import { Observable, of, combineLatest } from 'rxjs';
import { DatabaseService } from 'src/app/core/services/database.service';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CreateChallengeService {

  constructor(
    private dbService: DatabaseService
  ) { }

  public createChallenge(req: clgu.challenges.CreateChallengeRequest): Observable<any> {
   console.log(req)
   return this.dbService.push('challenges', this.getChallengeObj(req))
      .pipe(
        switchMap(challengeId => {
          const userChallenge$ = req.participants.map(userId => {
            return this.dbService.set(`users_challenges/${userId}/${challengeId}`, this.getUserChallengeObj(challengeId));
          });

          userChallenge$.push(
            this.dbService.set(`users_challenges/${req.ownerId}/${challengeId}`, this.getUserChallengeObj(challengeId))
          );
          const setChallengeId$ = this.dbService.set(`challenges/${challengeId}/id`, challengeId);
          const challParticipants$ = this.dbService.set(`challenges_participants/${challengeId}`, this.getParticipantsObj(req));
          const challMeasurements$ = this.dbService.set(`challenges_measurements/${challengeId}`, this.getMeasurementsObj(req));
          const challDates$ = req.schedule.map(ts => {
            return this.dbService.set(`challenges_dates/${challengeId}/${ts}`, { timestamp: ts });
          }) 
          // const challUserDates$ = this.dbService.set(`challenges_users_dates/${challengeId}/${}`, {});

          return combineLatest(
            ...userChallenge$,
            setChallengeId$,
            challParticipants$,
            ...challDates$,
            challMeasurements$
          );
        })
      )

  }



  private getChallengeObj(req: clgu.challenges.CreateChallengeRequest): any {
      const res = {
        name: req.name,
        description: req.description,
        owner_id: req.ownerId,
        type: req.type,
        created_at: this.dbService.getTimestampField()
      }     
      return res;
  }


  private getUserChallengeObj(challengeId: string): any {
    return {
      id: challengeId,
      created_at: this.dbService.getTimestampField()
    }
  }


  private getParticipantsObj(req: clgu.challenges.CreateChallengeRequest): any {
      const participants = {};
      participants[req.ownerId] = req.ownerId;
      req.participants.forEach(p => participants[p] = p);
      return participants;
  }


  private getMeasurementsObj(req: clgu.challenges.CreateChallengeRequest): any {
      const measurements = {};
      if (req.measurements) {
    
        req.measurements.forEach((m, ind) => {
          measurements[`measurement_${ind}`] = {
            display_name: m.displayName,
            type: m.type
          }
        });
      }
      return measurements;
  }


  private getDatesObj(req: clgu.challenges.CreateChallengeRequest): any {
    const result = {};
    req.schedule.forEach(timestamp => {
      result['' + timestamp] = {
        requirements: {}
      }
    });
    return result;
  }


}
