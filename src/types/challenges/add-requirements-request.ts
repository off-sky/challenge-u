import { db } from './db';

export interface AddRequirementsRequest {
    challengeId: string;
    userId: string;
    dates: number[];
    requirements: db.Requirements;
}