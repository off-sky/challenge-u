import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { ChallengesDbActions } from './_challenges.db.actions';
import { flatMap, withLatestFrom, catchError, map, debounceTime, switchMap } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { YAction } from 'src/types/store';
import { clgu } from 'src/types';
import { ChallengesState } from './_challenges.state';
import { ChallengeInfoService } from './services/challenge-info.service';
import { AppActions } from '../app.actions';

interface SubscriptionMap {
    [challengeId: string]: Subscription;
}

@Injectable()
export class ChallengesDbEffects {

    private participantsSubs: SubscriptionMap = {};
    private userChallengeDateSubs: SubscriptionMap = {};
    private userChallengeSubs: SubscriptionMap = {};
    private requirementSubs: SubscriptionMap = {};
    private measurementSubs: SubscriptionMap = {};

    constructor(
        private actions: Actions,
        private store: Store<AppState>,
        private challengeInfoService: ChallengeInfoService
    ) {}

    /**
     * Basic info
     */
    @Effect() public reloadBasicInfo$ = this.actions
        .pipe(
            ofType(ChallengesDbActions.RELOAD_CHALLENGE_BASIC_INFO),
            withLatestFrom(this.store.select(state => state.challenges)),
            flatMap((values: [YAction<clgu.common.ReloadInfoRequest>, ChallengesState]) => {
                const action        = values[0];
                const challengeId   = action.payload.ids[0];
                const challState    = values[1];
                if (challState.challengeBasicInfo[challengeId] === undefined) {
                    return this.challengeInfoService.getChallengeBasicInfo(challengeId)
                        .pipe(
                            map(res => {
                                const result = new clgu.common.UpdatableDataObject<clgu.challenges.db.ChallengeObj>(challengeId, res);
                                return new ChallengesDbActions.ReloadChallengeBasicInfoSuccess(result);
                            }),
                            catchError(err => {
                                console.log(err);
                                const result = new clgu.common.UpdatableDataObject<clgu.challenges.db.ChallengeObj>(challengeId, null, err);
                                return of(new ChallengesDbActions.ReloadChallengeBasicInfoFail(result));
                            })
                        );
                } else {
                    return of(new AppActions.IdleAction());
                }
            })
        );


    /**
     * Common challenge dates
     */
    @Effect() public reloadChallengeDates$ = this.actions
        .pipe(
            ofType(ChallengesDbActions.RELOAD_CHALLENGE_DATES),
            withLatestFrom(this.store.select(state => state.challenges)),
            flatMap((values: [YAction<clgu.common.ReloadInfoRequest>, ChallengesState]) => {
                const action = values[0];
                const challengeId = action.payload.ids[0];
                const challState = values[1];
                if (challState.challengesDates[challengeId] === undefined) {
                    return this.challengeInfoService.getCommonChallengesDates(challengeId)
                        .pipe(
                            map(res => {
                                const result = new clgu.common.UpdatableDataObject<clgu.challenges.db.CommonChallengeDays>(challengeId, res);
                                return new ChallengesDbActions.ReloadChallengeDatesSuccess(result);
                            }),
                            catchError(err => {
                                console.log(err);
                                const result = new clgu.common.UpdatableDataObject<clgu.challenges.db.CommonChallengeDays>(challengeId, null, err);
                                return of(new ChallengesDbActions.ReloadChallengeDatesFail(result));
                            })
                        );
                } else {
                    return of(new AppActions.IdleAction());
                }
            })
        );
    

    /**
     * Participants
     */
    @Effect() public reloadChallengeParticipants$ = this.actions
        .pipe(
            ofType(ChallengesDbActions.RELOAD_CHALLENGE_PARTICIPANTS),
            withLatestFrom(this.store.select(state => state.challenges)),
            flatMap((values: [YAction<clgu.common.ReloadInfoRequest>, ChallengesState]) => {
                const action = values[0];
                const challengeId = action.payload.ids[0];
                const challState = values[1];
                if (challState.challengesParticipants[challengeId] === undefined) {
                    return this.challengeInfoService.getChallengesParticipants(challengeId)
                        .pipe(
                            map(res => {
                                const result = new clgu.common.UpdatableDataObject<clgu.challenges.db.ChallengeParticipants>(challengeId, res);
                                return new ChallengesDbActions.ReloadChallengeParticipantsSuccess(result);
                            }),
                            catchError(err => {
                                console.log(err);
                                const result = new clgu.common.UpdatableDataObject<clgu.challenges.db.ChallengeParticipants>(challengeId, null, err);
                                return of(new ChallengesDbActions.ReloadChallengeParticipantsFail(result));
                            })
                        );
                } else {
                    return of(new AppActions.IdleAction());
                }
            })
        );

    @Effect({ dispatch: false }) public startListenParticipants$ = this.actions
            .pipe(
                ofType(ChallengesDbActions.START_LISTEN_CHALLENGE_PARTICIPANTS),
                map((action: YAction<string>) => {
                    const challengeId = action.payload;
                    if (this.participantsSubs[challengeId]) {
                        this.participantsSubs[challengeId].unsubscribe();
                    }
                    this.participantsSubs[challengeId] = this.challengeInfoService.listenChallengesParticipants(challengeId)
                        .pipe(
                            debounceTime(200)
                        )
                        .subscribe(res => {
                            const update = new clgu.common.UpdatableDataObject<clgu.challenges.db.ChallengeParticipants>(challengeId, res);
                            this.store.dispatch(new ChallengesDbActions.ReloadChallengeParticipantsSuccess(update));
                        });
                })
            );

    @Effect({ dispatch: false }) public stopListenParticipants$ = this.actions
            .pipe(
                ofType(ChallengesDbActions.STOP_LISTEN_CHALLENGE_PARTICIPANTS),
                map((action: YAction<string>) => {
                    const challengeId = action.payload;
                    if (this.participantsSubs[challengeId]) {
                        this.participantsSubs[challengeId].unsubscribe();
                        delete this.participantsSubs[challengeId];
                    }
                })
            );


    /**
     * Challenge Dates by user
     */
    @Effect() public reloadUserChallengeDates$ = this.actions
        .pipe(
            ofType(ChallengesDbActions.RELOAD_USER_CHALLENGE_DATES),
            withLatestFrom(this.store.select(state => state.challenges)),
            flatMap((values: [YAction<clgu.common.ReloadInfoRequest>, ChallengesState]) => {
                const action = values[0];
                const challengeId = action.payload.ids[0];
                const challState = values[1];
                if (challState.userChallengeDates[challengeId] === undefined) {
                    return this.challengeInfoService.getUserChallengeDates(challengeId)
                        .pipe(
                            map(res => {
                                const result = new clgu.common.UpdatableDataObject<clgu.challenges.db.UserChallengeDayMap>(challengeId, res);
                                return new ChallengesDbActions.ReloadUserChallengeDatesSuccess(result);
                            }),
                            catchError(err => {
                                console.log(err);
                                const result = new clgu.common.UpdatableDataObject<clgu.challenges.db.UserChallengeDayMap>(challengeId, null, err);
                                return of(new ChallengesDbActions.ReloadUserChallengeDatesFail(result));
                            })
                        );
                } else {
                    return of(new AppActions.IdleAction());
                }
            })
        );


    @Effect({ dispatch: false }) public startListenUserChallengeDates$ = this.actions
            .pipe(
                ofType(ChallengesDbActions.START_LISTEN_USER_CHALLENGE_DATES),
                map((action: YAction<string>) => {
                    const challengeId = action.payload;
                    if (this.userChallengeDateSubs[challengeId]) {
                        this.userChallengeDateSubs[challengeId].unsubscribe();
                    }
                    this.userChallengeDateSubs[challengeId] = this.challengeInfoService.listenUserChallengeDates(challengeId)
                        .pipe(
                            debounceTime(200)
                        )
                        .subscribe(res => {
                            const update = new clgu.common.UpdatableDataObject<clgu.challenges.db.UserChallengeDayMap>(challengeId, res);
                            this.store.dispatch(new ChallengesDbActions.ReloadUserChallengeDatesSuccess(update));
                        });
                })
            );

    @Effect({ dispatch: false }) public stopListeningUserChallengeDates$ = this.actions
            .pipe(
                ofType(ChallengesDbActions.STOP_LISTEN_USER_CHALLENGE_DATES),
                map((action: YAction<string>) => {
                    const challengeId = action.payload;
                    if (this.userChallengeDateSubs[challengeId]) {
                        this.userChallengeDateSubs[challengeId].unsubscribe();
                        delete this.userChallengeDateSubs[challengeId];
                    }
                })
            );


    /**
     * Challenges by user
     */
    @Effect() public reloadUserChallenges$ = this.actions
        .pipe(
            ofType(ChallengesDbActions.RELOAD_USER_CHALLENGES),
            withLatestFrom(this.store.select(state => state.challenges)),
            flatMap((values: [YAction<clgu.common.ReloadInfoRequest>, ChallengesState]) => {
                const action = values[0];
                const challengeId = action.payload.ids[0];
                const challState = values[1];

                if (challState.usersChallenges[challengeId] === undefined) {
                    return this.challengeInfoService.getChallengesByUser(challengeId)
                        .pipe(
                            map(res => {
                                const result = new clgu.common.UpdatableDataObject<clgu.challenges.db.ChallengesByUser>(challengeId, res);
                                return new ChallengesDbActions.ReloadUserChallengesSuccess(result);
                            }),
                            catchError(err => {
                                console.log(err);
                                const result = new clgu.common.UpdatableDataObject<clgu.challenges.db.ChallengesByUser>(challengeId, null, err);
                                return of(new ChallengesDbActions.ReloadUserChallengesFail(result));
                            })
                        );
                } else {
                    return of(new AppActions.IdleAction());
                }
            })
        );

    @Effect({ dispatch: false }) public onLoadChallengesByUser$ = this.actions
            .pipe(
                ofType(ChallengesDbActions.RELOAD_USER_CHALLENGES_SUCCESS),
                map((action: YAction<clgu.common.UpdatableDataObject<clgu.challenges.db.ChallengesByUser>>) => {
                    const update = action.payload;
                    if (update && update.data) {
                        Object.keys(update.data)
                            .forEach(challengeId => {
                                this.store.dispatch(new ChallengesDbActions.ReloadChallengeBasicInfo({ ids: [challengeId], force: false }))
                            })
                    }
                })
            )


    @Effect({ dispatch: false }) public startListenUserChallenges$ = this.actions
            .pipe(
                ofType(ChallengesDbActions.START_LISTEN_USER_CHALLENGES),
                map((action: YAction<string>) => {
                    const challengeId = action.payload;
                    if (this.userChallengeSubs[challengeId]) {
                        this.userChallengeSubs[challengeId].unsubscribe();
                    }
                    this.userChallengeSubs[challengeId] = this.challengeInfoService.listenChallengesByUser(challengeId)
                        .pipe(
                            debounceTime(200)
                        )
                        .subscribe(res => {
                            const update = new clgu.common.UpdatableDataObject<clgu.challenges.db.ChallengesByUser>(challengeId, res);
                            this.store.dispatch(new ChallengesDbActions.ReloadUserChallengesSuccess(update));
                        });
                })
            );

    @Effect({ dispatch: false }) public stopListeningUserChallenges$ = this.actions
            .pipe(
                ofType(ChallengesDbActions.STOP_LISTEN_USER_CHALLENGES),
                map((action: YAction<string>) => {
                    const challengeId = action.payload;
                    if (this.userChallengeSubs[challengeId]) {
                        this.userChallengeSubs[challengeId].unsubscribe();
                        delete this.userChallengeSubs[challengeId];
                    }
                })
            );


    /**
     * Requirements
     */
    @Effect() public reloadRequirements$ = this.actions
        .pipe(
            ofType(ChallengesDbActions.RELOAD_CHALLENGES_REQUIREMENTS),
            withLatestFrom(this.store.select(state => state.challenges)),
            flatMap((values: [YAction<clgu.common.ReloadInfoRequest>, ChallengesState]) => {
                const action = values[0];
                const challengeId = action.payload.ids[0];
                const challState = values[1];

                if (challState.challengesRequirements[challengeId] === undefined) {
                    return this.challengeInfoService.getChallengeRequirements(challengeId)
                        .pipe(
                            map(res => {
                                const result = new clgu.common.UpdatableDataObject<clgu.challenges.db.ChallengeRequirements>(challengeId, res);
                                return new ChallengesDbActions.ReloadChallengesRequirementsSuccess(result);
                            }),
                            catchError(err => {
                                console.log(err);
                                const result = new clgu.common.UpdatableDataObject<clgu.challenges.db.ChallengeRequirements>(challengeId, null, err);
                                return of(new ChallengesDbActions.ReloadChallengesRequirementsFail(result));
                            })
                        );
                } else {
                    return of(new AppActions.IdleAction());
                }
            })
        );

    @Effect({ dispatch: false }) public startListenRequirements$ = this.actions
            .pipe(
                ofType(ChallengesDbActions.START_LISTEN_CHALLENGES_REQUIREMENTS),
                map((action: YAction<string>) => {
                    const challengeId = action.payload;
                    if (this.requirementSubs[challengeId]) {
                        this.requirementSubs[challengeId].unsubscribe();
                    }
                    this.requirementSubs[challengeId] = this.challengeInfoService.listenChallengeRequirements(challengeId)
                        .pipe(
                            debounceTime(200)
                        )
                        .subscribe(res => {
                            const update = new clgu.common.UpdatableDataObject<clgu.challenges.db.ChallengeRequirements>(challengeId, res);
                            this.store.dispatch(new ChallengesDbActions.ReloadChallengesRequirementsSuccess(update));
                        });
                })
            );

    @Effect({ dispatch: false }) public stopListeningRequirements$ = this.actions
            .pipe(
                ofType(ChallengesDbActions.STOP_LISTEN_CHALLENGES_REQUIREMENTS),
                map((action: YAction<string>) => {
                    const challengeId = action.payload;
                    if (this.requirementSubs[challengeId]) {
                        this.requirementSubs[challengeId].unsubscribe();
                        delete this.requirementSubs[challengeId];
                    }
                })
            );


    /**
     * Measurements
     */
    @Effect() public reloadMeasurements$ = this.actions
        .pipe(
            ofType(ChallengesDbActions.RELOAD_CHALLENGES_MEASUREMENTS),
            withLatestFrom(this.store.select(state => state.challenges)),
            flatMap((values: [YAction<clgu.common.ReloadInfoRequest>, ChallengesState]) => {
                const action = values[0];
                const challengeId = action.payload.ids[0];
                const challState = values[1];

                if (challState.challengesMeasurements[challengeId] === undefined) {
                    return this.challengeInfoService.getMeasurements(challengeId)
                        .pipe(
                            map(res => {
                                const result = new clgu.common.UpdatableDataObject<clgu.challenges.db.Measurements>(challengeId, res);
                                return new ChallengesDbActions.ReloadChallengesMeasurementsSuccess(result);
                            }),
                            catchError(err => {
                                console.log(err);
                                const result = new clgu.common.UpdatableDataObject<clgu.challenges.db.Measurements>(challengeId, null, err);
                                return of(new ChallengesDbActions.ReloadChallengesMeasurementsFail(result));
                            })
                        );
                } else {
                    return of(new AppActions.IdleAction());
                }
            })
        );


    @Effect({ dispatch: false }) public startListenMeasurements$ = this.actions
            .pipe(
                ofType(ChallengesDbActions.START_LISTEN_CHALLENGES_MEASUREMENTS),
                map((action: YAction<string>) => {
                    const challengeId = action.payload;
                    if (this.measurementSubs[challengeId]) {
                        this.measurementSubs[challengeId].unsubscribe();
                    }
                    this.measurementSubs[challengeId] = this.challengeInfoService.listenMeasurements(challengeId)
                        .pipe(
                            debounceTime(200)
                        )
                        .subscribe(res => {
                            const update = new clgu.common.UpdatableDataObject<clgu.challenges.db.Measurements>(challengeId, res);
                            this.store.dispatch(new ChallengesDbActions.ReloadChallengesMeasurementsSuccess(update));
                        });
                })
            );

    @Effect({ dispatch: false }) public stopListeningMeasurements$ = this.actions
            .pipe(
                ofType(ChallengesDbActions.STOP_LISTEN_CHALLENGES_MEASUREMENTS),
                map((action: YAction<string>) => {
                    const challengeId = action.payload;
                    if (this.measurementSubs[challengeId]) {
                        this.measurementSubs[challengeId].unsubscribe();
                        delete this.measurementSubs[challengeId];
                    }
                })
            );




}