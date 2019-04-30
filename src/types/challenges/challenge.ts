import { Participant } from './participant';

export interface Challenge {
    id: string;
    displayName: string;
    description: string;
    participants: Participant[];
}
