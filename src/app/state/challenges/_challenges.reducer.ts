import { ChallengesState, challengesInitialState } from './_challenges.state';
import { YAction } from 'src/types/store';
import { clgu } from 'src/types';
import { ChallengesActions } from './_challenges.actions';

export function challengesReducer(state: ChallengesState = challengesInitialState, action: YAction<any>): ChallengesState {
    const newState = clgu.utils.cloneDeep(state) as ChallengesState;

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

        case ChallengesActions.FETCH_REQUIREMENT_PRESETS_SUCCESS: {
            newState.requirementPresets = action.payload;
        }

        case ChallengesActions.GET_CHALLENGE_DETAILS_IF_EMPTY: {
            const challengeId = action.payload;
            if (!newState.details[challengeId]) {
                newState.details[challengeId] = {
                    isLoading: true,
                    error: null,
                    item: null
                }
            }
            newState.details[challengeId].isLoading = true;
            return newState;
        }


        case ChallengesActions.GET_CHALLENGE_DETAILS_IF_EMPTY_SUCCESS: {
            const challenge = action.payload as clgu.challenges.Challenge;
            newState.details[challenge.id].item = challenge;
            newState.details[challenge.id].isLoading = false;
            return newState;
        }

        case ChallengesActions.GET_CHALLENGE_DETAILS_IF_EMPTY_FAIL: {
            const error= action.payload as clgu.common.ErrorWithId;
            newState.details[error.id].isLoading = false;
            newState.details[error.id].error = error.error;
            return newState;
        }


        case ChallengesActions.SAVE_CHALLENGE_LIST: {
            newState.list.items = action.payload;
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