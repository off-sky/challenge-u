import { db } from './db';

export interface DayShowUpRequest {
    challengeId: string;
    userId: string;
    dayId: string;
    requirements: db.Requirements;
    measurements: db.Measurements;
}