import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'y-create-friends',
  templateUrl: './create-friends.component.html',
  styleUrls: ['./create-friends.component.scss']
})
export class CreateFriendsComponent implements OnInit {

  @Input() public control: FormControl;

  constructor() { }

  ngOnInit() {
  }

}
