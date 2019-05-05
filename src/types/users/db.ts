export module db {

    export interface UsersMap {
        [userId: string]: UserLike;
    }

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