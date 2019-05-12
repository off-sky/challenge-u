import { db } from './db';

export interface ReloadMeasurementsRequest {
    challengeId: string;
    dayId: string;
    userId: string;
}


export interface ReloadMeasurementResult {
    challengeId: string;
    dayId: string;
    userId: string;
    measurements: db.Measurements;
}