import { Component, OnInit, Input } from '@angular/core';
import { clgu } from 'src/types';
import { FormArray, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'y-edit-measurements',
  templateUrl: './edit-measurements.component.html',
  styleUrls: ['./edit-measurements.component.scss']
})
export class EditMeasurementsComponent implements OnInit {

  @Input() public measurements: clgu.challenges.Measurement[];

  private measObj = {};
  
 


  constructor() { }

  ngOnInit() {
  }

  onModelChanges(val: any, meas: clgu.challenges.Measurement): void {
    meas.value = val;
  }




}
