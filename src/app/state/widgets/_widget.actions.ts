import { Action } from '@ngrx/store';
import { clgu } from 'src/types';

export class WidgetActions {
    public static readonly FETCH_ALL_WIDGETS = '[Widgets] FETCH_ALL_WIDGETS';
    public static readonly FETCH_ALL_WIDGETS_SUCCESS = '[Widgets] FETCH_ALL_WIDGETS_SUCCESS';
    public static readonly FETCH_ALL_WIDGETS_FAIL = '[Widgets] FETCH_ALL_WIDGETS_FAIL';

    public static readonly FETCH_CHALLENGE_USER_WIDGETS = '[Widgets] FETCH_CHALLENGE_USER_WIDGETS';
    public static readonly FETCH_CHALLENGE_USER_WIDGETS_SUCCESS = '[Widgets] FETCH_CHALLENGE_USER_WIDGETS_SUCCESS';
    public static readonly FETCH_CHALLENGE_USER_WIDGETS_FAIL = '[Widgets] FETCH_CHALLENGE_USER_WIDGETS_FAIL';

    public static readonly UPDATE_CHALLENGE_USER_WIDGETS = '[Widgets] UPDATE_CHALLENGE_USER_WIDGETS';
    public static readonly UPDATE_CHALLENGE_USER_WIDGETS_SUCCESS = '[Widgets] UPDATE_CHALLENGE_USER_WIDGETS_SUCCESS';
    public static readonly UPDATE_CHALLENGE_USER_WIDGETS_FAIL = '[Widgets] UPDATE_CHALLENGE_USER_WIDGETS_FAIL';

    public static readonly FETCH_CHALLENGE_USER_WIDGET_DATA = '[Widgets] FETCH_CHALLENGE_USER_WIDGET_DATA';
    public static readonly FETCH_CHALLENGE_USER_WIDGET_DATA_SUCCESS = '[Widgets] FETCH_CHALLENGE_USER_WIDGET_DATA_SUCCESS';
    public static readonly FETCH_CHALLENGE_USER_WIDGET_DATA_FAIL = '[Widgets] FETCH_CHALLENGE_USER_WIDGET_DATA_FAIL';

    public static readonly UPDATE_CHALLENGE_USER_WIDGET_DATA = '[Widgets] UPDATE_CHALLENGE_USER_WIDGET_DATA';
    public static readonly UPDATE_CHALLENGE_USER_WIDGET_DATA_SUCCESS = '[Widgets] UPDATE_CHALLENGE_USER_WIDGET_DATA_SUCCESS';
    public static readonly UPDATE_CHALLENGE_USER_WIDGET_DATA_FAIL = '[Widgets] UPDATE_CHALLENGE_USER_WIDGET_DATA_FAIL';

    public static readonly FetchAllWidgets = class implements Action {
       public readonly type = WidgetActions.FETCH_ALL_WIDGETS;
       constructor() {
       }
    }

    public static readonly FetchAllWidgetsSuccess = class implements Action {
        public readonly type = WidgetActions.FETCH_ALL_WIDGETS_SUCCESS;
        constructor(public payload: clgu.widgets.Widgets) {
        }
    }

    public static readonly FetchAllWidgetsFail = class implements Action {
        public readonly type = WidgetActions.FETCH_ALL_WIDGETS_FAIL;
        constructor(public payload: clgu.common.Error) {
        }
    }


    public static readonly FetchChallengeUserWidgets = class implements Action {
        public readonly type = WidgetActions.FETCH_CHALLENGE_USER_WIDGETS;
        constructor(public payload: clgu.widgets.ChallengeUserWidgetData<any>) {
        }
    }

    public static readonly FetchChallengeUserWidgetsSuccess = class implements Action {
        public readonly type = WidgetActions.FETCH_CHALLENGE_USER_WIDGETS_SUCCESS;
        constructor(public payload: clgu.widgets.ChallengeUserWidgetData<string[]>) {
        }
    }

    public static readonly FetchChallengeUserWidgetsFail = class implements Action {
        public readonly type = WidgetActions.FETCH_CHALLENGE_USER_WIDGETS_FAIL;
        constructor(public payload: clgu.widgets.ChallengeUserWidgetData<clgu.common.Error>) {
        }
    }


    public static readonly UpdateChallengeUserWidgets = class implements Action {
        public readonly type = WidgetActions.UPDATE_CHALLENGE_USER_WIDGETS;
        constructor(public payload: clgu.widgets.ChallengeUserWidgetData<string[]>) {
        }
    }

    public static readonly UpdateChallengeUserWidgetsSuccess = class implements Action {
        public readonly type = WidgetActions.UPDATE_CHALLENGE_USER_WIDGETS_SUCCESS;
        constructor(public payload: clgu.widgets.ChallengeUserWidgetData<string[]>) {
        }
    }

    public static readonly UpdateChallengeUserWidgetsFail = class implements Action {
        public readonly type = WidgetActions.UPDATE_CHALLENGE_USER_WIDGETS_FAIL;
        constructor(public payload: clgu.widgets.ChallengeUserWidgetData<clgu.common.Error>) {
        }
    }

    public static readonly FetchChallengeUserWidgetData = class implements Action {
        public readonly type = WidgetActions.FETCH_CHALLENGE_USER_WIDGET_DATA;
        constructor(public payload: clgu.widgets.ChallengeUserWidgetData<any>) {
        }
    }

    public static readonly FetchChallengeUserWidgetDataSuccess = class implements Action {
        public readonly type = WidgetActions.FETCH_CHALLENGE_USER_WIDGET_DATA_SUCCESS;
        constructor(public payload: clgu.widgets.ChallengeUserWidgetData<any>) {
        }
    }

    public static readonly FetchChallengeUserWidgetDataFail = class implements Action {
        public readonly type = WidgetActions.FETCH_CHALLENGE_USER_WIDGET_DATA_FAIL;
        constructor(public payload: clgu.widgets.ChallengeUserWidgetData<clgu.common.Error>) {
        }
    }

    public static readonly UpdateChallengeUserWidgetData = class implements Action {
        public readonly type = WidgetActions.UPDATE_CHALLENGE_USER_WIDGET_DATA;
        constructor(public payload: clgu.widgets.ChallengeUserWidgetData<any>) {
        }
    }

    public static readonly UpdateChallengeUserWidgetDataSuccess = class implements Action {
        public readonly type = WidgetActions.UPDATE_CHALLENGE_USER_WIDGET_DATA_SUCCESS;
        constructor(public payload: clgu.widgets.ChallengeUserWidgetData<any>) {
        }
    }

    public static readonly UpdateChallengeUserWidgetDataFail = class implements Action {
        public readonly type = WidgetActions.UPDATE_CHALLENGE_USER_WIDGET_DATA_FAIL;
        constructor(public payload: clgu.widgets.ChallengeUserWidgetData<clgu.common.Error>) {
        }
    }

}