import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';

interface Option {
  value: number;
  label: string;
}

@Component({
  selector: 'y-range-input',
  templateUrl: './range-input.component.html',
  styleUrls: ['./range-input.component.scss']
})
export class RangeInputComponent implements OnInit {

  @Input() public min: number = 0;
  @Input() public max: number = 100;
  @Input() public control: FormControl = new FormControl();

  public options: Option[] = [];

  constructor(
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    for (let i = this.min; i <= this.max; i++) {
      const option = {
        value: i,
        label: `${i < 10 ? '0': ''}${i}`
      }
      this.options.push(option);
    }
    this.cd.detectChanges();
  }

}
