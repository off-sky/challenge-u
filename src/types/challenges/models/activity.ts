import { Activity as iActivity } from '../activity';
import { db as challDb } from '../db';
import { Requirement } from '../requirement';
import { Requirement as RequirementModel } from './requirement';
import { Measurement } from '../measurement';
import { Measurement as MeasurementModel } from './measurement';
import * as challCommon from '../common';
import * as moment from 'moment';
import { DayShowUpRequest } from '../day-show-up-request';

export class Activity implements iActivity {
    id: string;
    challengeId: string;
    isFuture: boolean;
    isShowUp: boolean;
    isActive: boolean = false;
    displayLabel: string;
    requirements: Requirement[];
    measurements: Measurement[];
    userId: string;
    

    constructor(
        userId: string,
        challengeId: string,
        private ts: number,
        private type: challCommon.ChallengeType,
        private requirementsDb: challDb.Requirements,
        private measurementsDb: challDb.Measurements,
        isShowUp: boolean
    ) {
        this.id = '' + ts;
        this.userId = userId;
        this.challengeId = challengeId;
        this.displayLabel = this.getDisplayLabel(ts, type);
        this.isShowUp = isShowUp;
        this.isFuture = this.getIsFuture(ts, type);
        if (!this.isShowUp) {
            this.isActive = this.getIsActive(ts, type);
        }
        this.requirements = this.getRequirements(requirementsDb);
        this.measurements = this.getMeasurements(measurementsDb);
    }

    public clone(): Activity {
        return new Activity(
            this.userId,
            this.challengeId,
            this.ts,
            this.type,
            this.requirementsDb,
            this.measurementsDb,
            this.isShowUp
        );
    }

    public getShowUpRequest(): DayShowUpRequest {
        const res = {
            challengeId: this.challengeId,
            userId: this.userId,
            dayId: this.id,
        } as DayShowUpRequest;

        if (this.requirements && this.requirements.length > 0) {
            const requirements = {};
            this.requirements.forEach((r: RequirementModel) =>  {
                requirements[r.id] = r.getDbObj();
            });
            res.requirements = requirements;
        }

        const filledMeasurements = this.measurements ? this.measurements.filter(m => m.filled) : [];
        if (filledMeasurements.length > 0) {
            const measurements = {};
            filledMeasurements.forEach((m: MeasurementModel) => {
                measurements[m.id] = m.getDbObj();
            });
            res.measurements = measurements;
        }
       
        return res;
    }

    private getDisplayLabel(ts: number, type: challCommon.ChallengeType): string {
        switch(type) {
            case 'daily': {
                return moment(ts).format('ddd MMM DD, YYYY');
            }
            case 'monthly': {
                return moment(ts).format('MMM YYYY');
            }
            case 'yearly': {
                return moment(ts).format('YYYY');
            }
        }
    }


    private getIsActive(ts: number, type: challCommon.ChallengeType): boolean {
        const today = moment();
        const dayMoment = moment(ts);
        switch(type) {
            case 'daily': {
                return today.isSame(dayMoment, 'day');
            }
            case 'monthly': {
                return today.isSame(dayMoment, 'month');
            }
            case 'yearly': {
                return today.isSame(dayMoment, 'year');
            }
        }
    }


    private getIsFuture(ts: number, type: challCommon.ChallengeType): boolean {
        const today = moment();
        const dayMoment = moment(ts);
        switch(type) {
            case 'daily': {
                return today.isBefore(dayMoment, 'day');
            }
            case 'monthly': {
                return today.isBefore(dayMoment, 'month');
            }
            case 'yearly': {
                return today.isBefore(dayMoment, 'year');
            }
        }
    }


    private getRequirements(reqDbObj: challDb.Requirements): Requirement[] {
        if (reqDbObj) {
            return Object.keys(reqDbObj)
                .map(reqId => new RequirementModel(reqId, reqDbObj[reqId]))
        }
        return [];
    }


    private getMeasurements(measDbObj: challDb.Measurements): Measurement[] {
        if (measDbObj) {
            return Object.keys(measDbObj)
                .map(measId => new MeasurementModel(measId, measDbObj[measId]));
        }
        return [];
    }
}