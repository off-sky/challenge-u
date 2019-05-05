import { Challenge as iChallenge } from '../challenge';
import { Participant } from '../participant';
import { Participant as ParticipantModel } from './participant';
import { db } from '../db';
import * as moment from 'moment';

export class Challenge implements iChallenge {
    ownerId: string;
    id: string;
    displayName: string;
    description: string;
    participants: Participant[];
    nextClosestDateId: string;

    constructor(dbObj: db.ChallengeDetails) {
        this.init(dbObj);
    }


    private init(dbObj: db.ChallengeDetails): void {
        if (dbObj) {
            this.id = dbObj.challenge.id;
            this.ownerId = dbObj.challenge.owner_id;
            this.displayName = dbObj.challenge.name;
            this.description = dbObj.challenge.description;
            this.nextClosestDateId = this.getNextClosestDateId(dbObj.common_days);
            this.participants = dbObj.participants.map(user => {
                return new ParticipantModel(
                    user,
                    dbObj.common_days,
                    dbObj.users_days ? dbObj.users_days[user.id] : undefined,
                    dbObj.challenge.type,
                    dbObj.challenge.id,
                    dbObj.common_measurements,
                    dbObj.days_requirements
                )
            })
        }
    }


    private getNextClosestDateId(datesObj: db.CommonChallengeDays): string {
        const today = moment();
        return Object.keys(datesObj)
            .find(key => {
                const ts = datesObj[key].timestamp;
                const m = moment(ts);
                return m.isSameOrAfter(today);
            });
    }
}