import { Component, OnInit, EventEmitter, ElementRef, Output, AfterViewInit } from '@angular/core';
import { clgu } from '../../../../types';
import { Input } from '@angular/core';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ScreenSizeService } from 'src/app/core/screen-size/screen-size.service';
import { Observable } from 'rxjs';
import { ScreenSizeType } from 'src/app/core/screen-size/interfaces';

@Component({
  selector: 'y-challenge-day-card',
  templateUrl: './challenge-day-card.component.html',
  styleUrls: ['./challenge-day-card.component.scss']
})
export class ChallengeDayCardComponent implements AfterViewInit {

  @Input() activity: clgu.challenges.Activity;
  @Input() nextClosestId: string;
  public screenSize$: Observable<ScreenSizeType>;

  @Output() public scrollMe: EventEmitter<ElementRef> = new EventEmitter<ElementRef>();

  public isActive: boolean;

  constructor(
    private store: Store<AppState>,
    private screenSizeService: ScreenSizeService,
    private router: Router,
    private el: ElementRef
  ) { }

  ngAfterViewInit() {
    setTimeout(() => {
      this.screenSize$ = this.screenSizeService.screenSize$();
      this.store.select(state => state.auth.authCheck.user.id)
        .pipe(
          take(1)
        )
        .subscribe(currUserId => {
          this.isActive = this.activity.isActive && this.activity.userId === currUserId;
          if (this.activity.userId === currUserId && this.activity.id === this.nextClosestId) {
            this.scrollMe.emit(this.el);
          }
        });
    })
   
  }


  public onDayClick(): void {
      this.router.navigate(['home', 'challenges', 'details', this.activity.challengeId, 'day', this.activity.userId, this.activity.id])
  }

}
