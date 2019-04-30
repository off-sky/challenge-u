import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { clgu } from '../../../../types';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RouterStateSnapshot } from '@angular/router';
import { AppState } from '../../../state/app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { ChallengesActions } from '../../../state/challenges/_challenges.actions';
import { filter, map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ChallengeDetailsResolverService implements Resolve<clgu.challenges.Challenge> {

 
  constructor(
    private store: Store<AppState>
  ) { }


  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<clgu.challenges.Challenge> {
    const id = route.params.id;
    
    this.store.dispatch(new ChallengesActions.GetChallengeDetailsIfEmpty(id));

    return this.store.select(state => state.challenges.details[id])
      .pipe(
        filter(state => !!state && !state.isLoading),
        map(state => state.item),
        take(1)
      )

  }

  
}
