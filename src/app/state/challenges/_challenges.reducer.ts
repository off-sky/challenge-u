import { ChallengesState, challengesInitialState } from './_challenges.state';
import { YAction } from 'src/types/store';
import { clgu } from 'src/types';
import { ChallengesActions } from './_challenges.actions';
import { ChallengesDbActions } from './_challenges.db.actions';
import { UpdatableDataObject } from 'src/types/common';

export function challengesReducer(state: ChallengesState = challengesInitialState, action: YAction<any>): ChallengesState {
    const newState = challengesDbReducer(state, action) as ChallengesState;

    switch(action.type) {
        case ChallengesActions.CREATE_CHALLENGE: {
            newState.create.isLoading = true;
            return newState;
        }

        case ChallengesActions.CREATE_CHALLENGE_SUCCESS: {
            newState.create.isLoading = false;
            return newState;
        }

        case ChallengesActions.CREATE_CHALLENGE_FAIL: {
            newState.create.isLoading = false;
            newState.create.error = action.payload;
            return newState;
        }

        case ChallengesActions.FETCH_MEASUREMENT_PRESETS_SUCCESS: {
            const payload = action.payload as clgu.common.DataWithId;
            newState.challengesMeasurementsPresets[payload.id] = 
                new clgu.common.UpdatableDataObject(null, payload.data);
            return newState;
        }

        case ChallengesActions.GET_CHALLENGE_DETAILS: {
            newState.details.isLoading = true;
            return newState;
        }

        case ChallengesActions.GET_CHALLENGE_DETAILS_IF_EMPTY_SUCCESS: {
            newState.details.isLoading = false;
            return newState;
        }

        case ChallengesActions.GET_CHALLENGE_DETAILS_IF_EMPTY_FAIL: {
            const error= action.payload as clgu.common.ErrorWithId;
            newState.details.isLoading = false;
            newState.details.error = error.error;
            return newState;
        }

        case ChallengesActions.RELOAD_CATEGORIES_SUCCESS: {
            const res = action.payload as clgu.common.DataWithId;
            newState.challengesCategories[res.id] = new UpdatableDataObject<{ [id: string]: string}>(res.id, res.data);
            return newState;
        }


        case ChallengesActions.SHOW_UP_DATE: {
            const payload = action.payload as clgu.challenges.DayShowUpRequest;
            newState.showUp[payload.dayId] = {
                isLoading: true,
                error: null
            }
            return newState;
        }

        case ChallengesActions.SHOW_UP_DATE_SUCCESS: {
            const payload: string = action.payload;
            newState.showUp[payload] = {
                isLoading: false,
                error: null
            }
            return newState;
        }


        case ChallengesActions.SHOW_UP_DATE_FAIL: {
            const payload: clgu.common.ErrorWithId = action.payload;
            newState.showUp[payload.id] = {
                isLoading: false,
                error: payload.error
            }
            return newState;
        }

        default: return newState;
    }
}

/**
 * Reducer for db actions
 */
function challengesDbReducer(state: ChallengesState, action: YAction<any>): ChallengesState {
    const newState = clgu.utils.cloneDeep(state) as ChallengesState;

    switch(action.type) {
    
        /**
         * Basic info
         */
        case ChallengesDbActions.RELOAD_CHALLENGE_BASIC_INFO: {
            const payload = action.payload as clgu.common.ReloadInfoRequest;
            if (payload.force) {
                payload.ids.forEach(id => {
                    delete newState.challengeBasicInfo[id];
                });
            }
            return newState;
        }

        case ChallengesDbActions.RELOAD_CHALLENGE_BASIC_INFO_SUCCESS:
        case ChallengesDbActions.RELOAD_CHALLENGE_BASIC_INFO_FAIL: {
            const payload = action.payload as clgu.common.UpdatableDataObject<clgu.challenges.db.ChallengeObj>;
            newState.challengeBasicInfo[payload.id] = payload;
        }

        /**
         * Common challenge days
         */
        case ChallengesDbActions.RELOAD_CHALLENGE_DATES: {
            const payload = action.payload as clgu.common.ReloadInfoRequest;
            if (payload.force) {
                payload.ids.forEach(id => {
                    delete newState.challengesDates[id];
                });
            }
            return newState;
        }

        case ChallengesDbActions.RELOAD_CHALLENGE_DATES_SUCCESS:
        case ChallengesDbActions.RELOAD_CHALLENGE_DATES_FAIL: {
            const payload = action.payload as clgu.common.UpdatableDataObject<clgu.challenges.db.CommonChallengeDays>;
            newState.challengesDates[payload.id] = payload;
        }

        /**
         * Participants
         */
        case ChallengesDbActions.RELOAD_CHALLENGE_PARTICIPANTS: {
            const payload = action.payload as clgu.common.ReloadInfoRequest;
            if (payload.force) {
                payload.ids.forEach(id => {
                    delete newState.challengesParticipants[id];
                });
            }
            return newState;
        }

        case ChallengesDbActions.RELOAD_CHALLENGE_PARTICIPANTS_SUCCESS:
        case ChallengesDbActions.RELOAD_CHALLENGE_PARTICIPANTS_FAIL: {
            const payload = action.payload as clgu.common.UpdatableDataObject<clgu.challenges.db.ChallengeParticipants>;
            newState.challengesParticipants[payload.id] = payload;
        }

        /**
         * Challenge dates by user
         */
        case ChallengesDbActions.RELOAD_USER_CHALLENGE_DATES: {
            const payload = action.payload as clgu.common.ReloadInfoRequest;
            if (payload.force) {
                payload.ids.forEach(id => {
                    delete newState.userChallengeDates[id];
                });
            }
            return newState;
        }

        case ChallengesDbActions.RELOAD_USER_CHALLENGE_DATES_SUCCESS:
        case ChallengesDbActions.RELOAD_USER_CHALLENGE_DATES_FAIL: {
            const payload = action.payload as clgu.common.UpdatableDataObject<clgu.challenges.db.UserChallengeDayMap>;
            newState.userChallengeDates[payload.id] = payload;
        }

        /**
         * Challenges by user
         */
        case ChallengesDbActions.RELOAD_USER_CHALLENGES: {
            const payload = action.payload as clgu.common.ReloadInfoRequest;
            if (payload.force) {
                payload.ids.forEach(id => {
                    delete newState.usersChallenges[id];
                });
            }
            return newState;
        }

        case ChallengesDbActions.RELOAD_USER_CHALLENGES_SUCCESS:
        case ChallengesDbActions.RELOAD_USER_CHALLENGES_FAIL: {
            const payload = action.payload as clgu.common.UpdatableDataObject<clgu.challenges.db.ChallengesByUser>;
            newState.usersChallenges[payload.id] = payload;
        }


        /**
         * Measurements
         */
        case ChallengesDbActions.RELOAD_CHALLENGES_MEASUREMENTS: {
            const payload = action.payload as clgu.common.ReloadInfoRequest;
            if (payload.force) {
                payload.ids.forEach(id => {
                    delete newState.challengesMeasurements[id];
                });
            }
            return newState;
        }

        case ChallengesDbActions.RELOAD_CHALLENGES_MEASUREMENTS_SUCCESS:
        case ChallengesDbActions.RELOAD_CHALLENGES_MEASUREMENTS_FAIL: {
            const payload = action.payload as clgu.challenges.ReloadMeasurementResult;
            if (!newState.challengesMeasurements[payload.challengeId]) {
                newState.challengesMeasurements[payload.challengeId] = {};
            }
            if (!newState.challengesMeasurements[payload.challengeId][payload.dayId]) {
                newState.challengesMeasurements[payload.challengeId][payload.dayId] = {}
            }
        
            newState.challengesMeasurements[payload.challengeId][payload.dayId][payload.userId] =
                new clgu.common.UpdatableDataObject<clgu.challenges.db.Measurements>(null, payload.measurements);

            return newState;
        }

        default: return newState;
    }
}