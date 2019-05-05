import { Action } from '@ngrx/store';

export class AppActions {
    public static readonly IDLE_ACTION = '[App] IDLE_ACTION';

    public static readonly IdleAction = class implements Action {
        public readonly type: string = AppActions.IDLE_ACTION;
        constructor(public payload?: any) {}
    }
}