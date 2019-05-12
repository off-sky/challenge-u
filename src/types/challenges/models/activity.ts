import { Activity as iActivity } from '../activity';
import { db as challDb } from '../db';
import { Measurement } from '../measurement';
import { Measurement as MeasurementModel } from './measurement';
import { CombinedMeasurement } from './combined-measurement';
import * as challCommon from '../common';
import * as moment from 'moment';
import { DayShowUpRequest } from '../day-show-up-request';
import { FormGroup, FormControl } from '@angular/forms';
import { startWith } from 'rxjs/operators';

export class Activity implements iActivity {
    id: string;
    challengeId: string;
    isFuture: boolean;
    isShowUp: boolean;
    isActive: boolean = false;
    displayLabel: string;
    measurements: Measurement[];
    userId: string;
    

    constructor(
        userId: string,
        challengeId: string,
        private ts: number,
        private type: challCommon.ChallengeType,
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
        this.measurements = this.getMeasurements(measurementsDb);
    }

    public clone(): Activity {
        return new Activity(
            this.userId,
            this.challengeId,
            this.ts,
            this.type,
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



    private getMeasurements(measDbObj: challDb.Measurements): Measurement[] {
        if (measDbObj) {
            const measMap = {} as { [id: string]: MeasurementModel |  CombinedMeasurement };
            const measKeys = Object.keys(measDbObj);
            measKeys.forEach(mKey => {
                const measDb = measDbObj[mKey];
                if (measDb.type !== 'combine') {
                    const meas = new MeasurementModel(mKey, measDb);
                    measMap[mKey] = meas;
                } else {
                    const meas = new CombinedMeasurement(mKey, measDb);
                    measMap[mKey] = meas;
                }
            })
            measKeys.forEach(mKey => {
                const meas = measMap[mKey];
                if (meas.type === 'combine') {
                    const measC = meas as CombinedMeasurement;
                    const formGroupObj = {};
                    measC.formula.forEach(option => {
                        if (option.metadata === 'measurement') {
                            const fc = new FormControl();
                            measMap[option.value].formControl.valueChanges
                                .pipe(startWith(measMap[option.value].formControl.value))
                                .subscribe(val => fc.setValue(val));
                            formGroupObj[option.value] = fc;
                        }
                    });
                    measC.setFormGroup(new FormGroup(formGroupObj));
                }
            });

            const res = Object.keys(measMap).map(id => measMap[id]);
            res.sort((a, b) => a.orderNo - b.orderNo);
            return res;
        }
        return [];
    }
}