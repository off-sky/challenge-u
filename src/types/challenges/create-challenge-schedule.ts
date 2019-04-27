import { Observable } from "rxjs";
import * as common from './common';

export interface CreateChallengeSchedule {
    setStartDate(d: Date): void;
    setEndDate(d: Date): void;
    setDates(dd: Date[]): void;
    setType(t: common.ChallengeType): void;
    setFillRule(fr: common.FillRuleOption): void;

    /**
     * Observable of Dates corresponding to activity times
    */
    schedule(): Observable<Date[]>;
}