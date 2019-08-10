import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'y-leave-confirm-popup',
  templateUrl: './leave-confirm-popup.component.html',
  styleUrls: ['./leave-confirm-popup.component.scss']
})
export class LeaveConfirmPopupComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public challengeName: string
  ) { }

  ngOnInit() {
  }

}
