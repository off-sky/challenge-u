import { WidgetComponentTypes } from './widget-component-type';

export interface Widget {
    id: string;
    component: WidgetComponentTypes;
    name: string;
    iconUrl: string;
}