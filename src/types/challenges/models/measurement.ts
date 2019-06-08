import { Measurement as iMeasurement } from '../measurement';
import { db } from '../db';
import { Option } from 'src/types/common';
import { FormControl } from '@angular/forms';

export class Measurement implements iMeasurement {
    category: string;
    id?: string;
    displayName: string;
    orderNo: number;
    type: "string" | "number" | "boolean" | "combine";
    value: any;
    formControl = new FormControl(this.value);


    constructor(id: string, dbObj: db.MeasurementObj) {
        this.id = id;
        if (dbObj) {
            this.displayName = dbObj.display_name;
            this.type = dbObj.type;
            this.value = dbObj.value;
            this.orderNo = dbObj.order_no;
            this.category = dbObj.category;
        }
        this.formControl.setValue(this.value || null);
    }


    get filled(): boolean {
        return this.formControl.value !== null;
    }



    public getDbObj(): db.MeasurementObj {
        const res = {
            id: this.id,
            display_name: this.displayName,
            type: this.type,
            value: this.formControl.value,
            order_no: this.orderNo
        } as db.MeasurementObj;
        if (this.category) {
            res.category = this.category
        }
        return res;

    }
}