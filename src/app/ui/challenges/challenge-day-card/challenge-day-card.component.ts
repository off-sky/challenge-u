import { Component, OnInit } from '@angular/core';
import { clgu } from '../../../../types';
import { Input } from '@angular/core';

@Component({
  selector: 'y-challenge-day-card',
  templateUrl: './challenge-day-card.component.html',
  styleUrls: ['./challenge-day-card.component.scss']
})
export class ChallengeDayCardComponent implements OnInit {

  @Input() activity: clgu.challenges.Activity;

  constructor() { }

  ngOnInit() {
  }

}
