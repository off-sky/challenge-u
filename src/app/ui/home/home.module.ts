import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
import { NavComponent } from './nav/nav.component';

import { HomeGuard } from './home.guard';
import { ChallengesModule } from '../challenges/challenges.module';
import { HomeRoutingModule } from './home-routing.module';
import { HeaderComponent } from './header/header.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../../shared/shared.module';
import { RouterModule } from '@angular/router';
import { SidebarModule } from 'ng-sidebar';

@NgModule({
  declarations: [
    AccountComponent,
    NavComponent,
    HeaderComponent,

  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    MaterialModule,
    ChallengesModule,
    SharedModule,
    RouterModule,
    SidebarModule.forRoot()
  ],
  providers: [
    HomeGuard
  ]
})
export class HomeModule { }
