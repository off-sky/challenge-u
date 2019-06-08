import { CreateChallengeSchedule as iCreateChallengeSchedule } from '../create-challenge-schedule';
import * as common from '../common';
import * as appCommon from '../../common';
import * as moment from 'moment';
import { BehaviorSubject, Observable } from 'rxjs';

export class CreateChallengeSchedule implements iCreateChallengeSchedule {

    private _type: common.ChallengeType;
    private _fillRule: common.FillRuleType;
    private _startMoment: moment.Moment;
    private _endMoment: moment.Moment;
    private _scheduleEmitter: BehaviorSubject<Date[]> = new BehaviorSubject<Date[]>([]);

    // weekday indices
    private _dayOffIndexes = {
        0: true,
        6: true
    };

    // weekday indices
    private _limitDaysTo: any = {}

    // date stamps, include all if empty
    private _limitDatesTo: any;

    constructor(startDate: Date, endDate: Date, type: common.ChallengeType, fillRule: common.FillRuleType) {
        this._startMoment = moment(startDate);
        this._endMoment = moment(endDate);
        this._type = type;
        this._fillRule = fillRule;
        // this.emitNewSchedule();
    }

    limitDatesTo(dd: Date[]): void {
        if (dd) {
            this._limitDatesTo = {};
            dd.forEach(d => this._limitDatesTo[d.getTime()] = true);
        }
    }

    setDates(dd: Date[]): void {
       
    }

    setStartDate(d: Date): void {
        this._startMoment = this.getStartMoment(moment(d));
        this.emitNewSchedule();
    }
    setEndDate(d: Date): void {
        this._endMoment = this.getStartMoment(moment(d));
        this.emitNewSchedule();
    }
    setType(t: common.ChallengeType): void {
        this._type = t;
        this.emitNewSchedule();
    }
    setFillRule(fr: common.FillRuleOption): void {
      this._fillRule = fr.value;
      if (fr.weekDays) {
        this._limitDaysTo = fr.weekDays;
      }
      this.emitNewSchedule();
    }

    schedule(): Observable<Date[]> {
        return new Observable(observer => {
            const sub = this._scheduleEmitter.subscribe(dd => observer.next(dd));

            return () => sub.unsubscribe();
        });
    }


    private emitNewSchedule(): void {

        const result = [];
        if (!this._endMoment || !this._fillRule || !this._startMoment || !this._type) {
            return;
        }

        if (this._fillRule === 'custom') {
            return;
        }

        const incr = this.getIncrement();
        let counter = 0;

        for(let curr = this.getStartMoment(this._startMoment); curr.isSameOrBefore(this._endMoment); curr = moment(curr.add(1, incr))) {
            if (this._type === 'daily' && !this.shouldIncludeDay(curr)) {
                continue;
            }
            if (this._type === 'monthly' && !this.shouldIncludeMonth(curr)) {
                continue;
            }
            if (this._type === 'yearly' && !this.shouldIncludeYear(curr)) {
                continue;
            }
            result.push(moment(curr).toDate());
            counter++;
            if (counter >= appCommon.MAX_ACTIVITIES) {
                this._startMoment = this.getStartMoment(curr);
                break;
            }
        }

        this._scheduleEmitter.next(result);

    }


    private getStartMoment(sm: moment.Moment): moment.Moment {
        if (this._type === 'daily') {
            return moment(sm).startOf('day');
        }
        if (this._type === 'monthly') {
            return moment(sm).startOf('month');
        }
        if (this._type === 'yearly') {
            return moment(sm).startOf('year');
        }
    }


    private shouldIncludeDay(m: moment.Moment): boolean {
        if (this._fillRule === 'working_days') {
            return this.isDateInLimits(m) && this._dayOffIndexes[m.weekday()] === undefined;
        }
        if (this._fillRule === 'specific') {
            return this.isDateInLimits(m) && this._limitDaysTo[m.weekday()];
        }

        return this.isDateInLimits(m);
    }

    private isDateInLimits(m: moment.Moment) {
        if (!this._limitDatesTo) {
            return true;
        }
        return !!this._limitDatesTo[m.toDate().getTime()];
    }

    private shouldIncludeMonth(m: moment.Moment): boolean {
        return true;
    }

    private shouldIncludeYear(m: moment.Moment): boolean {
        return true;
    }


    private getIncrement(): moment.unitOfTime.DurationConstructor {
        if (this._type === 'daily') {
            return 'd'
        }
        if (this._type === 'monthly') {
            return 'month'
        }
        if (this._type === 'yearly') {
            return 'y'
        }
    }



}