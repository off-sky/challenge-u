import { NgModule } from '@angular/core';
import {CalendarModule} from 'primeng/calendar';
import { CommonModule } from '@angular/common';

import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import {MatRadioModule} from '@angular/material/radio';
import { SatDatepickerModule, SatNativeDateModule } from 'saturn-datepicker';


@NgModule({
  declarations: [],
  imports: [
    CalendarModule,
    CommonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatRadioModule,
    MatSidenavModule,
    SatDatepickerModule,
    SatNativeDateModule
  ],
  exports: [
    MatCheckboxModule,
    CalendarModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatRadioModule,
    MatSidenavModule,
    SatDatepickerModule,
    SatNativeDateModule
  ]
})
export class MaterialModule { }
