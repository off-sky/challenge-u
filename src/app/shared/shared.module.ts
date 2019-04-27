import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhotoComponent } from './components/photo/photo.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PhotoComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    PhotoComponent,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
