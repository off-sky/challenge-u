import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { clgu } from 'src/types';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { AuthSelectors } from 'src/app/state/auth/_auth.selectors';
import { switchMap, takeUntil, filter, take } from 'rxjs/operators';
import { WidgetActions } from 'src/app/state/widgets/_widget.actions';
import { WidgetSelectors } from 'src/app/state/widgets/_widget.selectors';

@Injectable()
export class ChallengeUserWidgetResolver implements Resolve<clgu.widgets.Widget[]> {

    constructor(
        private store: Store<AppState>
    ) {

    }

    resolve(route: ActivatedRouteSnapshot, ): Observable<clgu.widgets.Widget[]> {
        const challengeId = route.params.id;

        const loadFinished = AuthSelectors.currentUser$(this.store)
            .pipe(
                switchMap(user => {
                    return this.store
                        .select(state => state.widgets.challengeUserWidgetData)
                        .pipe(
                            filter(widgetState => !!widgetState[challengeId] && !!widgetState[challengeId][user.id]),
                            filter(widgetState => !widgetState.loading)
                        );
                })
            );
     
        return AuthSelectors.currentUser$(this.store)
            .pipe(
                switchMap(user => {
                    this.store.dispatch(new WidgetActions.FetchChallengeUserWidgets({
                        challengeId,
                        userId: user.id
                    }));
                    return WidgetSelectors.widgetsByChallengeByUser$(this.store, challengeId, user.id)
                }),
                take(1)
            )
    }


}