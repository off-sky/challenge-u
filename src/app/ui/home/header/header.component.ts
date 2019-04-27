import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { clgu } from '../../../../types';
import { AppState } from '../../../state/app.state';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/state/auth/_auth.actions';

@Component({
  selector: 'y-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user$: Observable<clgu.users.User>;
  public isLoading$: Observable<boolean>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.user$ = this.store.select(state => state.auth.authCheck.user);
    this.isLoading$ = this.store.select(state => state.auth.logout.isLoading);
  }


  
  public onSignOutClick(): void {
    this.store.dispatch(new AuthActions.Signout());
  }

}
