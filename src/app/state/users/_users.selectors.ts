import { AppState } from '../app.state';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { clgu } from 'src/types';
import { map, filter } from 'rxjs/operators';

export class UsersSelectors {

    public static readonly userProfiles$ = function (store: Store<AppState>, userIds?: string[]): Observable<clgu.users.db.UserLike[]> {
        return store.select(state => state.users.users.items)
            .pipe(
                filter(userObj => !!userObj),
                clgu.common.untilDataObjectChanged(),
                map(userObj => {
                    const data = userObj.data;
                    if (!userIds) {
                        return Object.keys(data)
                            .map(userId => data[userId]);
                    }
                    return userIds.map(userId => data[userId])
                        .filter(u => !!u);
                })
            );
    }
}