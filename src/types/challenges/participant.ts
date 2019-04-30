import { Photo } from '../common/photo';
import { Activity } from './activity';

export interface Participant {
    id: string;
    displayName: string;
    photo: Photo;
    activities: Activity[];
}