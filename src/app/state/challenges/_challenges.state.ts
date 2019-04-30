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
    }
}