export type ChallengeType = 'daily' | 'weekly' | 'monthly' | 'yearly';

export type FillRuleType = 'every_day' | 'working_days' | 'specific' | 'every_week' |
                           'every_month' | 'every_year' | 'custom';

export interface FillRuleOption {
    value: FillRuleType,
    displayValue: string;
    weekDays?: { [ind: number]: boolean };
}


export enum CreateChallengeSteps {
    GENERAL,
    SCHEDULE,
    FRIENDS,
    // MEASUREMENTS,
    LAST = FRIENDS,
    FIRST = GENERAL
}


export enum EditChallengeSteps {
    GENERAL,
    SCHEDULE,
    FRIENDS,
    // MEASUREMENTS,
    LAST = FRIENDS,
    FIRST = GENERAL
}



                    
const fillRulesByTypes: { [id: string]: FillRuleOption[] } = {
    daily: [
        {
            value: 'every_day',
            displayValue: 'Every day'
        },
        {
            value: 'working_days',
            displayValue: 'On working days'
        },
        {
            value: 'specific',
            displayValue: 'On specific days',
            weekDays: {
                0: false,
                1: false,
                2: false,
                3: false,
                4: false,
                5: false,
                6: false
            }
        },
        {
            value: 'custom',
            displayValue: 'Custom'
        }
    ],
    monthly: [
        {
            value: 'every_month',
            displayValue: 'Every month'
        },
        {
            value: 'custom',
            displayValue: 'Custom'
        }
    ],
    yearly: [
        {
            value: 'every_year',
            displayValue: 'Every year'
        },
        {
            value: 'custom',
            displayValue: 'Custom'
        }
    ]
}


export function getFillRuleByType(t: ChallengeType): (FillRuleOption)[] {
    return fillRulesByTypes[t];
}