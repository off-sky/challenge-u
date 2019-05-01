import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PhotoComponent } from './components/photo/photo.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserSelectComponent } from './components/user-select/user-select.component';
import { MaterialModule } from '../ui/material/material.module';
import { MonthSelectorComponent } from './components/date-selector/month-selector.component';
import { MeasurementEditorComponent } from './components/measurement-editor/measurement-editor.component';
import { MultiDatePickerComponent } from './components/multi-date-picker/multi-date-picker.component';

@NgModule({
  declarations: [
    PhotoComponent,
    UserSelectComponent,
    MonthSelectorComponent,
    MeasurementEditorComponent,
    MultiDatePickerComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  exports: [
    PhotoComponent,
    FormsModule,
    MeasurementEditorComponent,
    MonthSelectorComponent,
    MultiDatePickerComponent,
    ReactiveFormsModule,
    UserSelectComponent
  ]
})
export class SharedModule { }
