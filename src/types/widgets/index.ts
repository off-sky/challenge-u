import * as timer from './timer';
import * as db from './db';
import * as models from './models';
import { Widget } from './widget';
import * as components from './widget-components';
export * from './widget-component-type';
export { ChallengeUserWidgetData } from './challenge-user-widget-data';
export { db, models, timer, components, Widget };

export interface Widgets {
    [widgetId: string]: db.WidgetInfo;
}