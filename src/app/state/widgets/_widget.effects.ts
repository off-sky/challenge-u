import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { WidgetDbService } from './services/widget-db.service';
import { WidgetActions } from './_widget.actions';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { YAction } from 'src/types/store';
import { clgu } from 'src/types';

@Injectable()
export class WidgetEffects {

    constructor(
        private actions$: Actions,
        private widgetDbService: WidgetDbService
    ) {}

    @Effect() public fetchAllWidgets$ = this.actions$
        .pipe(
            ofType(WidgetActions.FETCH_ALL_WIDGETS),
            switchMap(() => {
                return this.widgetDbService.fetchAllWidgets()
                    .pipe(
                        map(res => new WidgetActions.FetchAllWidgetsSuccess(res)),
                        catchError(err => of(new WidgetActions.FetchAllWidgetsFail(err)))
                    )
            })
        );


    @Effect() public fetchWidgetsByChallengeByUser$ = this.actions$
        .pipe(
            ofType(WidgetActions.FETCH_CHALLENGE_USER_WIDGETS),
            switchMap((action: YAction<clgu.widgets.ChallengeUserWidgetData<any>>) => {
                const p = action.payload;
                return this.widgetDbService.fetchWidgetsByChallengeByUser(p.challengeId, p.userId)
                    .pipe(
                        map(res => new WidgetActions.FetchChallengeUserWidgetsSuccess({
                            challengeId: p.challengeId,
                            userId: p.userId,
                            data: res
                        })),
                        catchError(err => of(new WidgetActions.FetchChallengeUserWidgetsFail({
                            challengeId: p.challengeId,
                            userId: p.userId,
                            data: err
                        })))
                    )
            })
            
        );

    
    @Effect() public updateWidgetsByChallengeByUser$ = this.actions$
        .pipe(
            ofType(WidgetActions.UPDATE_CHALLENGE_USER_WIDGETS),
            switchMap((action: YAction<clgu.widgets.ChallengeUserWidgetData<string[]>>) => {
                const p = action.payload;

                return this.widgetDbService.updateWidgetsByChallengeByUser(
                    p.challengeId,
                    p.userId,
                    p.data
                )
                .pipe(
                    map(res => new WidgetActions.UpdateChallengeUserWidgetsSuccess({
                        challengeId: p.challengeId,
                        userId: p.userId,
                        data: res
                    })),
                    catchError(err => of(new WidgetActions.FetchChallengeUserWidgetsFail({
                        challengeId: p.challengeId,
                        userId: p.userId,
                        data: err
                    })))
                )
            })
        );

    
    @Effect() public fetchDataByWidgetsByChallengeByUser$ = this.actions$
        .pipe(
            ofType(WidgetActions.FETCH_CHALLENGE_USER_WIDGET_DATA),
            switchMap((action: YAction<clgu.widgets.ChallengeUserWidgetData<any>>) => {
                const p = action.payload;

                return this.widgetDbService.fetchDataByWidgetByChallengeByUser(
                    p.challengeId,
                    p.userId,
                    p.widgetId
                )
                .pipe(
                    map(res => new WidgetActions.FetchChallengeUserWidgetDataSuccess({
                        challengeId: p.challengeId,
                        userId: p.userId,
                        widgetId: p.widgetId,
                        data: res
                    })),
                    catchError(err => of(new WidgetActions.UpdateChallengeUserWidgetDataFail({
                        challengeId: p.challengeId,
                        userId: p.userId,
                        widgetId: p.widgetId,
                        data: err
                    })))
                )
            })
        );


    @Effect() public updateDataByWidgetsByChallengeByUser$ = this.actions$
        .pipe(
            ofType(WidgetActions.UPDATE_CHALLENGE_USER_WIDGET_DATA),
            switchMap((action: YAction<clgu.widgets.ChallengeUserWidgetData<any>>) => {
                const p = action.payload;

                return this.widgetDbService.updateDataByWidgetByChallengeByUser(
                    p.challengeId,
                    p.userId,
                    p.widgetId,
                    p.data
                )
                .pipe(
                    map(res => new WidgetActions.UpdateChallengeUserWidgetDataSuccess({
                        challengeId: p.challengeId,
                        userId: p.userId,
                        widgetId: p.widgetId,
                        data: res
                    })),
                    catchError(err => of(new WidgetActions.UpdateChallengeUserWidgetDataFail({
                        challengeId: p.challengeId,
                        userId: p.userId,
                        widgetId: p.widgetId,
                        data: err
                    })))
                )
            })
        );

}