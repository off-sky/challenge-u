import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { HomeGuard } from './home.guard';

import { challengesRoutes } from '../challenges/challenges.routes';

const homeRoutes: Routes = [
  {
    path: 'home',
    canActivate: [
      HomeGuard
    ],
    component: AccountComponent,
    children: [
      ...challengesRoutes
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(homeRoutes)
  ]
})
export class HomeRoutingModule { }
