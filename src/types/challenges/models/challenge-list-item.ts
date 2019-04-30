import { ChallengeBase } from "../challenge-base";
import { db } from '../db';

export class ChallengeListItem implements ChallengeBase {
    createdAt: Date;
    id: string;
    name: string;
    description?: string;
    ownerId: string;

    constructor(dbObj: db.ChallengeObj) {
        this.id = dbObj.id;
        this.name = dbObj.name;
        this.description = dbObj.description;
        this.createdAt = new Date(dbObj.created_at);
    }
}