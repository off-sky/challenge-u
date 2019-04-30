import { Activity as iActivity } from '../activity';
import { db as challDb } from '../db';
import { Requirement } from '../requirement';
import { Requirement as RequirementModel } from './requirement';
import { Measurement } from '../measurement';
import { Measurement as MeasurementModel } from './measurement';
import * as challCommon from '../common';
import * as moment from 'moment';

export class Activity implements iActivity {
    isFuture: boolean;
    isShowUp: boolean;
    isActive: boolean = false;
    displayLabel: string;
    requirements: Requirement[];
    measurements: Measurement[];
    userId: string;
    

    constructor(
        userId: string,
        ts: number,
        type: challCommon.ChallengeType,
        requirements: challDb.Requirements,
        measurements: challDb.Measurements,
        isShowUp: boolean
    ) {
        this.userId = userId;
        this.displayLabel = this.getDisplayLabel(ts, type);
        this.isShowUp = isShowUp;
        this.isFuture = this.getIsFuture(ts, type);
        if (!this.isShowUp) {
            this.isActive = this.getIsActive(ts, type);
        }
        this.requirements = this.getRequirements(requirements);
        this.measurements = this.getMeasurements(measurements);
    }


    private getDisplayLabel(ts: number, type: challCommon.ChallengeType): string {
        switch(type) {
            case 'daily': {
                return moment(ts).format('MMM DD, YYYY');
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