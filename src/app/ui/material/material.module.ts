import { NgModule } from '@angular/core';
import {CalendarModule} from 'primeng/calendar';
import { CommonModule } from '@angular/common';

import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDatepickerModule, MatIconModule, MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatSelectModule} from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';


@NgModule({
  declarations: [],
  imports: [
    CalendarModule,
    CommonModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    SatDatepickerModule,
    SatNativeDateModule
  ],
  exports: [
    MatCheckboxModule,
    CalendarModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    SatDatepickerModule,
    SatNativeDateModule
  ]
})
export class MaterialModule { }
