import { Injectable } from '@angular/core';
import { clgu } from '../../../../types';

@Injectable({
  providedIn: 'root'
})
export class CreateChallengeService {

  constructor() { }

  public createChallenge(req: clgu.challenges.CreateChallengeRequest): Promise<any> {
    throw new Error('Not implemented');
  }


}
