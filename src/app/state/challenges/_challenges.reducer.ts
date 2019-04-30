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

        default: return newState;
    }
}