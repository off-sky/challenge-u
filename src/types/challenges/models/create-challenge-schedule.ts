import { CreateChallengeSchedule as iCreateChallengeSchedule } from '../create-challenge-schedule';
import * as common from '../common';
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
    private _limitDaysTo = {

    }

    constructor(startDate: Date, endDate: Date, type: common.ChallengeType, fillRule: common.FillRuleType) {
        this._startMoment = moment(startDate);
        this._endMoment = moment(endDate);
        this._type = type;
        this._fillRule = fillRule;
        this.emitNewSchedule();
    }

    setDates(dd: Date[]): void {

    }

    setStartDate(d: Date): void {
        this._startMoment = moment(d);
        this.emitNewSchedule();
    }
    setEndDate(d: Date): void {
        this._endMoment = moment(d);
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

        for(let curr = this.getStartMoment(); curr.isSameOrBefore(this._endMoment); curr = moment(curr.add(1, incr))) {
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
        }

        this._scheduleEmitter.next(result);

    }


    private getStartMoment(): moment.Moment {
        if (this._type === 'daily') {
            return moment(this._startMoment);
        }
        if (this._type === 'monthly') {
            return moment(this._startMoment).startOf('month');
        }
        
        if (this._type === 'yearly') {
            return moment(this._startMoment).startOf('year');
        }
    }


    private shouldIncludeDay(m: moment.Moment): boolean {
        if (this._fillRule === 'working_days') {
            return this._dayOffIndexes[m.weekday()] === undefined;
        }
        if (this._fillRule === 'specific') {
            return this._limitDaysTo[m.weekday()];
        }

        return true;
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