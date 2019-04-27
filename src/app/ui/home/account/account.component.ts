import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { AuthActions } from '../../../state/auth/_auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'y-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  public isLoading$: Observable<boolean>;
  public open: boolean = true;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(state => state.auth.logout.isLoading);
  }


  public onSignOutClick(): void {
    this.store.dispatch(new AuthActions.Signout());
  }

  public close(): void {
    this.open = false;
  }

}
