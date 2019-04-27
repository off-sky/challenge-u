import { Challenge as iChallenge } from '../challenge';
import { Participant } from '../participant';

export class Challenge implements iChallenge {
    id: string;
    displayName: string;
    participants: Participant[];
}