import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { clgu } from 'src/types';
import { startWith, tap } from 'rxjs/operators';

@Component({
  selector: 'y-create-challenge-root',
  templateUrl: './create-challenge-root.component.html',
  styleUrls: ['./create-challenge-root.component.scss']
})
export class CreateChallengeRootComponent implements OnInit {

  public fg: FormGroup;
  public fillRuleFg: FormGroup;
  public weekDayFg: FormGroup;
  public nameControl: FormControl;
  public startDateControl: FormControl;
  public endDateControl: FormControl;
  public typeControl: FormControl;
  public fillRuleControl: FormControl;
  public descriptionControl: FormControl;
  public participantsControl: FormControl;
  public selectedDatesControl: FormControl;

  public selectedDates: Date[];
  public fillRuleOptions: clgu.challenges.common.FillRuleOption[] = [];
  public currentFillRule: clgu.challenges.common.FillRuleType;

  private scheduler = new clgu.challenges.models.CreateChallengeSchedule();



  constructor() { }

  ngOnInit() {
    this.initForm();
  }


  private initForm(): void {
    const today = new Date();
    const inAWeek = new Date(today.getTime() + 789389800);
    this.nameControl = new FormControl(null, [ Validators.required ]);
    this.startDateControl = new FormControl(today, [ Validators.required ]);
    this.endDateControl = new FormControl(inAWeek, [Validators.required]);
    this.typeControl = new FormControl('daily', [ Validators.required ]);
    this.fillRuleControl = new FormControl('every_day', [ Validators.required ]);
    this.descriptionControl = new FormControl();
    this.participantsControl = new FormControl([], Validators.required);
    this.selectedDatesControl = new FormControl([]);

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
        value:  this.fillRuleControl,
        weekDays: this.weekDayFg
    })

    this.fg = new FormGroup({
      name: this.nameControl,
      startDate: this.startDateControl,
      endDate: this.endDateControl,
      type: this.typeControl,
      fillRule: this.fillRuleFg,
      description: this.descriptionControl,
      participants: this.participantsControl,
      selectedDates: this.selectedDatesControl
    });


    this.fg.get('startDate').valueChanges
      .pipe(
        startWith(this.startDateControl.value)
      )
      .subscribe(d => this.scheduler.setStartDate(d));

    this.endDateControl.valueChanges
      .pipe(
        startWith(this.endDateControl.value)
      )
      .subscribe(d => this.scheduler.setEndDate(d));

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
            this.selectedDates = dates;
          });
  }

}
