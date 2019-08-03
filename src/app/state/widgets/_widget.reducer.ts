import { WidgetState, WidgetInitialState } from './_widget.state';
import { YAction } from 'src/types/store';
import { clgu } from 'src/types';
import { WidgetActions } from './_widget.actions';
import { UpdatableDataObject } from 'src/types/common';

export function widgetReducer(state: WidgetState = WidgetInitialState, action: YAction<any>): WidgetState {
    const newState = clgu.utils.cloneDeep(state) as WidgetState;

    switch (action.type) {
        case WidgetActions.FETCH_ALL_WIDGETS_SUCCESS: {
            const payload = action.payload as clgu.widgets.Widgets;
            newState.allWidgets = payload;
            return newState;
        }

        case WidgetActions.FETCH_CHALLENGE_USER_WIDGETS: {
            const payload = action.payload as clgu.widgets.ChallengeUserWidgetData<string[]>;
            newState.challengeUserWidgets[payload.challengeId] = {
                [payload.userId]: {
                    loading: true,
                    widgets: new UpdatableDataObject<string[]>(null, [])
                }
            }
            return newState;
        }

        case WidgetActions.FETCH_CHALLENGE_USER_WIDGETS_SUCCESS: {
            const payload = action.payload as clgu.widgets.ChallengeUserWidgetData<string[]>;
            newState.challengeUserWidgets[payload.challengeId] = newState.challengeUserWidgets[payload.challengeId] || {};
            newState.challengeUserWidgets[payload.challengeId][payload.userId] = {
                loading: false,
                widgets: new clgu.common.UpdatableDataObject(null, payload.data)
            }    
            return newState;
        }

        case WidgetActions.UPDATE_CHALLENGE_USER_WIDGETS_SUCCESS: {
            const payload = action.payload as clgu.widgets.ChallengeUserWidgetData<string[]>;
            newState.challengeUserWidgets[payload.challengeId] = newState.challengeUserWidgets[payload.challengeId] || {};
            newState.challengeUserWidgets[payload.challengeId][payload.userId] = {
                loading: false,
                widgets: new clgu.common.UpdatableDataObject(null, payload.data)
            }    
            return newState;
        }

        default: return newState;
    }
}