import { Component, OnInit, Input } from '@angular/core';
import { clgu } from 'src/types';

@Component({
  selector: 'y-display-measurements',
  templateUrl: './display-measurements.component.html',
  styleUrls: ['./display-measurements.component.scss']
})
export class DisplayMeasurementsComponent implements OnInit {

  @Input() public showAll: boolean;
  @Input() public measurements: clgu.challenges.MeasurementList;
  public filled: clgu.challenges.MeasurementCategory[];

  constructor() { }

  ngOnInit() {
    if (this.measurements) {
      if (this.showAll) {
        this.filled = this.measurements.categories;
      } else {
        this.filled = this.measurements.filled();
        console.log({ filled: this.filled })
      }
     
    }

  }

  public empty(): boolean {
    return this.filled.length === 0;
  }


}
