import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormArray } from '@angular/forms';

@Component({
  selector: 'y-create-measurements',
  templateUrl: './create-measurements.component.html',
  styleUrls: ['./create-measurements.component.scss']
})
export class CreateMeasurementsComponent implements OnInit {

  @Input() public shouldTrackControl: FormControl;
  @Input() public measFormArray: FormArray;
  
  constructor() { }

  ngOnInit() {
  }

}
