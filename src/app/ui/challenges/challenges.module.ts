import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CreateChallengeRootComponent } from './create-challenge-root/create-challenge-root.component';
import { ChallengeListRootComponent } from './challenge-list-root/challenge-list-root.component';
import { ChallengeDetailsResolverService } from './resolvers/challenge-details.resolver.service';
import { SharedModule } from 'src/app/shared/shared.module';
import { MaterialModule } from '../material/material.module';
import { DetailsRootComponent } from './details-root/details-root.component';
import { ChallengeDayCardComponent } from './challenge-day-card/challenge-day-card.component';
import { ChallengeDayDetailsComponent } from './challenge-day-details/challenge-day-details.component';
import { EditMeasurementsComponent } from './edit-measurements/edit-measurements.component';
import { EditRequirementsComponent } from './edit-requirements/edit-requirements.component';

@NgModule({
  declarations: [
    CreateChallengeRootComponent,
    ChallengeListRootComponent,
    DetailsRootComponent,
    ChallengeDayCardComponent,
    ChallengeDayDetailsComponent,
    EditMeasurementsComponent,
    EditRequirementsComponent
  ],
  providers: [
    ChallengeDetailsResolverService
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule
  ]
})
export class ChallengesModule { }
