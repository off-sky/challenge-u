import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScreenSizeModule } from './screen-size/screen-size.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ScreenSizeModule
  ],
  exports: [
    ScreenSizeModule
  ]
})
export class CoreModule {
  
}
