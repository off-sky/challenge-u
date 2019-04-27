import { Routes } from '@angular/router';
import { CreateChallengeRootComponent } from './create-challenge-root/create-challenge-root.component';
import { ChallengeListRootComponent } from './challenge-list-root/challenge-list-root.component';

export const challengesRoutes: Routes = [
    {
        path: 'challenges',
        children: [
            {
                path: '',
                pathMatch: 'full',
                redirectTo: 'list'
            },
            {
                path: 'list',
                component: ChallengeListRootComponent
            },
            {
                path: 'create',
                component: CreateChallengeRootComponent
            }
        ]
    }
]