import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';

import { SidebarModule } from 'ng-sidebar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,

  ],
  exports: [
    MatInputModule,
    MatListModule,
    MatToolbarModule,
    MatSidenavModule,
  ]
})
export class MaterialModule { }
