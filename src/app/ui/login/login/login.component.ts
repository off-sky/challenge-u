import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { AuthActions } from '../../../state/auth/_auth.actions';
import { Observable } from 'rxjs';

@Component({
  selector: 'y-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public isLoading$: Observable<boolean>;
  public error$: Observable<string>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.isLoading$ = this.store.select(state => state.auth.login.isLoading);
    this.error$ = this.store.select(state => state.auth.login.error ? state.auth.login.error.description : '')
  }

  public loginFaceBook(): void {
    this.store.dispatch(new AuthActions.LoginFacebook());
  }

}
