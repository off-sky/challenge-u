import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'y-create-general-info',
  templateUrl: './create-general-info.component.html',
  styleUrls: ['./create-general-info.component.scss']
})
export class CreateGeneralInfoComponent implements OnInit {

  @Input() public challengeNameControl: FormControl;
  @Input() public challengeDescriptionControl: FormControl;

  constructor() { }

  ngOnInit() {
  }

}
