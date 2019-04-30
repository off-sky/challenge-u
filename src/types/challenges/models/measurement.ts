import { Measurement as iMeasurement } from '../measurement';
import { db } from '../db';

export class Measurement implements iMeasurement {
    id?: string;
    displayName: string;
    type: "string" | "number" | "boolean";
    value: any;

    constructor(id: string, dbObj: db.MeasurementObj) {
        this.id = id;
        if (dbObj) {
            this.displayName = dbObj.display_name;
            this.type = dbObj.type;
            this.value = dbObj.value;
        }
    }


    get filled(): boolean {
        return this.value !== undefined;
    }



    public getDbObj(): db.MeasurementObj {
        return {
            display_name: this.displayName,
            type: this.type,
            value: this.value
        }
    }
}