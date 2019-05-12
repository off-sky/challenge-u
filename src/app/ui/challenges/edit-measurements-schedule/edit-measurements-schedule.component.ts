import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { clgu } from 'src/types';
import * as moment from 'moment';
import { startWith } from 'rxjs/operators';
import { MonthSelectorComponent } from 'src/app/shared/components/date-selector/month-selector.component';

@Component({
  selector: 'y-edit-measurements-schedule',
  templateUrl: './edit-measurements-schedule.component.html',
  styleUrls: ['./edit-measurements-schedule.component.scss']
})
export class EditMeasurementsScheduleComponent implements OnInit {

  @Input() public control: FormControl;
  @Input() public type: clgu.challenges.common.ChallengeType;
  @Input() public stamps: number[];

  public fillRuleOptions: clgu.challenges.common.FillRuleOption[];
  public allowed: moment.Moment[];
  public fillRuleFg: FormGroup;
  public weekDayFg: FormGroup;
  public scheduler:clgu.challenges.models.CreateChallengeSchedule;
  public currentFillRule: string;

  @ViewChild('dateSelector') private monthSelectorCmp: MonthSelectorComponent;

  constructor() { }

  ngOnInit() {
    this.scheduler = new clgu.challenges.models.CreateChallengeSchedule(
      new Date(this.stamps[0]),
      new Date(this.stamps[this.stamps.length - 1]),
      'daily',
      'every_day'
    );

    this.scheduler.limitDatesTo(this.stamps.map(s => new Date(s)));

    this.fillRuleOptions = clgu.challenges.common.getFillRuleByType(this.type);
    if (this.stamps) {
      this.allowed = this.stamps.map(s => moment(s));
    }

    this.weekDayFg = new FormGroup({
      0: new FormControl(false),
      1: new FormControl(false),
      2: new FormControl(false),
      3: new FormControl(false),
      4: new FormControl(false),
      5: new FormControl(false),
      6: new FormControl(false)
    });


    this.fillRuleFg = new FormGroup({
        value:  new FormControl('every_day', [ Validators.required ]),
        weekDays: this.weekDayFg
    });

    this.fillRuleFg.valueChanges
        .pipe(
          startWith(this.fillRuleFg.value)
        )
        .subscribe(fr => {
          this.currentFillRule = fr.value;
          this.scheduler.setFillRule(fr);
        });

    this.scheduler.schedule()
          .subscribe(dates => {
            this.control.setValue(dates);
            if (this.monthSelectorCmp) {
              this.monthSelectorCmp.setDates(dates);
            }
          });
  
  }

  public onDatesManuallyChanged(newDates: Date[]): void {
    this.fillRuleFg.get('value').setValue('custom');
  }
}
