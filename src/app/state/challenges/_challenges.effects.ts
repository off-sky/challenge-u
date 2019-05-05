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
import { ChallengesDbActions } from './_challenges.db.actions';
import { ChallengesSelectors } from './_challenges.selectors';

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





    @Effect() public getChallengeDetails$ = this.actions
            .pipe(
                ofType(ChallengesActions.GET_CHALLENGE_DETAILS),
                switchMap((action: YAction<string>) => {
                    const challengeId = action.payload;
                    this.store.dispatch(new ChallengesDbActions.ReloadChallengeBasicInfo({ ids: [ challengeId]}));
                    this.store.dispatch(new ChallengesDbActions.ReloadChallengeDates({ ids: [ challengeId]}));
                    this.store.dispatch(new ChallengesDbActions.StartListenUserChallengeDates(challengeId));
                    this.store.dispatch(new ChallengesDbActions.StartListenChallengeParticipants(challengeId));
                    this.store.dispatch(new ChallengesDbActions.StartListenChallengesMeasurements(challengeId));
                    this.store.dispatch(new ChallengesDbActions.StartListenChallengesRequirements(challengeId));

                    return ChallengesSelectors.challengeDetails$(this.store, challengeId)
                        .pipe(
                            filter(dbObj => {
                                return !!dbObj.challenge && !!dbObj.common_days && !!dbObj.participants;
                            }),
                            map(() => new ChallengesActions.GetChallengeDetailsIfEmptySuccess()),
                            catchError(err => {
                                return of(new ChallengesActions.GetChallengeDetailsIfEmptyFail({ id: challengeId, error: err}));
                            })
                        )
                        
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


    /**
     * Update
     */
    @Effect() public updateBasicInfo$ = this.actions
            .pipe(
                ofType(ChallengesActions.UPDATE_CHALLENGE_BASIC_INFO),
                switchMap((action: YAction<clgu.common.UpdateRequest>) => {
                    const payload = action.payload;
                    const challengeId = payload.id;
                    const data = payload.data as clgu.challenges.UpdateBasicInfoRequest;

                    return this.challengeActionService.updateBasicChallengeInfo(challengeId, data)
                        .pipe(
                            map(res => new ChallengesActions.UpdateBasicInfoSuccess()),
                            catchError(err => {
                                const errWithId = {
                                    id: challengeId,
                                    error: err
                                };
                                return of(new ChallengesActions.UpdateBasicInfoFail(errWithId))
                            })
                        )
                })
            );


        @Effect() public updateDates$ = this.actions
            .pipe(
                ofType(ChallengesActions.UPDATE_CHALLENGE_DATES),
                switchMap((action: YAction<clgu.common.UpdateRequest>) => {
                    const payload = action.payload;
                    const challengeId = payload.id;
                    const data = payload.data as number[];

                    return this.challengeActionService.updateChallengeDates(challengeId, data)
                        .pipe(
                            map(res => new ChallengesActions.UpdateChallengeDatesSuccess()),
                            catchError(err => {
                                const errWithId = {
                                    id: challengeId,
                                    error: err
                                };
                                return of(new ChallengesActions.UpdateChallengeDatesFail(errWithId))
                            })
                        )
                })
            );


        @Effect() public updateParticipants$ = this.actions
            .pipe(
                ofType(ChallengesActions.UPDATE_CHALLENGE_PARTICIPANTS),
                switchMap((action: YAction<clgu.common.UpdateRequest>) => {
                    const payload = action.payload;
                    const challengeId = payload.id;
                    const data = payload.data as string[];

                    return this.challengeActionService.updateChallengeParticipants(challengeId, data)
                        .pipe(
                            map(res => new ChallengesActions.UpdateChallengeParticipantsSuccess()),
                            catchError(err => {
                                const errWithId = {
                                    id: challengeId,
                                    error: err
                                };
                                return of(new ChallengesActions.UpdateChallengeParticipantsFail(errWithId))
                            })
                        )
                })
            );


        @Effect() public updateMeasurements$ = this.actions
            .pipe(
                ofType(ChallengesActions.UPDATE_CHALLENGE_MEASUREMENTS),
                switchMap((action: YAction<clgu.common.UpdateRequest>) => {
                    const payload = action.payload;
                    const challengeId = payload.id;
                    const data = payload.data as clgu.challenges.Measurement[];

                    return this.challengeActionService.updateMeasurements(challengeId, data)
                        .pipe(
                            map(res => new ChallengesActions.UpdateChallengeMeasurementsSuccess()),
                            catchError(err => {
                                const errWithId = {
                                    id: challengeId,
                                    error: err
                                };
                                return of(new ChallengesActions.UpdateChallengeMeasurementsFail(errWithId))
                            })
                        )
                })
            );

}
