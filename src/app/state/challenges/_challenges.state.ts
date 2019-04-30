import { clgu } from 'src/types';

export interface ChallengesState {
    list: {
        isLoading: boolean;
        error: clgu.common.Error;
        items: any[];
    };
    create: {
        isLoading: boolean;
        error: clgu.common.Error;
    };
    details: {
        [id: string]: {
            isLoading: boolean;
            error: clgu.common.Error;
            item: clgu.challenges.Challenge;
        }
    };
    showUp: {
        [dayId: string]: {
            isLoading: boolean;
            error: clgu.common.Error;
        }
    }
}


export const challengesInitialState: ChallengesState = {
    list: {
        isLoading: false,
        error: null,
        items: []
    },
    create: {
        isLoading: false,
        error: null
    },
    details: {
    },
    showUp: {}
}