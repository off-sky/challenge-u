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
import { EditMeasurementsComponent } from './submit-measurements/edit-measurements.component';
import { DisplayMeasurementsComponent } from './display-measurements/display-measurements.component';
import { CreateGeneralInfoComponent } from './create-general-info/create-general-info.component';
import { CreateScheduleComponent } from './create-schedule/create-schedule.component';
import { CreateFriendsComponent } from './create-friends/create-friends.component';
import { CreateMeasurementsComponent } from './create-measurements/create-measurements.component';
import { CreateReviewBarComponent } from './create-review-bar/create-review-bar.component';
import { EditChallengeRootComponent } from './edit-challenge-root/edit-challenge-root.component';
import { EditChallengeParticipantsComponent } from './edit-challenge-participants/edit-challenge-participants.component';
import { EditMeasurementsRootComponent } from './edit-measurements-root/edit-measurements-root.component';
import { EditMeasurementsScheduleComponent } from './edit-measurements-schedule/edit-measurements-schedule.component';
import { EditMeasPresetPopupComponent } from './edit-meas-preset-popup/edit-meas-preset-popup.component';

@NgModule({
  declarations: [
    CreateChallengeRootComponent,
    ChallengeListRootComponent,
    DetailsRootComponent,
    ChallengeDayCardComponent,
    ChallengeDayDetailsComponent,
    EditMeasurementsComponent,
    DisplayMeasurementsComponent,
    CreateGeneralInfoComponent,
    CreateScheduleComponent,
    CreateFriendsComponent,
    CreateMeasurementsComponent,
    CreateReviewBarComponent,
    EditChallengeRootComponent,
    EditChallengeParticipantsComponent,
    EditMeasurementsRootComponent,
    EditMeasurementsScheduleComponent,
    EditMeasPresetPopupComponent
  ],
  providers: [
    ChallengeDetailsResolverService
  ],
  imports: [
    CommonModule,
    MaterialModule,
    SharedModule,
    RouterModule
  ],
  entryComponents: [
    EditMeasPresetPopupComponent
  ]
})
export class ChallengesModule { }
