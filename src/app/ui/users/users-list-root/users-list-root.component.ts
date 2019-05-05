import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { clgu } from 'src/types';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { UsersSelectors } from 'src/app/state/users/_users.selectors';
import { map } from 'rxjs/operators';

@Component({
  selector: 'y-users-list-root',
  templateUrl: './users-list-root.component.html',
  styleUrls: ['./users-list-root.component.scss']
})
export class UsersListRootComponent implements OnInit {

  public users$: Observable<clgu.users.User[]>;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.users$ = UsersSelectors.userProfiles$(this.store)
      .pipe(
        map(usersDb => {
          return usersDb.map(udb => new clgu.users.models.User(udb));
        })
      )
  }

}
