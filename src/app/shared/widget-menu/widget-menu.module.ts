import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetMenuComponent } from './widget-menu/widget-menu.component';
import { WidgetMenuItemComponent } from './widget-menu-item/widget-menu-item.component';
import { WidgetMenuTriggerComponent } from './widget-menu-trigger/widget-menu-trigger.component';
import { WidgetMenuContentsComponent } from './widget-menu-contents/widget-menu-contents.component';

@NgModule({
  declarations: [
    WidgetMenuComponent,
    WidgetMenuItemComponent,
    WidgetMenuTriggerComponent,
    WidgetMenuContentsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    WidgetMenuComponent,
    WidgetMenuItemComponent,
    WidgetMenuTriggerComponent,
    WidgetMenuContentsComponent
  ]
})
export class WidgetMenuModule { }
