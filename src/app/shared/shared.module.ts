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
import { SectionSpinnerComponent } from './components/section-spinner/section-spinner.component';
import { StepsBarComponent } from './components/steps-bar/steps-bar.component';
import { StepsItemComponent } from './components/steps-item/steps-item.component';
import { AutocompleteDefOptionComponent } from './components/autocomplete-def-option/autocomplete-def-option.component';
import { CombineEditorComponent } from './components/combine-editor/combine-editor.component';
import { DragulaModule } from 'ng2-dragula';
import { WidgetMenuModule } from './widget-menu/widget-menu.module';

@NgModule({
  declarations: [
    AutocompleteDefOptionComponent,
    CombineEditorComponent,
    PhotoComponent,
    UserSelectComponent,
    MonthSelectorComponent,
    MeasurementEditorComponent,
    MultiDatePickerComponent,
    SectionSpinnerComponent,
    StepsBarComponent,
    StepsItemComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    DragulaModule.forRoot(),
    WidgetMenuModule
  ],
  exports: [
    AutocompleteDefOptionComponent,
    CombineEditorComponent,
    DragulaModule,
    PhotoComponent,
    FormsModule,
    MeasurementEditorComponent,
    MonthSelectorComponent,
    MultiDatePickerComponent,
    ReactiveFormsModule,
    SectionSpinnerComponent,
    StepsBarComponent,
    StepsItemComponent,
    UserSelectComponent,
    WidgetMenuModule
  ]
})
export class SharedModule { }
