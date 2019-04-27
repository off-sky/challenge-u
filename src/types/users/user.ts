import { Photo } from '../common/photo';

export interface User {
    id: string;
    firstName?: string;
    lastName?: string;
    displayName?: string;
    email?: string;
    phone: string;
    photo: Photo
}