import { Requirement } from "./requirement";
import { Measurement } from "./measurement";

/**
 * This class represents activity on a single challenge day
 * (month or year)
*/
export interface Activity {
    displayLabel: string;
    requirements: Requirement[];
    measurements: Measurement[];
}