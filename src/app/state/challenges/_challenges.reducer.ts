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

        default: return newState;
    }
}