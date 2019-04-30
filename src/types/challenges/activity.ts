import { Requirement } from "./requirement";
import { Measurement } from "./measurement";

/**
 * This class represents activity on a single challenge day
 * (month or year)
*/
export interface Activity {
    userId: string;
    displayLabel: string;
    requirements: Requirement[];
    measurements: Measurement[];
    isShowUp: boolean;
    isActive: boolean;
    isFuture: boolean;
}