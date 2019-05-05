import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { clgu } from '../../../../types';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { AppState } from '../../../state/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ChallengesActions } from '../../../state/challenges/_challenges.actions';
import { filter, map, take, switchMap } from 'rxjs/operators';
import { ChallengesSelectors } from 'src/app/state/challenges/_challenges.selectors';

@Injectable({
  providedIn: 'root'
})
export class ChallengeDetailsResolverService implements Resolve<clgu.challenges.Challenge> {

 
  constructor(
    private store: Store<AppState>
  ) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<clgu.challenges.Challenge> {
    const id = route.params.id;
    
    this.store.dispatch(new ChallengesActions.GetChallengeDetails(id));

    return this.store.select(state => state.challenges.details)
      .pipe(
        filter(state => !!state && !state.isLoading),
        take(1),
        switchMap(() => ChallengesSelectors.challengeDetails$(this.store, id)),
        take(1),
        map(challDb => new clgu.challenges.models.Challenge(challDb))
      )

  }

  
}
