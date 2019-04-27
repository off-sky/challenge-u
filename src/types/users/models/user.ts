import * as intf from "../user";
import { db } from "../db";
import { Photo } from '../../common/photo';
import { Photo as PhotoModel } from '../../common/models/photo';

export class User implements intf.User {
    photo: Photo;
    id: string;
    firstName: string;
    lastName: string;
    displayName: string;
    phone: string;
    email: string;

    constructor(dbUser: db.UserLike) {
        if (dbUser) {
            this.id = dbUser.id;
            this.displayName = dbUser.display_name;
            this.email = dbUser.email;
            this.phone = dbUser.phone;
            this.photo = new PhotoModel(dbUser.photo_url, dbUser.photo_data);
        }
    }

}