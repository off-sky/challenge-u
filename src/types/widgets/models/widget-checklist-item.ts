import { FormControl } from '@angular/forms';
import * as db from '../db';

export class WidgetChecklistItem {
    public id: string;
    public name: string;
    public iconUrl: string;
    public control: FormControl;
    constructor(dbObj: db.WidgetInfo, checked: boolean) {
        this.id = dbObj.id;
        this.name = dbObj.name;
        this.iconUrl = dbObj.iconUrl;
        this.control = new FormControl(checked);
    }
}