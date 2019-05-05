import { Participant } from './participant';

export interface Challenge {
    id: string;
    ownerId: string;
    displayName: string;
    description: string;
    participants: Participant[];
    nextClosestDateId: string;
}
