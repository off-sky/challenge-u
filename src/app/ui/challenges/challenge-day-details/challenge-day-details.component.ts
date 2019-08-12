import { Component, OnInit } from '@angular/core';
import { clgu } from 'src/types';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { ChallengesActions } from 'src/app/state/challenges/_challenges.actions';
import { Observable, combineLatest, of } from 'rxjs';
import { map, filter, take, shareReplay, tap, switchMap } from 'rxjs/operators';
import { ChallengesSelectors } from 'src/app/state/challenges/_challenges.selectors';
import { ChallengesDbActions } from 'src/app/state/challenges/_challenges.db.actions';
import { AuthSelectors } from 'src/app/state/auth/_auth.selectors';
import { WidgetSelectors } from 'src/app/state/widgets/_widget.selectors';

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
  public widgets$: Observable<clgu.widgets.Widget[]>;
  public hasMeasurements$: Observable<boolean>;
  public hasRequirements$: Observable<boolean>;

  private currentUser$: Observable<clgu.users.User>;

  private dayId: string;
  public challengeId: string;
  public userId: string;


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
            return !!activity && !!activity.measurements && activity.measurements.measurements().length > 0;
          })
        );


      this.widgets$ = AuthSelectors.currentUser$(this.store)
          .pipe(
            switchMap(user => {
              return WidgetSelectors.widgetsByChallengeByUser$(this.store, this.challengeId, user.id);
            })
          )

 


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

  public onUndoShowUp(): void {
    if (this.activity$) {
      this.activity$
        .pipe(
          take(1)
        )
        .subscribe(activity => {
          this.store.dispatch(new ChallengesActions.UndoShowUp({ challengeId: this.challengeId, dayId: activity.id }));
        });
    }
  }


  public goBack(): void {
      this.router.navigate(['home', 'challenges', 'details', this.challengeId ])
  }


  private initActivity(): void {
    this.userId = this.route.snapshot.params.userId;
    this.dayId = this.route.snapshot.params.dayId;
    this.challengeId =  this.route.snapshot.params.id;
    this.store.dispatch(new ChallengesDbActions.ReloadChallengesMeasurements({
      challengeId: this.challengeId,
      dayId: this.dayId,
      userId: this.userId
    }))

    this.activity$ = ChallengesSelectors.activity$(this.store, this.challengeId, this.dayId, this.userId)
      .pipe(
        tap(data => console.log({ activity: data })),
        shareReplay(1)
      );
  }


}
