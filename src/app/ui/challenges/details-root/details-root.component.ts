import { Component, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { clgu } from '../../../../types';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { map, take, shareReplay, debounceTime, tap, startWith } from 'rxjs/operators';
import { Observable, combineLatest, fromEvent } from 'rxjs';
import { ChallengesSelectors } from 'src/app/state/challenges/_challenges.selectors';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthSelectors } from 'src/app/state/auth/_auth.selectors';
import { ScreenSizeService } from 'src/app/core/screen-size/screen-size.service';
import { PageService } from 'src/app/core/services/page.service';
import { ScreenSizeType } from 'src/app/core/screen-size/interfaces';

@Component({
  selector: 'y-details-root',
  templateUrl: './details-root.component.html',
  styleUrls: ['./details-root.component.scss']
})
export class DetailsRootComponent implements AfterViewInit, OnInit {

  public challenge$: Observable<clgu.challenges.Challenge>;
  public challengeAuthor$: Observable<clgu.users.User>;
  public isMine: Observable<boolean>;
  public amIparticipant: Observable<boolean>;
  public screenSize$: Observable<ScreenSizeType>;
  public showScrollUpButton$: Observable<boolean>;
  public showScrollDownButton$: Observable<boolean>;
  public showFormGroup: FormGroup;

  @ViewChild('daysWrap') private daysWrap: ElementRef;

  private lastActiveDayY: number;

  constructor(
    private pageService: PageService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private screenSizeService: ScreenSizeService
  ) { }

  ngOnInit() {
    this.challenge$ = ChallengesSelectors.challengeDetails$(this.store, this.route.snapshot.params.id)
      .pipe(
        map(challDb => new clgu.challenges.models.Challenge(challDb)),
        shareReplay(1)
      );

    this.challengeAuthor$ = ChallengesSelectors.challengeAuthor$(this.store, this.route.snapshot.params.id)

 
    this.isMine = ChallengesSelectors.isMyChallenge$(this.store, this.route.snapshot.params.id);
    this.amIparticipant = ChallengesSelectors.amIParticipant$(this.store, this.route.snapshot.params.id);
    this.initShowFormGroup();
   
  }


  ngAfterViewInit() {
    setTimeout(() => {
      this.screenSize$ = this.screenSizeService.screenSize$();
      this.showScrollUpButton$ = this.showScrollUpButton();
      this.showScrollDownButton$ = this.showScrollDownButton();
    });
  }


  public openMeasurements(): void {
      this.router.navigate(['home', 'challenges', 'details', this.route.snapshot.params.id, 'measurements']);
  }

  public goToChallengeList(): void {
    this.router.navigate(['home', 'challenges', 'list']);
  }

  public onScrollDayIntoView(el: ElementRef): void {
    if (el) {
      const div = el.nativeElement as HTMLElement;
      this.lastActiveDayY = div.getBoundingClientRect().top - 360;
    }
  }

  public onScrollUpClicked(): void {
    this.pageService.scrollContentY(0);
  }

  public onScrollDownClicked(): void {
    if (this.lastActiveDayY !== undefined) {
      this.pageService.scrollContentY(this.lastActiveDayY);
    } else {
      this.pageService.scrollContentToBottom();
    }
  }


  public openEdit(): void {
    this.router.navigate(['home', 'challenges', 'details', this.route.snapshot.params.id, 'edit']);
  }


  public openWidgetManager(): void {
    this.router.navigate(['home', 'challenges', 'details', this.route.snapshot.params.id, 'widgets']);
  }


  private showScrollUpButton(): Observable<boolean> {
      return this.pageService.contentScrolledY()
        .pipe(
          map(val => val > 10)
        );
  }


  private showScrollDownButton(): Observable<boolean> {
    return this.pageService.contentScrolledY()
      .pipe(
        startWith(0),
        map(val => val === 0)
      );
}





  private initShowFormGroup(): void {
    combineLatest(AuthSelectors.currentUser$(this.store), this.challenge$, this.screenSizeService.screenSize$())
      .pipe(
        take(1)
      )
      .subscribe(vals => {
        const currUser = vals[0];
        const challenge = vals[1];
        const screenSize = vals[2];
        const controls = {};
        challenge.participants.forEach(p => {
          controls[p.id] = new FormControl(screenSize === 'desktop' || p.id === currUser.id);
        });
        this.showFormGroup = new FormGroup(controls);
      })
  }


}
