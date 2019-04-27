import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { clgu } from '../../../../types';
import { AppState } from '../../../state/app.state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'y-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user$: Observable<clgu.users.User>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.user$ = this.store.select(state => state.auth.authCheck.user);
  }

}
