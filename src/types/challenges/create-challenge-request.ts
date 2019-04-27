export interface CreateChallengeRequest {
    description: string;
    ownerId: string;
    name: string;
    schedule: number[];
    participants: string[];
}