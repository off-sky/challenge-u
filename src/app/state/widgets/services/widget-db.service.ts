import { Injectable } from '@angular/core';
import { DatabaseService } from 'src/app/core/services/database.service';
import { Observable } from 'rxjs';
import { clgu } from 'src/types';
import { take, map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class WidgetDbService {

    private ALL_WIDGETS_REF = 'widgets';
    private WIDGET_BY_CHALLENGE_BY_USER_REF = 'challenges_users_widgets';

    constructor(
        private dbService: DatabaseService
    ) {}


    public fetchAllWidgets(): Observable<clgu.widgets.Widgets> {
        return this.dbService.listen(this.ALL_WIDGETS_REF)
            .pipe(
                take(1)
            )
    }


    public fetchWidgetsByChallengeByUser(challengeId: string,
                                         userId: string): Observable<string[]> {
        const path = `${this.WIDGET_BY_CHALLENGE_BY_USER_REF}/${challengeId}/${userId}`;
        return this.dbService.readOnce(path)
            .pipe(
                map((res: clgu.widgets.db.UserWidgets) => res ? Object.keys(res) : [])
            );
    }


    public updateWidgetsByChallengeByUser(challengeId: string,
                                          userId: string,
                                          widgetIds: string[]): Observable<string[]> {
        const wUpdateObj = this.getWidgetObject(widgetIds);
        const path = `${this.WIDGET_BY_CHALLENGE_BY_USER_REF}/${challengeId}/${userId}`;
        return this.dbService.set(path, wUpdateObj)
            .pipe(
                map(() => widgetIds)
            );
    }


    private getWidgetObject(widgetIds: string[]): clgu.widgets.db.UserWidgets {
        if (!widgetIds || widgetIds.length === 0) {
            return null;
        }
        const res = {};
        widgetIds.forEach(wId => res[wId] = wId);
        return res;
    }

}