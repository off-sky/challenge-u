import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';
import { clgu } from 'src/types';

@Component({
  selector: 'y-create-review-bar',
  templateUrl: './create-review-bar.component.html',
  styleUrls: ['./create-review-bar.component.scss']
})
export class CreateReviewBarComponent implements OnChanges, OnInit {

  @Input() public currentStep: clgu.challenges.common.CreateChallengeSteps;
  @Output() public stepClick: EventEmitter<clgu.challenges.common.CreateChallengeSteps> = new EventEmitter<clgu.challenges.common.CreateChallengeSteps>();

  public Steps = clgu.challenges.common.CreateChallengeSteps;
  public stepData = [
    {
      ind: this.Steps.GENERAL,
      name: 'Details',
      active: false,
      data: ''
    },
    {
      ind: this.Steps.SCHEDULE,
      name: 'Schedule',
      active: false,
      data: ''
    },
    {
      ind: this.Steps.FRIENDS,
      name: 'Invite Friends',
      active: false,
      data: ''
    },
    {
      ind: this.Steps.MEASUREMENTS,
      name: 'Track Progress',
      active: false,
      data: ''
    }
  ];

  constructor() { }

  ngOnInit() {
  }

  ngOnChanges() {
      this.stepData.forEach(s => s.active = s.ind === this.currentStep)
  }


  public onStepClicked(s: any): void {
    this.stepClick.emit(s.ind);
  }

}
