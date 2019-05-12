import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { clgu } from 'src/types';
import { ChallengesSelectors } from 'src/app/state/challenges/_challenges.selectors';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { take, filter } from 'rxjs/operators';
import { ChallengesActions } from 'src/app/state/challenges/_challenges.actions';
import { ChallengesDbActions } from 'src/app/state/challenges/_challenges.db.actions';

@Component({
  selector: 'y-edit-challenge-root',
  templateUrl: './edit-challenge-root.component.html',
  styleUrls: ['./edit-challenge-root.component.scss']
})
export class EditChallengeRootComponent implements OnInit {

  public Steps = clgu.challenges.common.EditChallengeSteps;
  public currentStep = this.Steps.FIRST;
  public initted = false;

  public challengeName: string;

  public fg: FormGroup;
  public fillRuleFg: FormGroup;
  public weekDayFg: FormGroup;
  public nameControl: FormControl;
  public startDateControl: FormControl;
  public endDateControl: FormControl;
  public fillRuleControl: FormControl;
  public descriptionControl: FormControl;
  public participantsControl: FormControl;
  public selectedDatesControl: FormControl;
  public shouldTrackMeasurements: FormControl;
  public measurementFormArray: FormArray;
  
  private challengeId: string;
  private initialUsers: string[] = [];
  

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.challengeId =  this.route.snapshot.params.id;
    ChallengesSelectors.challengeDetails$(this.store, this.challengeId, true)
      .pipe(
        filter(c => !!c)
      )
      .subscribe(challDb => {
        this.challengeName = challDb.challenge.name;
        this.initForm(challDb);
      })

  }

  public onNextStep(): void {
    if (this.currentStep !== this.Steps.LAST) {
      this.currentStep++;
    } else {
      this.onSubmit();
    }
  }


  public onPreviousStep(): void {
    if (this.currentStep !== this.Steps.FIRST) {
      this.currentStep--;
    }
  }

  public goBack(): void {
    this.router.navigate(['home', 'challenges', 'details', this.challengeId])
  }

  public goToStep(step: clgu.challenges.common.EditChallengeSteps): void {
    this.currentStep = step;
  }

  public get nextButtonText(): string {
    if (!this.Steps) {
      return 'Next';
    }
    if (this.currentStep === this.Steps.LAST) {
      return 'Update';
    }
    return 'Next';
  }

  /**
   *  name: this.nameControl,
      description: this.descriptionControl,
      measurements: new FormGroup({
        shouldTrack: this.shouldTrackMeasurements,
        items: this.measurementFormArray,
      }),
      participants: this.participantsControl,
      selectedDates: this.selectedDatesControl
   */


  public onSubmit(): void {
      if (this.nameControl.touched || this.descriptionControl.touched) {
        const updateObj = {
          name: this.nameControl.value,
          description: this.descriptionControl.value
        } as clgu.challenges.UpdateBasicInfoRequest;
        this.store.dispatch(new ChallengesActions.UpdateBasicInfo({ id: this.challengeId, data: updateObj}));
      }
      if (this.selectedDatesControl.touched) {
        const updateObj = this.selectedDatesControl.value
                            .map(d => d.getTime());

        this.store.dispatch(new ChallengesActions.UpdateChallengeDates({ id: this.challengeId, data: updateObj}));
      }
      
      if (this.participantsControl.touched) {
        const newIds = this.participantsControl.value
                .map(u => u.id);

        const deleted = this.initialUsers
          .filter(uid => {
            return !newIds.some(newId => newId === uid)
          });

        const updateObj = {
          new: newIds,
          deleted: deleted
        }

        this.store.dispatch(new ChallengesActions.UpdateChallengeParticipants({ id: this.challengeId, data: updateObj}));
        this.store.dispatch(new ChallengesDbActions.ReloadChallengeParticipants({ ids: [this.challengeId], force: true }));     
      }
      // if (this.measurementFormArray.controls.some(c => c.touched)) {
      //   const updateObj = this.measurementFormArray.value;
      //   this.store.dispatch(new ChallengesActions.UpdateChallengeMeasurements({ id: this.challengeId, data: updateObj}));
      // }
      this.goBack();
  }


  private initForm(challengeObj: clgu.challenges.db.ChallengeDetails): void {

    console.log({ challengeObj });

    const dates = Object.keys(challengeObj.common_days)
      .map(dateId => challengeObj.common_days[dateId])
      .map(dateObj => dateObj.timestamp)
      .map(ts => new Date(ts));

    const participants = challengeObj.participants.map(pDb => new clgu.users.models.User(pDb));

    this.initialUsers = participants.map(p => p.id);

    this.nameControl = new FormControl(challengeObj.challenge.name, [ Validators.required ]);
    this.descriptionControl = new FormControl(challengeObj.challenge.description);
    this.participantsControl = new FormControl(participants, Validators.required);
    this.selectedDatesControl = new FormControl(dates, Validators.required );
    this.measurementFormArray = new FormArray(this.getMeasurementsFgArray(challengeObj));
    this.shouldTrackMeasurements = new FormControl(!!challengeObj.common_measurements);

    this.shouldTrackMeasurements.valueChanges
      .subscribe(val => {
        if (val && this.measurementFormArray.controls.length === 0) {
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



    this.fg = new FormGroup({
      name: this.nameControl,
      description: this.descriptionControl,
      measurements: new FormGroup({
        shouldTrack: this.shouldTrackMeasurements,
        items: this.measurementFormArray,
      }),
      participants: this.participantsControl,
      selectedDates: this.selectedDatesControl
    });

    this.initted = true;
  }


  private getMeasurementsFgArray(challengeObj: clgu.challenges.db.ChallengeDetails): FormGroup[] {
    if (challengeObj.common_measurements) {
      return Object.keys(challengeObj.common_measurements)
        .map(measId => challengeObj.common_measurements[measId])
        .map((measObj: clgu.challenges.db.MeasurementObj) => {
          return new FormGroup({
            displayName: new FormControl(measObj.display_name, [ Validators.required ]),
            type: new FormControl(measObj.type)
          });
        })
    } else {
      return [];
    }
  }

}
