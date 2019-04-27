import { Observable } from "rxjs";
import * as common from './common';

export interface CreateChallengeSchedule {
    add(d: Date): void;
    remove(d: Date): void;
    setType(t: common.ChallengeType): void;
    setFillRule(fr: common.FillRuleType): void;

    /**
     * Observable of UTC timestamps corresponding to activity times
    */
    schedule(): Observable<number[]>;
}