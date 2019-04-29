import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { AuthActions } from '../../../state/auth/_auth.actions';
import { Observable } from 'rxjs';
import { UserActions } from 'src/app/state/users/_users.actions';

@Component({
  selector: 'y-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {


  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new UserActions.GetUsers());
  }


}
