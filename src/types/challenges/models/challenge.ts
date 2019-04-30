import { Challenge as iChallenge } from '../challenge';
import { Participant } from '../participant';
import { Participant as ParticipantModel } from './participant';
import { db } from '../db';

export class Challenge implements iChallenge {
    id: string;
    displayName: string;
    participants: Participant[];

    constructor(dbObj: db.ChallengeDetails) {
        this.init(dbObj);
    }


    private init(dbObj: db.ChallengeDetails): void {
        if (dbObj) {
            this.id = dbObj.challenge.id;
            this.displayName = dbObj.challenge.name;
            this.participants = dbObj.participants.map(user => {
                return new ParticipantModel(
                    user,
                    dbObj.common_days,
                    dbObj.users_days ? dbObj.users_days[user.id] : undefined,
                    dbObj.challenge.type,
                    dbObj.challenge.id,
                    dbObj.common_measurements
                )
            })
        }
    }
}