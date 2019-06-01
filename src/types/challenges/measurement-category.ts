import { Measurement } from './measurement';
import { db } from './db';

export class MeasurementCategory {
    name: string;
    measurements: Measurement[];

    constructor(measurements: Measurement[]) {
        if (measurements) {
            this.name = measurements[0].category || '';
            this.measurements = measurements;
        }
    }
}