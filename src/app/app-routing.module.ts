import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivacyPolicyComponent } from './ui/privacy-policy/privacy-policy.component';

const routes: Routes = [
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent
  },
  {
    path: '**',
    redirectTo: '/home'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
