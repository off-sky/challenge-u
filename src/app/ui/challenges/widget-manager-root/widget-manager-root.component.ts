import { Component, OnInit } from '@angular/core';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, combineLatest } from 'rxjs';
import { clgu } from 'src/types';
import { AuthSelectors } from 'src/app/state/auth/_auth.selectors';
import { switchMap, map, shareReplay, take } from 'rxjs/operators';
import { WidgetSelectors } from 'src/app/state/widgets/_widget.selectors';
import { WidgetActions } from 'src/app/state/widgets/_widget.actions';

@Component({
  selector: 'y-widget-manager-root',
  templateUrl: './widget-manager-root.component.html',
  styleUrls: ['./widget-manager-root.component.scss']
})
export class WidgetManagerRootComponent implements OnInit {

  public list$: Observable<clgu.widgets.models.WidgetChecklistItem[]>;
  private challengeId: string;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
    this.challengeId = this.route.snapshot.params.id;
  
    this.list$ = AuthSelectors.currentUser$(this.store)
      .pipe(
        switchMap(currUser => {
          const allWidgets$ = WidgetSelectors.allWidgets$(this.store);
          const challengeUserWidgets$ = WidgetSelectors.widgetsByChallengeByUser$(this.store, this.challengeId, currUser.id);

          return combineLatest(
            allWidgets$,
            challengeUserWidgets$
          )
          .pipe(
            map((vals) => this.getWidgetList(vals[0], vals[1]))
          )
        }),
        take(1),
        shareReplay(1)
      )
  }


  private getWidgetList(allWidgets: clgu.widgets.Widget[],
                        userWidgets: clgu.widgets.Widget[]): clgu.widgets.models.WidgetChecklistItem[] {
    console.log(userWidgets);
    return allWidgets
      .map(w => {
        const isSelected = userWidgets.some(uw => uw.id === w.id);
        return new clgu.widgets.models.WidgetChecklistItem(w, isSelected);
      })
  }

  public goBack(): void {
    this.router.navigate(['home', 'challenges', 'details', this.challengeId])
  }

  public onSave(): void {

    const userId$ = AuthSelectors.currentUser$(this.store)
      .pipe(
        map(user => user.id)
      );

    const selected$ = this.list$
        .pipe(
          map(items => {
            return items.filter(i => i.control.value)
                  .map(i => i.id);
          })
        );

    combineLatest(userId$, selected$)
          .pipe(
            map((vals: [string, string[]]) => {
              return {
                challengeId: this.challengeId,
                userId: vals[0],
                data: vals[1]
              } as clgu.widgets.ChallengeUserWidgetData<string[]>;
            }),
            take(1)
          )
          .subscribe(request => {
            this.store.dispatch(new WidgetActions.UpdateChallengeUserWidgets(request));
            this.goBack();
          })
  }



}
