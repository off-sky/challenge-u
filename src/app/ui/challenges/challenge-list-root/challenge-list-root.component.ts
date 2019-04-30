import { Component, OnInit } from '@angular/core';
import { clgu } from '../../../../types';
import { Observable } from 'rxjs';
import { AppState } from '../../../state/app.state';
import { Store } from '@ngrx/store';

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
    this.list$ = this.store.select(state => state.challenges.list.items);
  }

}
