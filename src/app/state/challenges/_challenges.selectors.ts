import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, of } from 'rxjs';
import { clgu } from 'src/types';
import { distinctUntilKeyChanged, map, filter, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { UsersSelectors } from '../users/_users.selectors';
import { AuthSelectors } from '../auth/_auth.selectors';

export class ChallengesSelectors {

    public static readonly activity$ = function(store: Store<AppState>, challengeId: string, dayId: string, userId: string, wait?: boolean): Observable<clgu.challenges.Activity> {
        return combineLatest(
            ChallengesSelectors.basicChallengeInfo$(store, challengeId),
            ChallengesSelectors.usersChallengeDates$(store, challengeId),
            ChallengesSelectors.challengeMeasurements$(store, challengeId, dayId, userId, wait),
        )
        .pipe(
            map(vals => {
                const basicInfo = vals[0] as clgu.challenges.db.ChallengeObj;
                const userChalDays = vals[1] as clgu.challenges.db.UserChallengeDayMap;
                const measurements = vals[2] as clgu.challenges.db.Measurements;
                const ts = parseInt(dayId, 10);
                const type = basicInfo.type;
                const userDay = !!userChalDays && !!userChalDays[userId] ? userChalDays[userId][dayId] : null;
                const measurementsDb = !!userDay ? userDay.measurements : measurements;
                const isShowUp = !!userDay;
                return new clgu.challenges.models.Activity(
                    userId,
                    challengeId,
                    ts,
                    type,
                    measurementsDb,
                    isShowUp
                );
            })
        )
    }

    /**
     * wait - optional - if true, waits until all pieces of data arrive before first emit
     */
    public static readonly challengeDetails$ = function(store: Store<AppState>, challengeId: string, wait?: boolean): Observable<clgu.challenges.db.ChallengeDetails> {
        return combineLatest(
            ChallengesSelectors.basicChallengeInfo$(store, challengeId),
            ChallengesSelectors.commonChallengeDates$(store, challengeId),
            ChallengesSelectors.usersChallengeDates$(store, challengeId),
            of(null),
            of(null),
            ChallengesSelectors.challengeParticipantProfiles$(store, challengeId),
            AuthSelectors.currentUser$(store)
        )
        .pipe(
            map(vals => {
                const participants = vals[5];
                const currUser = vals[6];
                participants.sort((a, b) => {
                    if (a.id === currUser.id) { return -1 };
                    if (b.id === currUser.id) { return 1 };
                    return 0;
                })
                return vals;
            }),
            map((vals) => ({
                challenge: vals[0],
                common_days: vals[1],
                users_days: vals[2],
                common_measurements: vals[3],
                days_requirements: vals[4],
                participants: vals[5]
            }))
        )
    }


    public static readonly isMyChallenge$ = function(store: Store<AppState>, challengeId: string): Observable<boolean> {
        const userId$ = store.select(state => state.auth.authCheck.user)
            .pipe(
                filter(u => !!u),
                map(u => u.id)
            );

        const challengeOwnerId$ = ChallengesSelectors.basicChallengeInfo$(store, challengeId)
                .pipe(
                    map(challenge => challenge.owner_id)
                );

        return combineLatest(userId$, challengeOwnerId$)
                    .pipe(
                        map(vals => vals[0] === vals[1])
                    )
    }


    public static readonly listForCurrUser$ = function(store: Store<AppState>): Observable<clgu.challenges.db.ChallengeObj[]> {
        return store.select(state => state.auth.authCheck.user)
            .pipe(
                filter(user => !!user),
                map(u => u.id),
                distinctUntilChanged(),
                switchMap(userId => ChallengesSelectors.listByUser$(store, userId))
            )
    }


    public static readonly listByUser$ = function(store: Store<AppState>, userId: string): Observable<clgu.challenges.db.ChallengeObj[]> {
        return store.select(state => state.challenges.usersChallenges[userId])
            .pipe(
                filter(l => !!l),
                distinctUntilKeyChanged<clgu.common.UpdatableDataObject<any>>('lastUpdated'),
                switchMap((list: clgu.common.UpdatableDataObject<clgu.challenges.db.ChallengesByUser>) => {
                    const data = list.data;
                    if (data) {
                        const objArr = Object.keys(data)
                            .map(chId => data[chId]);
            
                        objArr.sort((a, b) => {
                            return a.created_at - b.created_at;
                        });
            
                        const obs = objArr.map(item => {
                            return ChallengesSelectors.basicChallengeInfo$(store, item.id)
                        });
            
                        return combineLatest(obs)
                    }
            
                    return of([])
                }),
        
            )
    }

    public static readonly basicChallengeInfo$ = function(store: Store<AppState>, challengeId: string): Observable<clgu.challenges.db.ChallengeObj> {
        return store.select(state => state.challenges.challengeBasicInfo[challengeId])
            .pipe(
                filter(udo => !!udo),
                distinctUntilKeyChanged<clgu.common.UpdatableDataObject<any>>('lastUpdated'),
                filter(udo =>!!udo.data),
                map(udo => udo.data)
            );
    }

    public static readonly commonChallengeDates$ = function(store: Store<AppState>, challengeId): Observable<clgu.challenges.db.CommonChallengeDays> {
        return store.select(state => state.challenges.challengesDates[challengeId])
            .pipe(
                filter(cd => !!cd),
                distinctUntilKeyChanged('lastUpdated'),
                filter(cd => !!cd.data),
                map(cd => cd.data)
            )
    }


    public static readonly usersChallengeDates$ = function(store: Store<AppState>, challengeId): Observable<clgu.challenges.db.UserChallengeDayMap> {
        return store.select(state => state.challenges.userChallengeDates[challengeId])
            .pipe(
                clgu.common.untilDataObjectChanged(),
                map(udo => !!udo ? udo.data : null)
            )
    }

    public static readonly challengeRequirements$ = function(store: Store<AppState>, challengeId): Observable<clgu.challenges.db.ChallengeRequirements> {
        return store.select(state => state.challenges.challengesRequirements[challengeId])
            .pipe(
                clgu.common.untilDataObjectChanged(),
                map(udo => !!udo ? udo.data : null)
            )
    }

    public static readonly challengeParticipants$ = function(store: Store<AppState>, challengeId: string): Observable<clgu.challenges.db.ChallengeParticipants> {
        return store.select(state => state.challenges.challengesParticipants[challengeId])
            .pipe(
                filter(udo => !!udo),
                clgu.common.untilDataObjectChanged(),
                map(udo => !!udo ? udo.data : null)
            )
    }

    public static readonly challengeParticipantProfiles$ = function(store: Store<AppState>, challengeId: string): Observable<clgu.users.db.UserLike[]> {
        return ChallengesSelectors.challengeParticipants$(store, challengeId)
            .pipe(
                filter(obj => !!obj),
                switchMap((challPartObj) => {
                    return UsersSelectors.userProfiles$(store, Object.keys(challPartObj))
                })
            )
    }

    public static readonly challengeMeasurements$ = function(store: Store<AppState>, challengeId: string, dayId: string, userId: string, wait?: boolean): Observable<clgu.challenges.db.Measurements> {
        return store.select(state => state.challenges.challengesMeasurements[challengeId])
            .pipe(
                map(byChall => {
                    if (!!byChall && !!byChall[dayId]) {
                        return byChall[dayId][userId]
                    }
                    return undefined;
                }),
                wait ? filter(udo => !!udo) : map(udo => udo),
                clgu.common.untilDataObjectChanged(),
                map(udo => !!udo ? udo.data : null)
            )
    }
}