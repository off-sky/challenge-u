import { Routes } from '@angular/router';
import { UsersListRootComponent } from './users-list-root/users-list-root.component';

export const usersRoutes: Routes = [
    {
        path: 'users',
        children: [
            {
                path: 'list',
                component: UsersListRootComponent
            },
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list'
            }
        ]
    }
]