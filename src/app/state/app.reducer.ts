import { routerReducer } from "@ngrx/router-store";
import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { storeFreeze } from "ngrx-store-freeze";
import { environment } from "../../environments/environment"
import { AppState } from './app.state';

import { authReducer } from './auth/_auth.reducer';



export const appReducer: ActionReducerMap<AppState> = {
  router: routerReducer,
  auth: authReducer
};

export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function(state: AppState, action: any): AppState {
    console.log('...............................................');
    console.log("action", action);
    console.log("state", state);
    console.log('...............................................');
    return reducer(state, action);
  };
}

export const appMetaReducers: MetaReducer<AppState>[] = !environment.production
  ? [logger, storeFreeze]
  : [];