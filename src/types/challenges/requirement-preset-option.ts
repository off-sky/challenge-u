import { db } from './db';


export class RequirementPresetOption {
    displayName: string;
    requirements: db.Requirements;

    constructor(reqObj: db.Requirements) {
        this.displayName = '';
        Object.keys(reqObj).forEach((reqId)=> {
            const req = reqObj[reqId];
            this.displayName += `${req.category} - ${req.display_name}; `;
        });
        this.requirements = reqObj;
    }
}