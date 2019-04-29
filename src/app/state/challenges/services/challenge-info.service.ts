import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/core/services/database.service';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChallengeInfoService {

  constructor(
    private dbService: DatabaseService
  ) { }


  public getChallengeList(): Observable<any> {
    throw new Error('Not implemented')
  }



}
