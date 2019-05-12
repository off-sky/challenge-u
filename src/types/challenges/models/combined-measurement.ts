import { Measurement as iMeasurement } from '../measurement';
import { FormControl, FormGroup } from '@angular/forms';
import { Option } from 'src/types/common';
import { db } from '../db';
import * as math from 'mathjs-expression-parser';
import { startWith, filter, switchMap, map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';

export class CombinedMeasurement implements iMeasurement {
    id?: string;
    displayName: string;
    category: string;
    orderNo: number;
    type: "string" | "number" | "boolean" | "combine";
    formula?: Option[];
    value?: any;
    formControl?: FormControl = new FormControl({ value: '', disabled: true });

    private fg$: BehaviorSubject<FormGroup> = new BehaviorSubject<FormGroup>(null);
    private keyNormalizedMap = {}
    private getKeyCounter = 0;
    private vars = [
        'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n'
    ];

    get filled(): boolean {
        return this.value !== undefined && this.formControl.value !== null;
    }

    
    constructor(id: string, dbObj: db.MeasurementObj) {
        this.id = id;
        if (dbObj) {
            this.displayName = dbObj.display_name;
            this.type = dbObj.type;
            this.value = dbObj.value;
            this.orderNo = dbObj.order_no;
            this.category = dbObj.category;
            if (dbObj.formula) {
                const fKeys =  Object.keys(dbObj.formula);
                fKeys.sort((a, b) => parseInt(a, 10) - parseInt(b, 10))
                this.formula = fKeys.map(key => dbObj.formula[key]);
            }
            this.formControl.setValue(this.value || null);

            this.fg$
            .pipe(
                filter(fg => !!fg),
                switchMap(fg => {
                    return fg.valueChanges
                        .pipe(
                            startWith(fg.value),
                            map(() => fg)
                        )
                })
            )
            .subscribe((fg) => {
                console.log({ me: this.id, ...fg.value});
                const keys = Object.keys(fg.controls);
                if (!keys.some(key => fg.get(key).value === undefined || fg.get(key).value === null)) {
                    const scope = {};
                    keys.forEach(key => {
                        scope[this.getNormalizedId(key)] = fg.get(key).value;
                    });
                    const parseStr = this.formula.map(o => {
                        if (o.metadata === 'measurement') {
                            return this.getNormalizedId(o.value);
                        }
                        return o.value;
                    }).join(' ');
                    console.log({ parseStr, scope })
                    const val = math.eval(parseStr, scope);
                    this.formControl.setValue(val);
                } else {
                    this.formControl.setValue(null);
                }
            })
        }
    }

    public getNormalizedId(id: string): string {
        if (this.keyNormalizedMap[id]) {
            return this.keyNormalizedMap[id]
        } else {
            this.keyNormalizedMap[id] = this.vars[this.getKeyCounter++];
            return this.keyNormalizedMap[id];
        }
    }


    public setFormGroup(fg: FormGroup) {
        this.fg$.next(fg);
    }


    
    public getDbObj(): db.MeasurementObj {
        const res = {
            id: this.id,
            display_name: this.displayName,
            type: this.type,
            value: this.formControl.value,
            order_no: this.orderNo
        } as db.MeasurementObj;
        if (this.formula) {
            const formula = {};
            this.formula.forEach((f, i) => {
                formula['' + i] = f;
            })
            res.formula = formula;
        }
        return res;

    }

}