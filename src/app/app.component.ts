import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './state/app.state';
import { AuthActions } from './state/auth/_auth.actions';
import { ScreenSizes } from './core/screen-size/interfaces';
import { Observable } from 'rxjs';
import { RouterService } from './core/services/router.service';
import { filter, switchMap, take, takeUntil, map } from 'rxjs/operators';

@Component({
  selector: 'y-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit, OnInit {
  
  title = 'challenge-u';
  public ScreenSizes = ScreenSizes;
  public inited = false;

  public isInitialLoading$: Observable<boolean>;

  constructor(
    private store: Store<AppState>,
    private routerService: RouterService
  ) {

  }

  ngOnInit(): void {
    this.store.dispatch(new AuthActions.CheckAuth());

    this.isInitialLoading$ = this.routerService.isLoading$()
      .pipe(
        filter(loading => loading),
        takeUntil(
          this.routerService.isLoading$()
            .pipe(
              filter(loading => !loading)
            )
        )
      )
  }

  ngAfterViewInit(): void {
    this.inited = true;
  }

}
