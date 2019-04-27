import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { LoginGuard } from './login.guard';

const routes: Routes = [
  {
    path: 'login',
    canActivate: [
      LoginGuard
    ],
    component: LoginComponent
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LoginRoutingModule { }
