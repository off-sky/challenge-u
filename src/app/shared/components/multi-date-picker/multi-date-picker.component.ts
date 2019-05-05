import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import * as moment from 'moment';
import { udpkr } from './universal-date-picker';
import { FormControl } from '@angular/forms';

// The calendar day object
interface Day {
  css?: string;
  date: moment.Moment;
  mdp: {
    future: boolean;
    inactive: boolean;
    otherMonth: boolean;
    past: boolean;
    today: boolean;
    selected: boolean;
    colors: udpkr.DayColor[];
    tooltip?: string;
  };
  selectable: boolean;
}

// Week days displayed as the top row of the calendar
interface WeekDay {
  displayName: string;
  order: number;
  selected: boolean;
  disabled: boolean;
}

@Component({
  selector: 'y-multi-date-picker',
  templateUrl: './multi-date-picker.component.html',
  styleUrls: ['./multi-date-picker.component.scss']
})
export class MultiDatePickerComponent implements OnInit {

  @Input() public control: FormControl;


  /**
   * Datepicker marks selected dates with primary color
   */
  @Input() public defaultBehavior: boolean;

  /**
   * Set days allowed (only these dates will be selectable)
   */
  @Input() public daysAllowed: moment.Moment[];
  
  /**
   * Whether datepicker selects only one date
   */
  @Input() public isSingle: boolean;
  /**
   * If filled will disable all days before this one (not included)
   */
  @Input() public disableDaysBefore: moment.Moment;

  /**
   * Disable date selection for the calendar
   */
  @Input() public disabled: boolean;
  /**
   * If filled will disable all days after this one (not included)
   */
  @Input() public disableDaysAfter: moment.Moment;

  /**
   * Diable calendar navigation before the month screen
   * of the specified month
   */
  @Input() public disableMonthsBefore: moment.Moment;

  /**
   * Diable calendar navigation before the month screen
   * of the specified month
   */
  @Input() public disableMonthsAfter: moment.Moment;

  /**
   * If true can't go back in months before today's month
   * Default is false.
   */
  @Input() public disallowBackPastMonths: boolean;
  /**
   * if true can't go in future months after today's month
   * Default is false.
   */
  @Input() public disallowGoFutureMonths: boolean;

  /**
   * Non-clickable days
   */
  @Input() public inactiveDays: moment.Moment[];

  /**
   * Sets initial selected dates.
   * This array will not mutate when user select/unselect a date.
   * Defauls is [].
   */
  @Input() public initialDates: moment.Moment[];
  /**
   * Month to be displayed. Default is the current month
   */
  @Input() public month: moment.Moment;
  /**
   * If true empty boxes will be filled with days of previous/next month.
   * Default is false
   */
  @Input() public showDaysOfSurroundingMonths: boolean;
  /**
   * Sunday be the first day of week, default will be Monday
   * Default is false.
   */
  @Input() public sundayFirstDay: boolean;

  /**
   * Display text on hover on some dates
   */
  @Input() public tooltips: udpkr.DayTooltip[];

  /**
   * Emits currently selected dates
   */
  @Output() public selectedChanged = new EventEmitter<moment.Moment[]>();

   /**
   * Emits current month on month change
   */
  @Output() public monthChanged = new EventEmitter<moment.Moment>();


  public days: Day[] = [];
  public daysOfWeek: WeekDay[]; // holds week day names (S, M, T, W, T, F, S)
  public disableBackButton: boolean = false;
  public disableNextButton: boolean = false;
  public monthToDisplay: string;
  public yearToDisplay: string;

  private selected: moment.Moment[] = []; // resulted selected dates
  private readonly colorMap: { [momentId: string]: udpkr.DayColor[] } = {};
  private tooltipMap: { [momentId: string ]: string } = {};
  private allowedDaysMap: { [momentId: string]: true };
  private inactiveMap: { [momentId: string]: boolean } = {};
  private readonly colorTypeMap = udpkr.ColorTypeMap;


  // Navigates to another month
  public changeMonth(event: MouseEvent, disable: boolean, add: number) {
    if (disable) {
      return;
    }
    event.preventDefault();
    this.month = moment(this.month).add(add, 'month');
    this.monthChanged.emit(this.month);
    this.generate();
  }

  /**
   * Batch apply colors to reduce UI updates
   */
  public async applyColors(changes: udpkr.ColorChange[]): Promise<void> {
      changes.forEach(ch => {
        ch.moments.forEach(m => {
            const id = this.getMomentId(m);
            if (this.colorMap[id] === undefined) {
              this.colorMap[id] = [];
            }
            this.colorMap[id].push(ch.color);
        });
      });

      this.generate();
  }

  /**
   * Deletes specified colors for all days
   */
  public resetColors(colors?: udpkr.DayColor[]): void {
    if (!colors) {
        Object.keys(this.colorMap).forEach(mId => delete this.colorMap[mId]);
    } else {
      Object.keys(this.colorMap).forEach(mId => {
        this.colorMap[mId] = this.colorMap[mId].filter(color => colors.indexOf(color) < 0);
      });
    }
    this.generate();
  }

   /**
   * selects specified moments
   * @param moments 
   */
  public setSelected(moments: moment.Moment[]): void {
    this.selected.length = 0;
    moments.forEach(m => {
      const alReadySelected = this.selected.some(pm => pm.isSame(m, 'd'));
      if (!alReadySelected) {
        const day = this.days.find(d => d.date.isSame(m, 'd'));
        if (day) {
          day.mdp.selected = true;
        }
        this.selected.push(m);
      }
    });
    this.generate();
  }


  /**
   * deselects specified moments
   * @param moments 
   */
  public setDeselected(moments: moment.Moment[]): void {
    moments.forEach(m => {
      const selectedInd = this.selected.findIndex(pm => pm.isSame(m, 'd'));
      if (selectedInd >= 0) {
        const day = this.days.find(d => d.date.isSame(m, 'd'));
        if (day) {
          day.mdp.selected = false;
        }
        this.selected.splice(selectedInd, 1);
      }
    });
    this.generate();
  }



  public getDayClasses(day: Day): string {
    let css: string = '';
    if (day.css && (!day.mdp.otherMonth || this.showDaysOfSurroundingMonths)) {
      css += ' ' + day.css;
    }
    if (!day.selectable) {
      css += ' picker-off';
    }
    if (day.mdp.today) {
      css += ' today';
    }
    if (day.mdp.past) {
      css += ' past';
    }
    if (day.mdp.future) {
      css += ' future';
    }
    if (day.mdp.colors) {
      const bgColors = day.mdp.colors.filter(c => this.colorTypeMap[c] === udpkr.ColorTypes.BACKGROUND);
      const borderColors = day.mdp.colors.filter(c => this.colorTypeMap[c] === udpkr.ColorTypes.BORDER);
      const bg = bgColors.length > 0 ? bgColors[bgColors.length - 1] : undefined;
      const border = borderColors.length > 0 ? borderColors[borderColors.length - 1] : undefined;
      css += ` colored ${bg || ''} ${border || ''}`;
    }
    if (day.mdp.otherMonth) {
      css += ' picker-empty picker-other-month';
    }
    return css;
  }

  public getDayDate(day: Day): string {
    if (!day) {
      return '';
    }
    if (day.mdp.otherMonth && !this.showDaysOfSurroundingMonths) {
      return '';
    }
    return day.date.format('D');
  }

  public isSelected(day: Day): boolean {
    return this.selected.some((m: moment.Moment) => day.date.isSame(m, 'day'));
  }

  public ngOnInit(): void {
    this.initDefaultValues();
    this.initDaysOfWeek();
    this.generate();

    if (this.defaultBehavior) {
      if (this.control) {
        const selectedM = this.control.value.map(d => moment(d));
        this.setSelected(selectedM);
        this.applyColors([
          new udpkr.ColorChange(udpkr.DayColors.PRIMARY, selectedM)
        ]);
        this.control.valueChanges
          .subscribe(dates => {
            this.resetColors();
            const selectedM = this.control.value.map(d => moment(d));
            this.setSelected(selectedM);
            this.applyColors([
              new udpkr.ColorChange(udpkr.DayColors.PRIMARY, selectedM)
            ]);
          })
      }
    }
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.tooltips) {
        this.initTooltipMap();
    }
    if (changes.daysAllowed) {
      this.initAllowedDayMap();
    }
    if (changes.inactiveDays) {
      this.initInactiveMap();
    }
  }

  public dayClick(event: MouseEvent, day: Day) {
    if (this.isSingle) {
      this.dayClickSingle(event, day);
    } else {
      this.dayClickMulti(event, day);
    }
    if (this.control) {
      this.control.markAsTouched({ onlySelf: true });
      this.control.setValue(this.selected.map(m => m.toDate()));
    }
  }

  // Called when user clicks a date and the calendar is in single mode
  public dayClickSingle(event: MouseEvent, day: Day) {
    for (let i = 0; i < this.days.length; i++) {
      const currDay = this.days[i];
      currDay.mdp.selected = currDay.date.isSame(day.date);
    }
    this.selected.length = 0;
    this.selected.push(day.date);
    this.generate();
    this.selectedChanged.emit(this.selected);
    return;
  }

  // Called when user clicks a date and the calendar is in multi mode
  public dayClickMulti(event: MouseEvent, day: Day): void {

    event.preventDefault();
    if (day.mdp.otherMonth || !day.selectable) {
      return;
    }
    day.mdp.selected = !day.mdp.selected;
    // Add the day to the selected
    if (day.mdp.selected) {
      this.selected.push(day.date);
      this.generate();
      this.selectedChanged.emit(this.selected);
      return;
    }
    // Otherwise remove the day
    let index = -1;
    for (let i = 0; i < this.selected.length; ++i) {
      if (this.selected[i].isSame(day.date, 'day')) {
        index = i;
        break;
      }
    }
    if (index !== -1) {
      this.selected.splice(index, 1);
      this.generate();
      this.selectedChanged.emit(this.selected);
      return;
    }
    throw new Error(`Can't remove the day ${day} from the selected ${this.selected}`);
  }

  public weekDayClick(weekDay: WeekDay) {
    if (weekDay.disabled) {
      return;
    }
    if (!weekDay.selected) {
      for (let i = 0; i < this.days.length; i++) {
        const day = this.days[i];
        if (day.date.day() === weekDay.order
            && !day.mdp.selected
            && day.date.month() === this.month.month()
            && day.selectable) {
          this.selected.push(day.date);
          day.mdp.selected = true;
        }
      }
    } else {
      for (let j = 0; j < this.days.length; j++) {
        const day = this.days[j];
        if (day.mdp.selected &&
            day.date.day() === weekDay.order &&
            day.date.month() === this.month.month()) {
            day.mdp.selected = false;
        }
      }
      this.selected = this.selected.filter(date => !(date.day() === weekDay.order && date.month() === this.month.month()));

    }
    weekDay.selected = !weekDay.selected;
    this.generate();
    if (this.control) {
      this.control.markAsTouched({ onlySelf: true });
      this.control.setValue(this.selected.map(m => m.toDate()));
    }
    this.selectedChanged.emit(this.selected);
  }

  // Generates the calendar
  private generate(): void {

    this.monthToDisplay = this.month.format('MMM').toUpperCase();
    this.yearToDisplay = this.month.format('YYYY');

    let previousDay: moment.Moment = moment(this.month).date(0).day(this.sundayFirstDay ? 0 : 1).subtract(1, 'day');
    if (moment(this.month).date(0).diff(previousDay, 'day') > 6) {
      previousDay = previousDay.add(1, 'week');
    }
    const firstDayOfMonth: moment.Moment = moment(this.month).date(1);
    const days = [];
    const now: moment.Moment = moment();
    const lastDay: moment.Moment = moment(firstDayOfMonth).endOf('month');
    let maxDays = lastDay.diff(previousDay, 'days');
    const lastDayOfWeek = this.sundayFirstDay ? 6 : 0;
    if (lastDay.day() !== lastDayOfWeek) {
      maxDays += (this.sundayFirstDay ? 6 : 7) - lastDay.day();
    }
    for (let j = 0; j < maxDays; j++) {
      days.push(this.createDate(now, previousDay));
    }
    this.days = days;
    this.checkNavigationButtons();
    this.initDaysOfWeek();
  }

  // Checks whether previous/next buttons are allowed
  private checkNavigationButtons(): void {

    const today: moment.Moment = moment();
    const previousMonth: moment.Moment = moment(this.month).subtract(1, 'month');
    const nextMonth: moment.Moment = moment(this.month).add(1, 'month');
    this.disableBackButton = this.disallowBackPastMonths && today.isAfter(previousMonth, 'month') ||
                             (!!this.disableMonthsBefore && previousMonth.isBefore(this.disableMonthsBefore, 'month'));

    this.disableNextButton = this.disallowGoFutureMonths && today.isBefore(nextMonth, 'month') ||
                             (!!this.disableMonthsAfter  && nextMonth.isAfter(this.disableMonthsAfter, 'month'));
  }

  // Creates the calendar day object
  private createDate(now: moment.Moment, previousDay: moment.Moment): Day {

    const day = {
      date: moment(previousDay.add(1, 'day')),
      mdp: {
        selected: false
      }
    } as Day;
    day.selectable = !this.isDayOff(day);
    day.mdp.selected = this.isSelected(day);
    day.mdp.today = day.date.isSame(now, 'day');
    day.mdp.past = day.date.isBefore(now, 'day');
    day.mdp.future = day.date.isAfter(now, 'day');
    if (!day.date.isSame(this.month, 'month')) {
      day.mdp.otherMonth = true;
    } else {
      day.mdp.colors = this.colorMap[this.getMomentId(day.date)];
      if (this.tooltipMap[this.getMomentId(day.date)]) {
        day.mdp.tooltip = this.tooltipMap[this.getMomentId(day.date)];
      }
    }
    return day;
  }


  private initDaysOfWeek(): void {

    const momentDaysOfWeek: string[] = moment().localeData().weekdaysMin();
    const days: WeekDay[] = [];
    const sunday = {
      displayName: momentDaysOfWeek[0][0].toUpperCase(),
      order: 0,
      selected: this.isAllWeekDaysSelectedInThisMonth(0),
      disabled: this.isSingle
    };
    for (let i = 1; i < 7; i++) {
      const weekDay = {
        displayName: momentDaysOfWeek[i][0].toUpperCase(),
        order: i,
        selected: this.isAllWeekDaysSelectedInThisMonth(i),
        disabled: this.isSingle
      };
      days.push(weekDay);
    }
    if (this.sundayFirstDay) {
      days.splice(0, 0, sunday);
    } else {
      days.push(sunday);
    }
    this.daysOfWeek = days;
  }

  private isInactive(m: moment.Moment): boolean {
    return this.inactiveMap[udpkr.getMomentId(m)] !== undefined;
  }

  private getMomentId(m: moment.Moment): string {
    return m.format('YYYY MM DD');
  }

  // Checks if all such week days in the current month are selected
  private isAllWeekDaysSelectedInThisMonth(weekDayOrder: number): boolean {
    let weekHasSelectable = false;
    for (let i = 0; i < this.days.length; i++) {
      const day = this.days[i];
      if (day.selectable && day.date.day() === weekDayOrder && day.date.month() === this.month.month()) {
        weekHasSelectable = true;
      }
      if (day.selectable && day.date.day() === weekDayOrder && !day.mdp.selected && day.date.month() === this.month.month()) {
        return false;
      }
    }
    return weekHasSelectable;
  }

  // Checks if the date is unselectable
  public isDayOff(day: Day): boolean {

    if (this.disabled) {
      return true;
    }

    return (!!this.disableDaysBefore && moment(day.date).isBefore(this.disableDaysBefore, 'day')) ||
      (!!this.disableDaysAfter && moment(day.date).isAfter(this.disableDaysAfter, 'day')) ||
      (!!this.allowedDaysMap && !this.allowedDaysMap[this.getMomentId(day.date)]) ||
      this.isInactive(day.date);
  }

  private initDefaultValues(): void {
    if (typeof this.disallowBackPastMonths !== 'boolean') {
      this.disallowBackPastMonths = false;
    }
    if (typeof this.disallowGoFutureMonths !== 'boolean') {
      this.disallowGoFutureMonths = false;
    }
    this.initialDates = this.initialDates || [];
    this.initialDates.forEach((m: moment.Moment) => {
      this.selected.push(m);
    });
    this.month = this.month || moment().startOf('day');
    if (typeof this.showDaysOfSurroundingMonths !== 'boolean') {
      this.showDaysOfSurroundingMonths = false;
    }
    if (typeof this.sundayFirstDay !== 'boolean') {
      this.sundayFirstDay = false;
    }
  }


  private initTooltipMap(): void {
      this.tooltipMap = {};
      if (this.tooltips && this.tooltips.length > 0) {
        this.tooltips.forEach(t => {
            const id = this.getMomentId(t.day);
            this.tooltipMap[id] = t.tooltip;
        });
      }
  }

  private initAllowedDayMap(): void {
    if (this.daysAllowed) {
      this.allowedDaysMap = {};
      this.daysAllowed.forEach(m => {
        const momentId = this.getMomentId(m);
        this.allowedDaysMap[momentId] = true;
      })
    }
  }

  private initInactiveMap(): void {
    this.inactiveMap = {};
    if (this.inactiveDays) {
      this.inactiveDays.forEach(m => {
        this.inactiveMap[udpkr.getMomentId(m)] = true;
      });
    }
  }

}
