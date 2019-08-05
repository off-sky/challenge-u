import { Participant as iParticipant } from '../participant';
import { Photo } from '../../common/photo';
import { db as userDb } from '../../users/db';
import { db as challDb } from '../db';
import * as common from '../../common';
import * as challCommon from '../common';
import * as moment from 'moment';
import { Activity } from './activity';

export class Participant implements iParticipant {
    id: string;
    displayName: string;
    photo: Photo;
    activities: Activity[] = [];
    totalDaysCount: number;
    showUpDaysCount: number;

    constructor(user: userDb.UserLike,
                commonDays: challDb.CommonChallengeDays,
                userDays: challDb.UserChallengeDays,
                challengeType: challCommon.ChallengeType,
                challengeId: string,
                measurements: challDb.Measurements,
                challRequirements: challDb.ChallengeRequirements
            ) {
        this.initUser(user);
        this.initActivities(commonDays, userDays, challengeType, challengeId, measurements, challRequirements);
        this.totalDaysCount = this.activities.filter(a => !a.isFuture).length;
        this.showUpDaysCount = this.activities.filter(a => !a.isFuture && a.isShowUp).length;
    }


    private initUser(userD: userDb.UserLike): void {
        this.id = userD.id;
        this.displayName = userD.display_name;
        this.photo = new common.models.Photo(userD.photo_url, userD.photo_data);
    }


    private initActivities(commonDays: challDb.CommonChallengeDays,
                           userDays: challDb.UserChallengeDays,
                           type: challCommon.ChallengeType,
                           challengeId: string,
                           measurements: challDb.Measurements,
                           challRequirements: challDb.ChallengeRequirements): void {
        let nextClosest: boolean;
        const today = moment();
        Object.keys(commonDays).forEach(dayId => {
            const day = commonDays[dayId];
            const m = moment(day.timestamp);
            const isAfterToday = m.isSameOrAfter(today);
            if (isAfterToday && !nextClosest) {
                
            }
            const userDay = userDays ? userDays[dayId] : undefined;
            const userMeasurements = userDay ? userDay.measurements : undefined;

            this.activities.push(
                new Activity(
                    this.id,
                    challengeId,
                    day.timestamp,
                    type,
                    userMeasurements || measurements,
                    !!userDay
                )
            )
        })
    }
}