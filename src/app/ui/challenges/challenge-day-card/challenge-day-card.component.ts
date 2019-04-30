import { Component, OnInit } from '@angular/core';
import { clgu } from '../../../../types';
import { Input } from '@angular/core';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';

@Component({
  selector: 'y-challenge-day-card',
  templateUrl: './challenge-day-card.component.html',
  styleUrls: ['./challenge-day-card.component.scss']
})
export class ChallengeDayCardComponent implements OnInit {

  @Input() activity: clgu.challenges.Activity;

  public isActive: boolean;

  constructor(
    private store: Store<AppState>,
    private router: Router
  ) { }

  ngOnInit() {
    this.store.select(state => state.auth.authCheck.user.id)
      .subscribe(currUserId => {
        this.isActive = this.activity.isActive && this.activity.userId === currUserId
      });
  }


  public onDayClick(): void {
      this.router.navigate(['home', 'challenges', 'details', this.activity.challengeId, 'day', this.activity.userId, this.activity.id])
  }

}
