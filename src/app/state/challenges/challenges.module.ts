import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { ChallengesEffects } from './_challenges.effects';
import { ChallengesDbEffects } from './_challenges.db.effects';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EffectsModule.forFeature([
      ChallengesEffects,
      ChallengesDbEffects
    ])
  ]
})
export class ChallengesModule { }
