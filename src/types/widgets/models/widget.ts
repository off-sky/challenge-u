import * as i from '../widget';
import { WidgetComponentTypes } from '../widget-component-type';
import * as db from '../db';

export class Widget implements i.Widget {
    id: string;
    component: WidgetComponentTypes;
    name: string;
    iconUrl: string;

    constructor(dbObj?: db.WidgetInfo) {
        if (dbObj) {
            this.id = dbObj.id;
            this.component = dbObj.component as WidgetComponentTypes;
            this.iconUrl = dbObj.iconUrl;
            this.name = dbObj.name;
        }
    }
}