export module db {

    export type ChallengeType = 'daily' | 'weekly' | 'monthly' | 'yearly';

    export type FillRuleType = 'every' | 'specific';

    export interface Challenge {
        id: string;
        name: string;
        start_date: number;
        end_date: number;
    }

}