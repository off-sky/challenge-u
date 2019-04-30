import { Routes } from '@angular/router';
import { CreateChallengeRootComponent } from './create-challenge-root/create-challenge-root.component';
import { ChallengeListRootComponent } from './challenge-list-root/challenge-list-root.component';
import { DetailsRootComponent } from './details-root/details-root.component';
import { ChallengeDetailsResolverService } from './resolvers/challenge-details.resolver.service';
import { ChallengeDayDetailsComponent } from './challenge-day-details/challenge-day-details.component';

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
            },
            {
                path: 'details/:id',
                resolve: {
                    challenge: ChallengeDetailsResolverService
                },
                children: [
                    {
                        path: '',
                        pathMatch: 'full',
                        redirectTo: 'challenge'
                    },
                    {
                        path: 'challenge',
                        component: DetailsRootComponent
                    },
                    {
                        path: 'day/:userId/:dayId',
                        component: ChallengeDayDetailsComponent
                    }
                ]
            }
        ]
    }
]