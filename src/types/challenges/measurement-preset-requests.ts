import { db } from './db';
import { MeasurementPreset } from './measurement-preset';

export interface MeasurementPresetSaveRequest {
    challengeId: string;
    preset: MeasurementPreset;
}


export interface MeasurementPresetGetRequest {
    challengeId: string;
}