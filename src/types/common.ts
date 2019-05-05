import * as models from './common/models';
import { distinctUntilChanged } from 'rxjs/operators';


export const MAX_ACTIVITIES = 300;

export interface Environment {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    production: boolean;
    storageBucket: string;
    messagingSenderId: string;
}

export class UpdatableDataObject<T> {
    id?: string;
    data?: T;
    error?: Error;
    lastUpdated: number;

    constructor(id?: string, data?: T, error?: Error) {
        this.id = id;
        this.data = data;
        this.error = error;
        this.lastUpdated = new Date().getTime();
    }
}

export function untilDataObjectChanged() {
    return distinctUntilChanged<UpdatableDataObject<any>>(((a, b) => {
        if (a === b) return true;
        if (a && b && a.lastUpdated === b.lastUpdated) return true;
        return false;
    }));
}

export interface ReloadInfoRequest {
    ids: string[];
    force?: boolean;
}

export interface UpdateRequest {
    id: string;
    data?: any;
}

export interface Error {
    code: number;
    description: string;
}


export interface ErrorWithId {
    id: string;
    error: Error;
}



export { models };

