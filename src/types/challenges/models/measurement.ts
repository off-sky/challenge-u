import { Measurement as iMeasurement } from '../measurement';
import { db } from '../db';

export class Measurement implements iMeasurement {
    id?: string;
    displayName: string;
    type: "string" | "number" | "boolean";
    value?: string | number | boolean;
    filled = false;

    constructor(id: string, dbObj: db.MeasurementObj) {
        this.id = id;
        if (dbObj) {
            this.displayName = dbObj.display_name;
            this.type = dbObj.type;
            this.value = dbObj.value;
            this.filled = this.value !== undefined;
        }
    }
}