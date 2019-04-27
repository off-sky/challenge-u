import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateChallengeRootComponent } from './create-challenge-root/create-challenge-root.component';
import { ChallengeListRootComponent } from './challenge-list-root/challenge-list-root.component';

@NgModule({
  declarations: [CreateChallengeRootComponent, ChallengeListRootComponent],
  imports: [
    CommonModule
  ]
})
export class ChallengesModule { }
