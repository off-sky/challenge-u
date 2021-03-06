import { Requirement } from "./requirement";
import { Measurement } from "./measurement";
import { DayShowUpRequest } from './day-show-up-request';
import { MeasurementList } from './measurement-list';

/**
 * This class represents activity on a single challenge day
 * (month or year)
*/
export interface Activity {
    id: string;
    userId: string;
    challengeId: string;
    displayLabel: string;
    measurements: MeasurementList;
    isShowUp: boolean;
    isActive: boolean;
    isFuture: boolean;
    getShowUpRequest(): DayShowUpRequest;
    clone(): Activity;
}