import { Component, OnInit } from '@angular/core';
import { clgu } from 'src/types';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { ChallengesActions } from 'src/app/state/challenges/_challenges.actions';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'y-challenge-day-details',
  templateUrl: './challenge-day-details.component.html',
  styleUrls: ['./challenge-day-details.component.scss']
})
export class ChallengeDayDetailsComponent implements OnInit {

  public activity: clgu.challenges.Activity;
  public loading$: Observable<boolean>;
  public isActive: boolean;
  public isMine: boolean;

  private challenge: clgu.challenges.Challenge;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.initActivity();
    if (!this.activity) {
      return;
    }

    this.store.select(state => state.auth.authCheck.user.id)
      .subscribe(currUserId => {
        this.isMine = this.activity.userId === currUserId;
        this.isActive = this.activity.isActive && this.isMine;
      });

    this.loading$ = this.store.select(state => state.challenges.showUp)
      .pipe(
        map(showUpState => !!showUpState[this.activity.id] && showUpState[this.activity.id].isLoading)
      )
  }


  public get showUpText(): string {
    if (this.isMine) {
      return 'You have shown up for this activity';
    } else {
      return 'Your friend has shown up for this activity';
    }
  }


  public showUpDate(): void {
    if (this.activity) {
      const request = this.activity.getShowUpRequest();
      this.store.dispatch(new ChallengesActions.ShowUpDate(request));
    }
  }


  public goBack(): void {
    if (this.challenge) {
      this.router.navigate(['home', 'challenges', 'details', this.challenge.id])
    }
  }


  private initActivity(): void {
    const userId = this.route.snapshot.params.userId;
    const dayId = this.route.snapshot.params.dayId;
    this.challenge = this.route.snapshot.data.challenge;
    if (this.challenge) {
      const participant = this.challenge.participants.find(p => p.id === userId);
      if (participant) {
        this.activity = participant.activities.find(a => a.id === dayId).clone();
      }
    }
  }


  public get hasMeasurements(): boolean {
    return !!this.activity && !!this.activity.measurements && this.activity.measurements.length > 0;
  }

  public get hasRequirements(): boolean {
    return !!this.activity && !!this.activity.requirements && this.activity.requirements.length > 0;
  }

}
