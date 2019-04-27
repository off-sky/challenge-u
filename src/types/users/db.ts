export module db {

    export interface UserLike {
        id: string;
        display_name?: string;
        email: string;
        phone: string;
        photo_data?: string;
        photo_url?: string;
    }

    export interface FBUser {
        uid: string;
        displayName: string;
        email: string;
        phoneNumber: string;
        photoURL: string;
    }

}