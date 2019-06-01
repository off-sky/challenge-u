import { MeasurementList } from "./measurement-list";
import { db } from "./db";
import { Measurement } from './measurement';

export class MeasurementPreset {
    name: string;
    measurements: Measurement[];
}