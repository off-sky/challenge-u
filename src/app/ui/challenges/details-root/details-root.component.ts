import { Component, OnInit, ElementRef } from '@angular/core';
import { clgu } from '../../../../types';
import { ActivatedRoute, Router } from '@angular/router';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { filter, map, take, shareReplay } from 'rxjs/operators';
import { MatDialog } from '@angular/material';
import { EditRequirementsComponent } from '../edit-requirements/edit-requirements.component';
import { ChallengesActions } from 'src/app/state/challenges/_challenges.actions';
import { Observable, combineLatest } from 'rxjs';
import { ChallengesSelectors } from 'src/app/state/challenges/_challenges.selectors';
import { FormGroup, FormControl } from '@angular/forms';
import { AuthSelectors } from 'src/app/state/auth/_auth.selectors';

@Component({
  selector: 'y-details-root',
  templateUrl: './details-root.component.html',
  styleUrls: ['./details-root.component.scss']
})
export class DetailsRootComponent implements OnInit {

  public challenge$: Observable<clgu.challenges.Challenge>;
  public isMine: Observable<boolean>;

  public showFormGroup: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>,
    private matDialogue: MatDialog
  ) { }

  ngOnInit() {
    this.challenge$ = ChallengesSelectors.challengeDetails$(this.store, this.route.snapshot.params.id)
      .pipe(
        map(challDb => new clgu.challenges.models.Challenge(challDb)),

        shareReplay(1)
      );

 
    this.isMine = ChallengesSelectors.isMyChallenge$(this.store, this.route.snapshot.params.id)

    this.initShowFormGroup();
   
  }


  public openMeasurements(): void {
      // this.challenge$
      //   .pipe(
      //     take(1)
      //   )
      //   .subscribe(challenge => {
      //     const ref = this.matDialogue.open(EditRequirementsComponent, { data: challenge.participants[0].activities });
      //     ref.afterClosed()
      //       .subscribe((res: clgu.challenges.AddRequirementsRequest)=> {
      //         if (!res) {
      //           return;
      //         }
      //         res.challengeId = challenge.id;
      //         res.userId = challenge.ownerId;
      //         this.store.dispatch(new ChallengesActions.AddRequirements(res));
      //       });
      //   })

      this.router.navigate(['home', 'challenges', 'details', this.route.snapshot.params.id, 'measurements']);
      
  }

  public onScrollDayIntoView(el: ElementRef): void {
    if (el) {
      const div = el.nativeElement as HTMLElement;
      div.scrollIntoView({ behavior: 'auto', block: 'center'})
    }
  }


  public openEdit(): void {
    this.router.navigate(['home', 'challenges', 'details', this.route.snapshot.params.id, 'edit']);
  }


  private initShowFormGroup(): void {
    combineLatest(AuthSelectors.currentUser$(this.store), this.challenge$)
      .pipe(
        take(1)
      )
      .subscribe(vals => {
        const currUser = vals[0];
        const challenge = vals[1];
        const controls = {};
        challenge.participants.forEach(p => {
          controls[p.id] = new FormControl(p.id === currUser.id);
        });
        this.showFormGroup = new FormGroup(controls);
      })
  }


}
