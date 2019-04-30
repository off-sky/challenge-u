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
import { withLatestFrom } from 'rxjs/operators';

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
                withLatestFrom(this.store.select(state => state.auth.authCheck.user)),
                map((vals) => {
                    const user = vals[1];
                    if (this.challengeListSub) {
                        this.challengeListSub.unsubscribe();
                    }
                    this.challengeListSub = this.challengeInfoService.getChallengeList(user.id)
                            .subscribe((res: clgu.challenges.db.ChallengeObj[]) => {
                                if (res) {
                                    const listItems = res.map(dbItem => new clgu.challenges.models.ChallengeListItem(dbItem));
                                    this.store.dispatch(new ChallengesActions.SaveChallengeList(listItems));
                                }
                            })
                })
            );


    
    @Effect() public getChallengeDetails$ = this.actions
            .pipe(
                ofType(ChallengesActions.GET_CHALLENGE_DETAILS_IF_EMPTY),
                withLatestFrom(this.store.select(state => state.challenges.details)),
                switchMap(vals => {
                    const action = vals[0] as YAction<string>;
                    const items = vals[1];
                    const challengeId = action.payload;
                    if (!items[challengeId].item) {
                        return this.challengeInfoService.getChallengeDetails(challengeId)
                            .pipe(
                                map(dbChallenge => {
                                    const challenge = new clgu.challenges.models.Challenge(dbChallenge)
                                    return new ChallengesActions.GetChallengeDetailsIfEmptySuccess(challenge);
                                }),
                                catchError(err => {
                                    const errWithId = {
                                        id: challengeId,
                                        error: err
                                    }
                                    return of(new ChallengesActions.GetChallengeDetailsIfEmptyFail(errWithId));
                                })
                            )
                    } else {
                        const item = items[challengeId].item;
                        return of(new ChallengesActions.GetChallengeDetailsIfEmptySuccess(item));
                    }
                })
            )

}