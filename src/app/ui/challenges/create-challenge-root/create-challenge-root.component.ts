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

  /**
   * Form
   */
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

  
  /**
   * Steps
   */
  public Steps = clgu.challenges.common.CreateChallengeSteps;
  public currentStep = this.Steps.GENERAL;




  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.initForm();
  }


  public onNextStep(): void {
    if (this.currentStep !== this.Steps.LAST) {
      this.currentStep++;
    } else {
      this.onSubmit();
    }
  }

  public goToStep(ind: clgu.challenges.common.CreateChallengeSteps): void {
      this.currentStep = ind;
  }

  public get nextButtonText(): string {
    if (!this.Steps) {
      return 'Next';
    }
    if (this.currentStep === this.Steps.LAST) {
      return 'Create';
    }
    return 'Next';
  }

  public onPreviousStep(): void {
    if (this.currentStep !== this.Steps.FIRST) {
      this.currentStep--;
    }
  }



  public onSubmit(): void {
    if (!this.fg.valid) {
      console.log(this.fg);
      return;
    }
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
            schedule: this.selectedDatesControl.value.map(d => d.getTime()),
            name: formValue.name,
            description: formValue.description,
            measurements: formValue.measurements.shouldTrack ? formValue.measurements.items : null,
            type: formValue.type
          }));
      });
   
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
    this.selectedDatesControl = new FormControl([], Validators.required );
    this.measurementFormArray = new FormArray([
    ]);
    this.shouldTrackMeasurements = new FormControl(false);

    this.shouldTrackMeasurements.valueChanges
      .subscribe(val => {
        if (val) {
          this.measurementFormArray = new FormArray([
            new FormGroup({
              displayName: new FormControl(null, [ Validators.required ]),
              type: new FormControl('number')
            })
          ]);
          const fg: FormGroup = this.fg.get('measurements') as FormGroup;
          fg.setControl('items', this.measurementFormArray);
        } else {
          this.measurementFormArray = new FormArray([]);
          const fg: FormGroup = this.fg.get('measurements') as FormGroup;
          fg.setControl('items', this.measurementFormArray);
        }
      });

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

  }

}
