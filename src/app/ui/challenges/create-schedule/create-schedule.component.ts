import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { clgu } from 'src/types';
import { startWith } from 'rxjs/operators';
import { MonthSelectorComponent } from 'src/app/shared/components/date-selector/month-selector.component';

@Component({
  selector: 'y-create-schedule',
  templateUrl: './create-schedule.component.html',
  styleUrls: ['./create-schedule.component.scss']
})
export class CreateScheduleComponent implements OnInit {

  @Input() public typeControl: FormControl;
  @Input() public startDateControl: FormControl;
  @Input() public endDateControl: FormControl;
  @Input() public selectedDatesControl: FormControl;
  @Input() public fillRuleFg: FormGroup;
  public currentFillRule: clgu.challenges.common.FillRuleType;

  public weekDayFg: FormGroup;
  public fillRuleControl: FormControl;
  public fillRuleOptions: clgu.challenges.common.FillRuleOption[] = [];

  private scheduler: clgu.challenges.models.CreateChallengeSchedule;

  @ViewChild('dateSelector') private monthSelectorCmp: MonthSelectorComponent;


  constructor() { }

  ngOnInit() {
    this.scheduler = new clgu.challenges.models.CreateChallengeSchedule(
      this.startDateControl.value,
      this.endDateControl.value,
      'daily',
      'every_day'
    );
    this.weekDayFg = this.fillRuleFg.get('weekDays') as FormGroup;
    this.fillRuleControl = this.fillRuleFg.get('value') as FormControl;

    this.typeControl.valueChanges
    .pipe(
      startWith(this.typeControl.value)
    )
    .subscribe(t => {
      this.fillRuleOptions = clgu.challenges.common.getFillRuleByType(t);
      if (this.fillRuleOptions && this.fillRuleOptions.length > 0) {
        this.fillRuleControl.setValue(this.fillRuleOptions[0].value);
      }
      this.scheduler.setType(t);
    });


    this.startDateControl.valueChanges
      .pipe(
        startWith(this.startDateControl.value)
      )
      .subscribe(d => this.scheduler.setStartDate(d));

    this.endDateControl.valueChanges
      .pipe(
        startWith(this.endDateControl.value)
      )
      .subscribe(d => this.scheduler.setEndDate(d));

   

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
            console.log('Schedule re-calculated:');
            console.log(dates);
            this.selectedDatesControl.setValue(dates);
            if (this.monthSelectorCmp) {
              this.monthSelectorCmp.setDates(dates);
            }
          });
  }


  public onDatesManuallyChanged(newDates: Date[]): void {
    this.fillRuleControl.setValue('custom');
  }

}
