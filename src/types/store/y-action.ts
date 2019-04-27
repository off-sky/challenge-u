import { Action } from "@ngrx/store";

export interface YAction<T> extends Action {
    payload: T;
}