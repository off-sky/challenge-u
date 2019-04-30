import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { clgu } from '../../../../types';
import { AppState } from '../../../state/app.state';
import { Store } from '@ngrx/store';
import { AuthActions } from 'src/app/state/auth/_auth.actions';
import { EventEmitter } from '@angular/core';
import { Output } from '@angular/core';

@Component({
  selector: 'y-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user$: Observable<clgu.users.User>;
  public isLoading$: Observable<boolean>;
  @Output() public menuToggled: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.user$ = this.store.select(state => state.auth.authCheck.user);
    this.isLoading$ = this.store.select(state => state.auth.logout.isLoading);
  }

  public onMenuClick(): void {
    this.menuToggled.emit();
  }

  
  public onSignOutClick(): void {
    this.store.dispatch(new AuthActions.Signout());
  }

}
