import { clgu } from 'src/types';

export interface ChallengesState {
    /**
     * dbLike challenge info
     */
    challengeBasicInfo: {
        [challengeId: string]: clgu.common.UpdatableDataObject<clgu.challenges.db.ChallengeObj>;
    };
    challengesDates: {
        [challengeId: string]: clgu.common.UpdatableDataObject<clgu.challenges.db.CommonChallengeDays>;
    };
    challengesParticipants: {
        [challengeId: string]: clgu.common.UpdatableDataObject<{[id: string]: string}>;
    }
    userChallengeDates: {
        [challengeId: string]: clgu.common.UpdatableDataObject<clgu.challenges.db.UserChallengeDayMap>;
    };
    usersChallenges: {
        [userId: string]: clgu.common.UpdatableDataObject<clgu.challenges.db.ChallengesByUser>;
    }
    challengesMeasurements: {
        [challengeId: string]: clgu.common.UpdatableDataObject<clgu.challenges.db.Measurements>;
    };
    challengesRequirements: {
        [challengeId: string]: clgu.common.UpdatableDataObject<{ [dateId: string]: clgu.challenges.db.Requirements }>;
    };
    list: {
        isLoading: boolean;
        error: clgu.common.Error;
    };
    create: {
        isLoading: boolean;
        error: clgu.common.Error;
    };
    edit: {
        isLoading: boolean;
        error: clgu.common.Error;
    }
    details: {
        isLoading: boolean;
        error: clgu.common.Error;
    };

    requirementPresets: {
        [id: string]: clgu.challenges.db.Requirements;
    };
    showUp: {
        [dayId: string]: {
            isLoading: boolean;
            error: clgu.common.Error;
        }
    }
}


export const challengesInitialState: ChallengesState = {
    challengeBasicInfo: {},
    challengesDates: {},
    challengesParticipants: {},
    challengesRequirements: {},
    userChallengeDates: {},
    usersChallenges: {},
    challengesMeasurements: {},
    list: {
        isLoading: false,
        error: null
    },
    create: {
        isLoading: false,
        error: null
    },
    edit: {
        isLoading: false,
        error: null
    },
    details: {
        isLoading: false,
        error: null
    },
    requirementPresets: {},
    showUp: {}
}