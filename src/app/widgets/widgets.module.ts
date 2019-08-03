import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer/timer.component';
import { WidgetRendererComponent } from './widget-renderer/widget-renderer.component';
import { WidgetIconComponent } from './widget-icon/widget-icon.component';
import { MaterialModule } from '../ui/material/material.module';

@NgModule({
  declarations: [
    TimerComponent,
    WidgetRendererComponent,
    WidgetIconComponent
  ],
  imports: [
    CommonModule,
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
