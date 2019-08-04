import { Store } from '@ngrx/store';
import { AppState } from '../app.state';
import { Observable } from 'rxjs';
import { clgu } from 'src/types';
import { map, withLatestFrom, filter } from 'rxjs/operators';

export class WidgetSelectors {

    public static readonly widgetsByChallengeByUser$ = (store: Store<AppState>,
                                                    challengeId: string,
                                                    userId: string): Observable<clgu.widgets.Widget[]> => {

        return store.select(state => state.widgets.challengeUserWidgets)
            .pipe(
                map(userWidgetState => userWidgetState[challengeId] || {}),
                map(userWidgetState => userWidgetState[userId] ? userWidgetState[userId] : null),
                filter(widgetState => !!widgetState && !widgetState.loading),
                map(widgetState => widgetState.widgets),
                clgu.common.untilDataObjectChanged(),
                map(udo => udo ? udo.data as string[] : []),
                withLatestFrom(store.select(state => state.widgets.allWidgets)),
                map((vals: [string[], clgu.widgets.Widgets]) => {
                    const ids = vals[0];
                    const widgets = vals[1];
                    return ids
                        .map(widgId => widgets[widgId])
                        .map(dbW => new clgu.widgets.models.Widget(dbW))
                })
            )
    }


    public static readonly allWidgets$ = (store: Store<AppState>): Observable<clgu.widgets.Widget[]>  => {
        return store.select(state => state.widgets.allWidgets)
            .pipe(
                map(dbObjs => {
                    return Object.keys(dbObjs)
                        .map(wId => dbObjs[wId])
                        .map(dbObj => new clgu.widgets.models.Widget(dbObj));
                })
            );
    }


    public static readonly widgetData$ = (store: Store<AppState>,
                                          challengeId: string,
                                          userId: string,
                                          widgetId: string): Observable<any> => {
        return store.select(state => state.widgets.challengeUserWidgetData)
                    .pipe(
                        map(dataState => dataState[challengeId] || {}),
                        map(dataState => dataState[userId] || {}),
                        map(dataState => dataState[widgetId]),
                        clgu.common.untilDataObjectChanged(),
                        map(udo => udo ? udo.data : null)
                    )
    }
}