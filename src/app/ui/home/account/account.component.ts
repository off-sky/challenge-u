import { Component, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../../state/app.state';
import { AuthActions } from '../../../state/auth/_auth.actions';
import { Observable } from 'rxjs';
import { UserActions } from 'src/app/state/users/_users.actions';
import { NavComponent } from '../nav/nav.component';

@Component({
  selector: 'y-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {


  public menuOpened: boolean = true;

  @ViewChild('nav') private navCmp: NavComponent;


  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  public onMenuToggled(): void {
    this.menuOpened = !this.menuOpened;
    if (this.navCmp) {
      this.navCmp.opened = this.menuOpened;
    }
  }


}
