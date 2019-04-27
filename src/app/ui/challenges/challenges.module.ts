import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateChallengeRootComponent } from './create-challenge-root/create-challenge-root.component';
import { ChallengeListRootComponent } from './challenge-list-root/challenge-list-root.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    CreateChallengeRootComponent,
    ChallengeListRootComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ]
})
export class ChallengesModule { }
