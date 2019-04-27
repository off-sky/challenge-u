import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhotoComponent } from './components/photo/photo.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PhotoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    PhotoComponent,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
