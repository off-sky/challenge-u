
/**
 * This class represents a requirement (what user has to do)
 * on a challenge day. 
 */
export interface Requirement {
    id: string;
    displayName: string;
    completed: boolean;
    category: string;
}