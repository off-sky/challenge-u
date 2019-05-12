import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormArray, FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { ChallengesSelectors } from 'src/app/state/challenges/_challenges.selectors';
import { Store } from '@ngrx/store';
import { shareReplay, map, take } from 'rxjs/operators';
import { clgu } from 'src/types';

@Component({
  selector: 'y-edit-measurements-root',
  templateUrl: './edit-measurements-root.component.html',
  styleUrls: ['./edit-measurements-root.component.scss']
})
export class EditMeasurementsRootComponent implements OnInit {

  public activeStep: number = 0;

  public formGroup: FormGroup;
  public measurementsFormControl = new FormArray([]);
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

  private challengeId: string;
  public participantIds$: Observable<string[]>;
  public type$: Observable<clgu.challenges.common.ChallengeType>;
  public stamps$: Observable<number[]>;

  constructor(
    private route: ActivatedRoute,
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

  public goToStep(ind: number): void {
    this.activeStep = ind;
  }

  public isStepActive(ind: number): boolean {
    return this.activeStep === ind;
  }

}
