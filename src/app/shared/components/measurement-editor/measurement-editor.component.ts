import { Component, OnInit, Input } from '@angular/core';
import { FormArray, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'y-measurement-editor',
  templateUrl: './measurement-editor.component.html',
  styleUrls: ['./measurement-editor.component.scss']
})
export class MeasurementEditorComponent implements OnInit {

  @Input() public control: FormArray;

  public measurementTypeOptions = [
    {
      value: 'number',
      displayValue: 'Number'
    },
    {
      value: 'string',
      displayValue: 'Text'
    },
    {
      value: 'boolean',
      displayValue: 'Yes/No'
    }
  ]

  constructor() { }

  ngOnInit() {
  }


  public add(): void {
    this.control.push(new FormGroup({
      displayName: new FormControl(),
      type: new FormControl('number')
    }))
  }


  public remove(ind: number): void {
    this.control.removeAt(ind);
  }

}
