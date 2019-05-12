import { Measurement } from './measurement';

export interface EditMeasurementsRequest {
    challengeId: string;
    userIds: string[];
    stamps: number[];
    measurements: Measurement[];
}