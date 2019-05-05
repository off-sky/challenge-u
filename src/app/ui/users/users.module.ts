import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListRootComponent } from './users-list-root/users-list-root.component';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [UsersListRootComponent],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule
  ]
})
export class UsersModule { }
