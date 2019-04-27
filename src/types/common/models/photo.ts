import {Photo as iPhoto} from '../photo';

export class Photo implements iPhoto {
    url: string;
    data: string;

    constructor(url?: string, data?: string) {
        this.url =url;
        this.data = data;
    }
}