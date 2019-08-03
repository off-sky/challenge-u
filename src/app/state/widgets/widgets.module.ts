import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { WidgetEffects } from './_widget.effects';

@NgModule({
    declarations: [],
    imports: [
      CommonModule,
      EffectsModule.forFeature([
        WidgetEffects
      ])
    ]
  })
  export class WidgetModule { }