import { clgu } from 'src/types';


export interface WidgetState {
    allWidgets: {
        [widgetId: string]: clgu.widgets.db.WidgetInfo;
    };
    challengeUserWidgets: {
        [challengeId: string]: {
            [userId: string]:{
                loading: boolean;
                widgets: clgu.common.UpdatableDataObject<string[]>
            }
        }
    };
    challengeUserWidgetData: {
        [challengeId: string]: {
            [userId: string]: {
                [widgetId: string]: clgu.common.UpdatableDataObject<any>;
            }
        }
    }
}


export const WidgetInitialState: WidgetState = {
    allWidgets: {},
    challengeUserWidgets: {},
    challengeUserWidgetData: {}
}