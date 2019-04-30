import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'y-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {

  @Input() public opened: boolean;

  constructor(
  ) { }

  ngOnInit() {
  }

}
