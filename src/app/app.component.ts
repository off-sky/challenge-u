import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { AuthActions } from './state/auth/_auth.actions';

@Component({
  selector: 'y-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'challenge-u';

  constructor(
    private store: Store<AppState>
  ) {

  }

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.CheckAuth());
  }

}
