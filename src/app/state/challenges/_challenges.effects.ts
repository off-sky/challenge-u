import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ChallengesActions } from './_challenges.actions';
import { switchMap, catchError, map } from 'rxjs/operators';
import { YAction } from 'src/types/store';
import { clgu } from 'src/types';
import { CreateChallengeService } from './services/create-challenge.service';
import { of, Subscription } from 'rxjs';
import { ChallengeInfoService } from './services/challenge-info.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';

@Injectable()
export class ChallengesEffects {

    private challengeListSub: Subscription;


    constructor(
        private actions: Actions,
        private createChallengeService: CreateChallengeService,
        private challengeInfoService: ChallengeInfoService,
        private store: Store<AppState>
    ){}

    @Effect() public createChallenge$ = this.actions
        .pipe(
            ofType(ChallengesActions.CREATE_CHALLENGE),
            switchMap((action: YAction<clgu.challenges.CreateChallengeRequest>) => {

                return this.createChallengeService.createChallenge(action.payload)
                    .pipe(
                        map(res => new ChallengesActions.CreateChallengeSuccess(res)),
                        catchError(err => {
                            console.log(err);
                            return of(new ChallengesActions.CreateChallengeFail(err))
                        })
                    )
            })
        );

    
    @Effect({ dispatch: false }) public startListenChallengeList$ = this.actions
            .pipe(
                ofType(ChallengesActions.START_LISTEN_CHALLENGE_LIST),
                map(() => {
                    if (this.challengeListSub) {
                        this.challengeListSub.unsubscribe();
                    }
                    this.challengeListSub = this.challengeInfoService.getChallengeList()
                            .subscribe(res => {
                                this.store.dispatch(new ChallengesActions.SaveChallengeList(res));
                            })
                })
            )

}