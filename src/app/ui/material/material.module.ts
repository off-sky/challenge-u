import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {MatCheckboxModule} from '@angular/material/checkbox';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule, MatIconModule, MatButtonModule, MatTooltipModule, MatDialogModule } from '@angular/material';
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
    CommonModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatTooltipModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    SatDatepickerModule,
    SatNativeDateModule
  ],
  exports: [
    MatCheckboxModule,
    MatAutocompleteModule,
    MatCardModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatTooltipModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    SatDatepickerModule,
    SatNativeDateModule
  ]
})
export class MaterialModule { }
