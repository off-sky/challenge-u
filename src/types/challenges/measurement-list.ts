import { MeasurementCategory } from "./measurement-category";
import { db } from './db';
import { Measurement } from "./measurement";
import { Measurement as MeasurementModel } from './models/measurement'
import { CombinedMeasurement } from './models/combined-measurement';
import { startWith } from "rxjs/operators";
import { FormControl } from "@angular/forms";
import { FormGroup } from "@angular/forms";

export class MeasurementList {
    categories: MeasurementCategory[];

    constructor(measDb: db.Measurements) {
        const categoryObj = {};
        if (measDb) {
            const measArr = this.getMeasurements(measDb);

            measArr.sort((a, b) => a.orderNo - b.orderNo);

            measArr.forEach(mDb => {
                const category = mDb.category || 'no_cat';
                if (categoryObj[category] === undefined) {
                    categoryObj[category] = [];
                }
                categoryObj[category].push(mDb);
            });

            const catArr = Object.keys(categoryObj)
                    .map(key => categoryObj[key]);

            catArr.sort((a, b) => a[0].orderNo - b[0].orderNo);

            this.categories = catArr.map(mm => new MeasurementCategory(mm));
        }
    }


    public measurements(): Measurement[] {
        if (this.categories) {
            return this.categories.reduce((prev, curr) => {
                return [...prev, ...curr.measurements]
            }, [])
        }
        return [];
    }

    public filled(): MeasurementCategory[] {
        const filledCat = this.categories.filter(c => c.measurements.some(f => f.filled))
        const filledCopy = filledCat.slice();
        filledCopy.forEach(fc => {
            fc.measurements = fc.measurements.filter(m => m.filled);
        });
        return filledCopy;
    }


    private getMeasurements(measDbObj: db.Measurements): Measurement[] {
        if (measDbObj) {
            const measMap = {} as { [id: string]: MeasurementModel |  CombinedMeasurement };
            const measKeys = Object.keys(measDbObj);
            measKeys.forEach(mKey => {
                const measDb = measDbObj[mKey];
                if (measDb.type !== 'combine') {
                    const meas = new MeasurementModel(mKey, measDb);
                    measMap[mKey] = meas;
                } else {
                    const meas = new CombinedMeasurement(mKey, measDb);
                    measMap[mKey] = meas;
                }
            })
            measKeys.forEach(mKey => {
                const meas = measMap[mKey];
                if (meas.type === 'combine') {
                    const measC = meas as CombinedMeasurement;
                    const formGroupObj = {};
                    measC.formula.forEach(option => {
                        if (option.metadata === 'measurement') {
                            const fc = new FormControl();
                            measMap[option.value].formControl.valueChanges
                                .pipe(startWith(measMap[option.value].formControl.value))
                                .subscribe(val => fc.setValue(val));
                            formGroupObj[option.value] = fc;
                        }
                    });
                    measC.setFormGroup(new FormGroup(formGroupObj));
                }
            });

            const res = Object.keys(measMap).map(id => measMap[id]);
            res.sort((a, b) => a.orderNo - b.orderNo);
            return res;
        }
        return [];
    }
}