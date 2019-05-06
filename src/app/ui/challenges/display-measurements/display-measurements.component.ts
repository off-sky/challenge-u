import { Component, OnInit, Input } from '@angular/core';
import { clgu } from 'src/types';

@Component({
  selector: 'y-display-measurements',
  templateUrl: './display-measurements.component.html',
  styleUrls: ['./display-measurements.component.scss']
})
export class DisplayMeasurementsComponent implements OnInit {

  @Input() public showAll: boolean;
  @Input() public measurements: clgu.challenges.Measurement[];

  constructor() { }

  ngOnInit() {
  }

  public empty(): boolean {
    return this.filled().length === 0;
  }


  public filled(): clgu.challenges.Measurement[] {
    if (!this.measurements) {
      return [];
    }
    if (this.showAll) {
      return this.measurements;
    }
    return this.measurements.filter(m => m.filled);
  }

}
