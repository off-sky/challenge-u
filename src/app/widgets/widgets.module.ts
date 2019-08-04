import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer/timer.component';
import { WidgetRendererComponent } from './widget-renderer/widget-renderer.component';
import { WidgetIconComponent } from './widget-icon/widget-icon.component';
import { MaterialModule } from '../ui/material/material.module';
import { RangeInputComponent } from './shared/range-input/range-input.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    TimerComponent,
    WidgetRendererComponent,
    WidgetIconComponent,
    RangeInputComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    WidgetRendererComponent,
    WidgetIconComponent
  ],
  entryComponents: [
    TimerComponent
  ]
})
export class WidgetsModule { }
