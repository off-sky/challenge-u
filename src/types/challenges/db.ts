import * as common from './common';
import { db as userDb } from '../users/db';
import { Option } from '../common';

export module db {

    export interface ChallengeObj {
        id: string;
        name: string;
        owner_id: string;
        description?: string;
        type: common.ChallengeType;
        created_at: number;
    }

    export interface ChallengeParticipants {
        [userId: string]: string;
    }

    export interface ChallengesByUser {
        [challengeId: string]: ChallengeByUserObj;
    }

    export interface ChallengeByUserObj {
        id: string;
        created_at: number;
    }


    export interface CommonChallengeDay {
        timestamp: number;
    }

    export interface CommonChallengeDays {
       [id: string]: CommonChallengeDay;
    }

    export interface UserChallengeDay {
        timestamp: number;
        requirements?: Requirements;
        measurements?: Measurements;
        additional: AdditionalDayInfo;
    }

    export interface AdditionalDayInfo {
        comment: string;
    }

    export interface UserChallengeDayMap {
        [userId: string]: UserChallengeDays;
    }

    export interface UserChallengeDays {
        [dayId: string]: UserChallengeDay;
    }

    export interface ChallengeRequirements {
        [dayId: string]: Requirements;
    }

    export interface Requirements {
        [id: string]: RequirementObj;
    }

    export interface RequirementObj {
        display_name: string;
        category?: string;
        completed?: boolean;
    }


    export interface Measurements {
        [id: string]: MeasurementObj;
    }


    export interface MeasurementObj {
        id: string;
        formula?: {
            [id: string]: Option;
        };
        order_no: number;
        display_name: string;
        category: string;
        type: 'number' | 'string' | 'boolean' | 'combine';
        value?: number | string | boolean;
    }

    export interface MeasurementPreset {
        name: string;
        measurements: Measurements;
        created_at: number;
    }

    export interface MeasurementPresets {
        [id: string]: MeasurementPreset;
    }


    export interface ChallengeDetails {
        challenge: ChallengeObj;
        common_days: CommonChallengeDays;
        users_days: {
            [user_id: string]: UserChallengeDays;
        };
        common_measurements: Measurements;
        days_requirements: ChallengeRequirements;
        participants: userDb.UserLike[];
    }


    export interface ActivityDetails {
        
    }

}