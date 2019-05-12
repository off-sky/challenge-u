import { FormControl } from '@angular/forms';
import { Option } from '../common';

/**
 * Measurement is what the activity has to be tracked by.
 */
export interface Measurement {
    id?: string;
    displayName: string;
    category: string;
    orderNo: number;
    type: 'boolean' | 'string' | 'number' | 'combine';
    formula?: Option[];
    value?: any;
    filled: boolean;
    formControl?: FormControl
}
