import * as models from './common/models';

export interface Environment {
    apiKey: string;
    authDomain: string;
    databaseURL: string;
    projectId: string;
    production: boolean;
    storageBucket: string;
    messagingSenderId: string;
}

export interface Error {
    code: number;
    description: string;
}



export { models };

