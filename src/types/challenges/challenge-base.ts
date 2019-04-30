export interface ChallengeBase {
    id: string;
    name: string;
    description?: string;
    ownerId: string;
    createdAt: Date;
}