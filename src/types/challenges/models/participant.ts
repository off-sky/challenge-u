import { Participant as iParticipant } from '../participant';
import { Photo } from '../../common/photo';
import { db as userDb } from '../../users/db';
import { db as challDb } from '../db';
import * as common from '../../common';
import * as challCommon from '../common';
import { Activity } from './activity';

export class Participant implements iParticipant {
    id: string;
    displayName: string;
    photo: Photo;
    activities: Activity[] = [];

    constructor(user: userDb.UserLike,
                commonDays: challDb.CommonChallengeDays,
                userDays: challDb.UserChallengeDays,
                challengeType: challCommon.ChallengeType,
                measurements: challDb.Measurements
            ) {
        this.initUser(user);
        this.initActivities(commonDays, userDays, challengeType, measurements);
    }


    private initUser(userD: userDb.UserLike): void {
        this.id = userD.id;
        this.displayName = userD.display_name;
        this.photo = new common.models.Photo(userD.photo_url, userD.photo_data);
    }


    private initActivities(commonDays: challDb.CommonChallengeDays,
                           userDays: challDb.UserChallengeDays,
                           type: challCommon.ChallengeType,
                           measurements: challDb.Measurements): void {
        Object.keys(commonDays).forEach(dayId => {
            const day = commonDays[dayId];
            const userDay = userDays ? userDays[dayId] : undefined;
            const userMeasurements = userDay ? userDay.measurements : undefined;
            const userRequirements = userDay ? userDay.requirements : undefined;

            this.activities.push(
                new Activity(
                    this.id,
                    day.timestamp,
                    type,
                    userRequirements || day.requirements,
                    userMeasurements || measurements,
                    !!userDay
                )
            )
        })
    }
}