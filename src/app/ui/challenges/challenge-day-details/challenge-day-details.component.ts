import { Component, OnInit } from '@angular/core';
import { clgu } from 'src/types';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { ChallengesActions } from 'src/app/state/challenges/_challenges.actions';
import { Observable, combineLatest, of } from 'rxjs';
import { map, filter, take, shareReplay } from 'rxjs/operators';
import { ChallengesSelectors } from 'src/app/state/challenges/_challenges.selectors';

@Component({
  selector: 'y-challenge-day-details',
  templateUrl: './challenge-day-details.component.html',
  styleUrls: ['./challenge-day-details.component.scss']
})
export class ChallengeDayDetailsComponent implements OnInit {


  public activity$: Observable<clgu.challenges.Activity>;
  public loading$: Observable<boolean>;
  public isActive: Observable<boolean>;
  public isMine: Observable<boolean>;
  public showUpText$: Observable<string>;
  public cheerUpText$: Observable<string>;
  public hasMeasurements$: Observable<boolean>;
  public hasRequirements$: Observable<boolean>;

  private currentUser$: Observable<clgu.users.User>;

  private dayId: string;
  private challengeId: string;
  private userId: string;


  public cheerUpTexts = [
    'Great job!',
    'Good for you!',
    'Superb!',
    'Keep rocking!',
    'Keep pushing!',
    'You\'re a hero!',
    'You\'re a rising star!',
    'Give yourself a pat on the back!',
    'Enjoy your day!'
  ]

 

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.initActivity();
    if (!this.activity$) {
      return;
    }

    this.currentUser$ = this.store.select(state => state.auth.authCheck.user)
      .pipe(
        filter(u => !!u)
      );

    this.isMine = this.currentUser$
        .pipe(
          map(currUser => currUser.id === this.userId)
        );

    this.isActive = combineLatest(this.activity$, this.isMine)
          .pipe(
            map((vals) => {
              const activity = vals[0],
                    isMine = vals[1];

              return (!activity.isShowUp && !activity.isFuture) && isMine;
            })
          )


    this.loading$ = this.store.select(state => state.challenges.showUp)
      .pipe(
        map(showUpState => !!showUpState[this.dayId] && showUpState[this.dayId].isLoading)
      );

    this.hasMeasurements$ = this.activity$
        .pipe(
          map(activity => {
            return !!activity && !!activity.measurements && activity.measurements.length > 0;
          })
        );

    this.hasRequirements$ = this.activity$
        .pipe(
          map(activity => {
            return !!activity && !!activity.requirements && activity.requirements.length > 0;
          })
        );


      this.showUpText$ = this.isMine
          .pipe(
            map(isMine => {
              if (isMine) {
                return 'You have shown up for this activity';
              } else {
                return 'Your friend has shown up for this activity';
              }
            })
          );

      const rand = Math.floor(Math.random() * this.cheerUpTexts.length);
      this.cheerUpText$ = of(this.cheerUpTexts[rand]);

    
  }



  public showUpDate(): void {
    if (this.activity$) {
      this.activity$
        .pipe(
          take(1)
        )
        .subscribe(activity => {
          const request = activity.getShowUpRequest();
          this.store.dispatch(new ChallengesActions.ShowUpDate(request));
        })
   
    }
  }


  public goBack(): void {
      this.router.navigate(['home', 'challenges', 'details', this.challengeId ])
  }


  private initActivity(): void {
    this.userId = this.route.snapshot.params.userId;
    this.dayId = this.route.snapshot.params.dayId;
    this.challengeId =  this.route.snapshot.params.id;
    /**
     * userId: string,
        challengeId: string,
        private ts: number,
        private type: challCommon.ChallengeType,
        private requirementsDb: challDb.Requirements,
        private measurementsDb: challDb.Measurements,
        isShowUp: boolean
     */
    this.activity$ = ChallengesSelectors.challengeDetails$(this.store, this.challengeId)
      .pipe(
        map(detailsObj => {
            const ts = detailsObj.common_days[this.dayId].timestamp;
            const type = detailsObj.challenge.type;
            const userDay = !!detailsObj.users_days && !!detailsObj.users_days[this.userId] ? detailsObj.users_days[this.userId][this.dayId] : null;
            const requirementsDb = !!userDay ? userDay.requirements : !!detailsObj.days_requirements ?  detailsObj.days_requirements[this.dayId] : null;
            const measurementsDb = !!userDay ? userDay.measurements : detailsObj.common_measurements;
            const isShowUp = !!userDay;
            return new clgu.challenges.models.Activity(
              this.userId,
              this.challengeId,
              ts,
              type,
              requirementsDb,
              measurementsDb,
              isShowUp
            );
        }),
        shareReplay(1)
      );
  }


}
