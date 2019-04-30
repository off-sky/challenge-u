import * as common from './common';
import { db as userDb } from '../users/db';

export module db {

    export interface ChallengeObj {
        id: string;
        name: string;
        owner_id: string;
        description?: string;
        type: common.ChallengeType;
        created_at: number;
    }


    export interface ChallengeByUserObj {
        id: string;
        created_at: number;
    }


    export interface CommonChallengeDay {
        timestamp: number;
        requirements?: {
            [id: string]: RequirementObj
        }
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

    export interface UserChallengeDays {
        [id: string]: UserChallengeDay;
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
        display_name: string;
        type: 'number' | 'string' | 'boolean';
        value?: number | string | boolean;
    }


    export interface ChallengeDetails {
        challenge: ChallengeObj;
        common_days: CommonChallengeDays;
        users_days: {
            [user_id: string]: UserChallengeDays;
        };
        common_measurements: Measurements;
        participants: userDb.UserLike[];
    }

}