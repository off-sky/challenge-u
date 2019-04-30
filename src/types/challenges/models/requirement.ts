import { Requirement as iRequirement } from '../requirement';
import { db } from '../db';

export class Requirement implements iRequirement {
    id: string;
    displayName: string;
    completed: boolean;
    category: string;

    constructor(id: string, dbObj: db.RequirementObj) {
        this.id = id;
        if (dbObj) {
            this.displayName = dbObj.display_name;
            this.category = dbObj.category;
            this.completed = dbObj.completed;
        }
    }

    public getDbObj(): db.RequirementObj {
        return {
            display_name: this.displayName,
            category: this.category,
            completed: this.completed
        }
    }
}