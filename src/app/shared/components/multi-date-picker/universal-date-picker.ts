import * as moment from 'moment';

// tslint:disable-next-line: no-namespace
export module udpkr {


    export const getMomentId = function(m: moment.Moment): string {
        return m.format('MM-Do-YYYY');
    }

    export type DayColor = 'green' | 'dark-green' | 'grey' | 'pink' | 'grey-border' | 'primary';


    export type ColorType = 'background' | 'border';


    export class ColorTypes {
        public static readonly BACKGROUND: ColorType = 'background';
        public static readonly BORDER: ColorType = 'border';
    }



    export class DayColors {
        public static readonly GREEN: DayColor          = 'green';
        public static readonly DARK_GREEN: DayColor     = 'dark-green';
        public static readonly GREY: DayColor           = 'grey';
        public static readonly PINK: DayColor           = 'pink';
        public static readonly PRIMARY: DayColor        = 'primary';
        public static readonly GREY_BORDER: DayColor    = 'grey-border';
    }

    export const ColorTypeMap: { [color: string]: ColorType }  = {
        [ DayColors.GREEN ]         : ColorTypes.BACKGROUND,
        [ DayColors.DARK_GREEN ]    : ColorTypes.BACKGROUND,
        [ DayColors.GREY ]          : ColorTypes.BACKGROUND,
        [ DayColors.PINK ]          : ColorTypes.BACKGROUND,
        [ DayColors.PRIMARY ]       : ColorTypes.BACKGROUND,
        [ DayColors.GREY_BORDER ]   : ColorTypes.BORDER,
    };


    export class ColorChange {
        color: DayColor;
        moments: moment.Moment[];

        constructor(color: DayColor, moments: moment.Moment[]) {
                this.color = color;
                this.moments = moments;
        }
    }

    export interface LegendItem {
        color: DayColor;
        description: string;
    }

    export interface DayTooltip {
        day: moment.Moment;
        tooltip: string;
    }
}