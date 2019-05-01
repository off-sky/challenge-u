import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ChallengesActions } from './_challenges.actions';
import { switchMap, catchError, map, tap, filter } from 'rxjs/operators';
import { YAction } from 'src/types/store';
import { clgu } from 'src/types';
import { CreateChallengeService } from './services/create-challenge.service';
import { of, Subscription } from 'rxjs';
import { ChallengeInfoService } from './services/challenge-info.service';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { withLatestFrom } from 'rxjs/operators';
import { ChallengeActionService } from './services/challenge-action.service';
import { Router } from '@angular/router';

@Injectable()
export class ChallengesEffects {

    private challengeListSub: Subscription;


    constructor(
        private actions: Actions,
        private createChallengeService: CreateChallengeService,
        private challengeInfoService: ChallengeInfoService,
        private challengeActionService: ChallengeActionService,
        private router: Router,
        private store: Store<AppState>
    ) {}


    @Effect() public addRequirements$ = this.actions
        .pipe(
            ofType(ChallengesActions.ADD_REQUIREMENTS),
            switchMap((a: YAction<clgu.challenges.AddRequirementsRequest>) => {
                const request = a.payload;
                return this.challengeActionService.addRequirements(request)
                    .pipe(
                        map(res => new ChallengesActions.AddRequirementsSuccess()),
                        catchError(err => {
                            console.log(err);
                            return of(new ChallengesActions.AddRequirementsFail(err));
                        })
                    );

            })
        );


    @Effect() public createChallenge$ = this.actions
        .pipe(
            ofType(ChallengesActions.CREATE_CHALLENGE),
            switchMap((action: YAction<clgu.challenges.CreateChallengeRequest>) => {

                return this.createChallengeService.createChallenge(action.payload)
                    .pipe(
                        map(res => new ChallengesActions.CreateChallengeSuccess(res)),
                        tap(() => {
                            this.router.navigate(['home', 'challenges', 'list']);
                        }),
                        catchError(err => {
                            console.log(err);
                            return of(new ChallengesActions.CreateChallengeFail(err));
                        })
                    );
            })
        );


    @Effect() public fetchRequirementPresets$ = this.actions
            .pipe(
                ofType(ChallengesActions.FETCH_REQUIREMENT_PRESETS),
                tap(() => console.log('Fetching presets')),
                withLatestFrom(
                    this.store.select(state => state.auth.authCheck.user)
                        .pipe(
                            filter(u => !!u),
                            map(u => u.id)
                        )
                ),
                switchMap((vals) => {
                    const userId = vals[1];

                    return this.challengeInfoService.getRequirementPresets(userId)
                        .pipe(
                            map(res => new ChallengesActions.FetchRequirementsPresetsSuccess(res)),
                            catchError(err => {
                                console.log(err);
                                return of(new ChallengesActions.FetchRequirementsPresetsFail(err));
                            })
                        );
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
                            });
                })
            );


    @Effect() public getChallengeDetails$ = this.actions
            .pipe(
                ofType(ChallengesActions.GET_CHALLENGE_DETAILS),
                switchMap((action: YAction<string>) => {
                    const challengeId = action.payload;
                    return this.challengeInfoService.getChallengeDetails(challengeId)
                            .pipe(
                                map(dbChallenge => {
                                    const challenge = new clgu.challenges.models.Challenge(dbChallenge);
                                    return new ChallengesActions.GetChallengeDetailsIfEmptySuccess(challenge);
                                }),
                                catchError(err => {
                                    const errWithId = {
                                        id: challengeId,
                                        error: err
                                    };
                                    return of(new ChallengesActions.GetChallengeDetailsIfEmptyFail(errWithId));
                                })
                            );
                })
            );

    @Effect() public getChallengeDetailsIfEmpty$ = this.actions
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
                                    const challenge = new clgu.challenges.models.Challenge(dbChallenge);
                                    return new ChallengesActions.GetChallengeDetailsIfEmptySuccess(challenge);
                                }),
                                catchError(err => {
                                    const errWithId = {
                                        id: challengeId,
                                        error: err
                                    };
                                    return of(new ChallengesActions.GetChallengeDetailsIfEmptyFail(errWithId));
                                })
                            );
                    } else {
                        const item = items[challengeId].item;
                        return of(new ChallengesActions.GetChallengeDetailsIfEmptySuccess(item));
                    }
                })
            );


    @Effect() public showUpDate$ = this.actions
            .pipe(
                ofType(ChallengesActions.SHOW_UP_DATE),
                switchMap((action: YAction<clgu.challenges.DayShowUpRequest>) => {
                    const request = action.payload;
                    return this.challengeActionService.showUpDate(request)
                        .pipe(
                            map(res => {
                                this.store.dispatch(new ChallengesActions.GetChallengeDetails(request.challengeId));
                                return new ChallengesActions.ShowUpDateSuccess(request.dayId);
                            }),
                            catchError(err => of(new ChallengesActions.ShowUpDateFail({ id: request.dayId, error: err })))
                        );
                })
            );

}
