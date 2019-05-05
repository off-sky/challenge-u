import { Component, OnInit } from '@angular/core';
import { clgu } from '../../../../types';
import { Observable, combineLatest, of } from 'rxjs';
import { AppState } from '../../../state/app.state';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { ChallengesSelectors } from 'src/app/state/challenges/_challenges.selectors';

@Component({
  selector: 'y-challenge-list-root',
  templateUrl: './challenge-list-root.component.html',
  styleUrls: ['./challenge-list-root.component.scss']
})
export class ChallengeListRootComponent implements OnInit {

  public list$: Observable<clgu.challenges.ChallengeBase[]>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.list$ = ChallengesSelectors.listForCurrUser$(this.store)
      .pipe(
        map(listDb => {
          return listDb.map(ldb => new clgu.challenges.models.ChallengeListItem(ldb))
        })
      )
  }

}
