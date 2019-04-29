import * as common from './common';
import { Measurement } from './measurement';

export interface CreateChallengeRequest {
    description: string;
    ownerId: string;
    name: string;
    schedule: number[];
    type: common.ChallengeType;
    participants: string[];
    measurements: Measurement[];
}