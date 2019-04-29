import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

interface DateListItem {
  date: Date;
  displayDate: string;
  isSelected: boolean;
}



@Component({
  selector: 'y-date-selector',
  templateUrl: './month-selector.component.html',
  styleUrls: ['./month-selector.component.scss']
})
export class MonthSelectorComponent implements OnInit {

  @Input() public dates: Date[] = [];
  @Input() public dateType: 'month' | 'year' = 'month';
  public list: DateListItem[] = [];

  @Output() public selectedChanged: EventEmitter<Date[]> = new EventEmitter<Date[]>();

  constructor() { }

  ngOnInit() {
    this.setDates(this.dates);
  }

  public getDisplayDate(d: Date): string {
    const m = moment(d);
    if (this.dateType === 'month') {
      return m.format('MMMM YYYY');
    }
    if (this.dateType === 'year') {
      return m.format('YYYY');
    }
   
  }


  public onDateClick(l: DateListItem): void {
    l.isSelected = !l.isSelected;
    const newDates = this.list.filter(l => l.isSelected)
                          .map(l => l.date);
    this.selectedChanged.emit(newDates);
  }


  public setDates(dates: Date[]): void {
      this.list = dates.map(d => ({
        date: d,
        displayDate: this.getDisplayDate(d),
        isSelected: true
      }));
  }

}
