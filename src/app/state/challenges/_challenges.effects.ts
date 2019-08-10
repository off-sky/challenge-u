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
import { AuthState } from '../auth/_auth.state';

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


    @Effect() public addCategory$ = this.actions
    .pipe(
        ofType(ChallengesActions.ADD_CATEGORY),
        switchMap((a: YAction<clgu.common.UpdateRequest>) => {
            const request = a.payload;
            return this.challengeActionService.addCategory(request.id, request.data)
                .pipe(
                    map(res => new ChallengesActions.AddCategorySuccess(request.id)),
                    catchError(err => {
                        console.log(err);
                        return of(new ChallengesActions.AddCategoryFail(err));
                    })
                );

        })
    );

    @Effect() public addCategorySuccess$ = this.actions
        .pipe(
            ofType(ChallengesActions.ADD_CATEGORY_SUCCESS),
            switchMap((a: YAction<string>) => of(new ChallengesActions.ReloadCategories(a.payload)))
        )


    @Effect() public getCategories$ = this.actions
        .pipe(
            ofType(ChallengesActions.RELOAD_CATEGORIES),
            switchMap((a: YAction<string>) => {
                const request = a.payload;
                return this.challengeInfoService.getMeasurementCategories(request)
                    .pipe(
                        map(res => new ChallengesActions.ReloadCategoriesSuccess({ id: request, data: res})),
                        catchError(err => {
                            console.log(err);
                            return of(new ChallengesActions.ReloadCategoriesFail(err));
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

    @Effect() public addMeasurementPreset$ = this.actions
        .pipe(
            ofType(ChallengesActions.ADD_MEASUREMENT_PRESET),
            withLatestFrom(
                this.store.select(state => state.auth.authCheck.user)
                    .pipe(
                        filter(u => !!u),
                        map(u => u.id)
                    )
            ),
            switchMap((vals: [ YAction<any>, string]) => {
                const userId = vals[1];
                const payload = vals[0].payload as clgu.challenges.MeasurementPresetSaveRequest;

                return this.challengeActionService.addMeasurementPresets(
                    payload.challengeId,
                    userId,
                    payload.preset
                )
                .pipe(
                    map(res => new ChallengesActions.AddMeasurementPresetSuccess({
                        challengeId: payload.challengeId
                    })),
                    catchError(err => {
                        return of(new ChallengesActions.AddMeasurementPresetFail(err))
                    })
                )
            })
        );


    @Effect({ dispatch: false }) public onAddPreset$ = this.actions
        .pipe(
            ofType(ChallengesActions.ADD_MEASUREMENT_PRESET_SUCCESS),
            map((a: YAction<string>) => this.store.dispatch(new ChallengesActions.FetchMeasurementsPresets({
                challengeId: a.payload
            })))
        )


    @Effect() public fetchMeasurementsPresets$ = this.actions
            .pipe(
                ofType(ChallengesActions.FETCH_MEASUREMENT_PRESETS),
                withLatestFrom(
                    this.store.select(state => state.auth.authCheck.user)
                        .pipe(
                            filter(u => !!u),
                            map(u => u.id)
                        )
                ),
                switchMap((vals: [ YAction<any>, string]) => {
                    const userId = vals[1];
                    const payload = vals[0].payload as clgu.challenges.MeasurementPresetGetRequest;
                    const challengeId = payload.challengeId;

                    return this.challengeInfoService.getMeasurementPresets(challengeId, userId)
                        .pipe(
                            map(res => new ChallengesActions.FetchMeasurementsPresetsSuccess({
                                id: challengeId,
                                data: res
                            })),
                            catchError(err => {
                                console.log(err);
                                return of(new ChallengesActions.FetchMeasurementsPresetsFail(err));
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
                    const data = payload.data as clgu.challenges.UpdateParticipantsRequest;

                    return this.challengeActionService.updateChallengeParticipants(challengeId, data.new, data.deleted)
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
                switchMap((action: YAction<clgu.challenges.EditMeasurementsRequest>) => {
                    const payload = action.payload as clgu.challenges.EditMeasurementsRequest;

                    return this.challengeActionService.updateMeasurements(payload)
                        .pipe(
                            map(res => new ChallengesActions.UpdateChallengeMeasurementsSuccess()),
                            catchError(err => {
                                const errWithId = {
                                    id: payload.challengeId,
                                    error: err
                                };
                                return of(new ChallengesActions.UpdateChallengeMeasurementsFail(errWithId))
                            })
                        )
                })
            );


        /**Leave challenge */
        @Effect() public leaveChallenge$ = this.actions
                .pipe(
                    ofType(ChallengesActions.LEAVE_CHALLENGE),
                    withLatestFrom(this.store.select(state => state.auth)),
                    switchMap((vals: [ YAction<string>, AuthState]) => {
                        const [ action, state ] = vals;
                        const challengeId = action.payload;
                        const userId = state.authCheck.user.id;
                        return this.challengeActionService.leaveChallenge(challengeId, userId)
                            .pipe(
                                map(res => new ChallengesActions.LeaveChallengeSuccess(challengeId)),
                                catchError(err => of(new ChallengesActions.LeaveChallengeFail({ id: challengeId, error: err})))
                            );
                    })
                )

}
