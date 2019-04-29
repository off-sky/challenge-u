import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { clgu } from 'src/types';
import { startWith, tap, take } from 'rxjs/operators';
import { MonthSelectorComponent } from 'src/app/shared/components/date-selector/month-selector.component';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { ChallengesActions } from 'src/app/state/challenges/_challenges.actions';


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
  public shouldTrackMeasurements: FormControl;
  public measurementFormArray: FormArray;

  public selectedDates: Date[];
  public shouldTrackProgress: boolean = false;
  public fillRuleOptions: clgu.challenges.common.FillRuleOption[] = [];
  public currentFillRule: clgu.challenges.common.FillRuleType;

  private scheduler: clgu.challenges.models.CreateChallengeSchedule;


  @ViewChild('dateSelector') private monthSelectorCmp: MonthSelectorComponent;



  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.initForm();
  }

  public onDatesChanged(newDates: Date[]): void {
    this.selectedDates = newDates;
    this.fillRuleControl.setValue('custom');
  }


  public onSubmit(): void {
    const formValue = this.fg.value;
    // console.log('>>>>> Challenge:');
    // console.log(formValue);
    // console.log('>>>>> Dates:');
    // console.log(this.selectedDates.map(d => d.toLocaleString()));

    this.store.select(state => state.auth.authCheck.user.id)
      .pipe(
        take(1)
      )
      .subscribe(userId => {
          this.store.dispatch(new ChallengesActions.CreateChallenge({
            ownerId: userId,
            participants: formValue.participants.map(user => user.id),
            schedule: this.selectedDates.map(d => d.getTime()),
            name: formValue.name,
            description: formValue.description,
            measurements: formValue.measurements.shouldTrack ? formValue.measurements.items : null,
            type: formValue.type
          }));
      })
   
  }


  private initForm(): void {
    const today = new Date();
    const inAWeek = new Date(today.getTime() + 789389800);
    this.scheduler = new clgu.challenges.models.CreateChallengeSchedule(today, inAWeek, 'daily', 'every_day');
    this.nameControl = new FormControl(null, [ Validators.required ]);
    this.startDateControl = new FormControl(today, [ Validators.required ]);
    this.endDateControl = new FormControl(inAWeek, [Validators.required]);
    this.typeControl = new FormControl('daily', [ Validators.required ]);
    this.fillRuleControl = new FormControl('every_day', [ Validators.required ]);
    this.descriptionControl = new FormControl();
    this.participantsControl = new FormControl([], Validators.required);
    this.selectedDatesControl = new FormControl([]);
    this.measurementFormArray = new FormArray([
      new FormGroup({
        displayName: new FormControl(null, [ Validators.required ]),
        type: new FormControl('number')
      })
    ]);
    this.shouldTrackMeasurements = new FormControl(false);

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
    });


    this.fg = new FormGroup({
      name: this.nameControl,
      startDate: this.startDateControl,
      endDate: this.endDateControl,
      type: this.typeControl,
      fillRule: this.fillRuleFg,
      description: this.descriptionControl,
      measurements: new FormGroup({
        shouldTrack: this.shouldTrackMeasurements,
        items: this.measurementFormArray,
      }),
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
            if (this.monthSelectorCmp) {
              this.monthSelectorCmp.setDates(this.selectedDates);
            }
          });
  }

}
