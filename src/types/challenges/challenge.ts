import { Participant } from './participant';

export interface Challenge {
    id: string;
    displayName: string;
    participants: Participant[];
}
