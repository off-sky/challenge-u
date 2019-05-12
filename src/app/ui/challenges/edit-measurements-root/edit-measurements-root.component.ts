import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormGroup, FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { ChallengesSelectors } from 'src/app/state/challenges/_challenges.selectors';
import { Store } from '@ngrx/store';
import { shareReplay, map, take } from 'rxjs/operators';
import { clgu } from 'src/types';
import { ChallengesActions } from 'src/app/state/challenges/_challenges.actions';

@Component({
  selector: 'y-edit-measurements-root',
  templateUrl: './edit-measurements-root.component.html',
  styleUrls: ['./edit-measurements-root.component.scss']
})
export class EditMeasurementsRootComponent implements OnInit {

  public activeStep: number = 0;

  public formGroup: FormGroup;
  public measurementsFormControl = new FormArray([], [ Validators.required ]);
  public readonly userControl: FormControl = new FormControl([]);
  public datesControl: FormControl = new FormControl([]);

  public steps = [
    {
      ind: 0,
      name: 'Measurements'
    },
    {
      ind: 1,
      name: 'Participants'
    },
    {
      ind: 2,
      name: 'Dates'
    }
  ];

  public challengeId: string;
  public participantIds$: Observable<string[]>;
  public type$: Observable<clgu.challenges.common.ChallengeType>;
  public stamps$: Observable<number[]>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.challengeId = this.route.snapshot.params.id;

    const challenge$ = ChallengesSelectors.challengeDetails$(this.store, this.challengeId)
      .pipe(
        shareReplay(1)
      );

      ChallengesSelectors.challengeDetails$(this.store, this.challengeId)
        .pipe(
          take(1)
        )
        .subscribe(chall => {
          const participants = chall.participants.map(p => new clgu.users.models.User(p));
          this.userControl.setValue(participants);
        });

    this.participantIds$ = challenge$
        .pipe(
          take(1),
          map(chall => chall.participants.map(p => p.id))
        );

    this.type$ = challenge$
          .pipe(
            take(1),
            map(chall => chall.challenge.type)
          );


    this.stamps$ = challenge$
          .pipe(
            take(1),
            map(chall =>{
              return Object.keys(chall.common_days).map(dayId => chall.common_days[dayId].timestamp);
            })
          )

    this.formGroup = new FormGroup({
      measurements: this.measurementsFormControl,
      users: this.userControl,
      dates: this.datesControl
    });

    this.formGroup.valueChanges
      .subscribe(val => {
        console.log(val);
      })

    
  }

  public goBack(): void {
    this.router.navigate(['home', 'challenges', 'details', this.challengeId])
  }

  public goToStep(ind: number): void {
    this.activeStep = ind;
  }

  public get nextButtonText(): string {
    return 'Next';
  }

  public isStepActive(ind: number): boolean {
    return this.activeStep === ind;
  }

  public nextStep(): void {
    if (this.activeStep === 2) {
      this.onSubmit();
    } else {
      this.activeStep++;
    }
  }

  private onSubmit(): void {
    if (!this.formGroup.valid) {
      return;
    }
    const currentValue = this.formGroup.value;
    const result = {} as clgu.challenges.EditMeasurementsRequest;
    result.challengeId = this.challengeId;
    result.measurements = currentValue.measurements.map(obj => {
      const meas = {
        id: obj.id,
        orderNo: obj.orderNo,
        displayName: obj.displayName,
        category: !!(obj.category && obj.category[0]) ? obj.category[0].display : '',
        type: obj.type,
        filled: false
      } as clgu.challenges.Measurement;
      if (obj.type === 'combine' && (!!obj.formula && obj.formula.length > 0)) {
        meas.formula = obj.formula
      }
      return meas;
    });
    result.userIds = currentValue.users.map(u => u.id);
    result.stamps = currentValue.dates.map(d => d.getTime());
    console.log(result);
    this.store.dispatch(new ChallengesActions.UpdateChallengeMeasurements(result));
  }

}
