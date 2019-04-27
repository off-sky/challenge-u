import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { SidebarModule } from 'ng-sidebar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,

  ],
  exports: [
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
  ]
})
export class MaterialModule { }
