import { Component, OnInit } from '@angular/core';
import { clgu } from '../../../../types';
import { Observable, combineLatest, of } from 'rxjs';
import { AppState } from '../../../state/app.state';
import { Store } from '@ngrx/store';
import { map, take } from 'rxjs/operators';
import { ChallengesSelectors } from 'src/app/state/challenges/_challenges.selectors';
import { MatDialog } from '@angular/material';
import { LeaveConfirmPopupComponent } from '../leave-confirm-popup/leave-confirm-popup.component';
import { ChallengesActions } from 'src/app/state/challenges/_challenges.actions';

@Component({
  selector: 'y-challenge-list-root',
  templateUrl: './challenge-list-root.component.html',
  styleUrls: ['./challenge-list-root.component.scss']
})
export class ChallengeListRootComponent implements OnInit {

  public list$: Observable<clgu.challenges.ChallengeBase[]>;

  constructor(
    private store: Store<AppState>,
    private matDialog: MatDialog

  ) { }

  ngOnInit() {
    this.list$ = ChallengesSelectors.listForCurrUser$(this.store)
      .pipe(
        map(listDb => {
          return listDb.map(ldb => new clgu.challenges.models.ChallengeListItem(ldb))
        })
      )
  }

  public onCloseClick(challenge: clgu.challenges.ChallengeBase, event: MouseEvent): void {
    event.stopPropagation();
    this.matDialog.open(LeaveConfirmPopupComponent, { data: challenge.name })
      .afterClosed()
      .pipe( take(1) )
      .subscribe(confirmed => {
        if (confirmed) {
          this.store.dispatch(new ChallengesActions.LeaveChallenge(challenge.id))
        }
      })


  }

}
