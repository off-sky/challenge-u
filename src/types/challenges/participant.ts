import { Photo } from '../common/photo';
import { Activity } from './activity';

export interface Participant {
    id: string;
    firstName: string;
    lastName: string;
    photo: Photo;
    activities: Activity[];
}