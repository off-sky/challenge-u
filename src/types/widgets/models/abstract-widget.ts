import { Subject, BehaviorSubject } from 'rxjs';

export class AbstractWidgetComponent {

    public dataSaved$: Subject<any> = new Subject<any>();
    public dataArrived$: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public data: any;

}