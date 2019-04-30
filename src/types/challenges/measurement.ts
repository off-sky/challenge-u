import { FormControl } from '@angular/forms';

/**
 * Measurement is what the activity has to be tracked by.
 */
export interface Measurement {
    id?: string;
    displayName: string;
    type: 'boolean' | 'string' | 'number';
    value?: any;
    filled: boolean;
}