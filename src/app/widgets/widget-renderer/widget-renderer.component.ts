import { Component, OnInit, Input, ReflectiveInjector, ComponentFactoryResolver, ViewChild, ViewContainerRef, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { clgu } from 'src/types';
import * as widgetComponents from '../../../types/widgets/widget-components';
import { AppState } from 'src/app/state/app.state';
import { WidgetSelectors } from 'src/app/state/widgets/_widget.selectors';
import { Store } from '@ngrx/store';
import { WidgetActions } from 'src/app/state/widgets/_widget.actions';

@Component({
  selector: 'y-widget-renderer',
  templateUrl: './widget-renderer.component.html',
  styleUrls: ['./widget-renderer.component.scss']
})
export class WidgetRendererComponent implements AfterViewInit, OnInit {

  @Input() public widget: clgu.widgets.Widget;
  @Input() public challengeId: string;
  @Input() public userId: string;

  @ViewChild('insert', {read: ViewContainerRef }) private insertContainer: ViewContainerRef;

  constructor(
    private cd: ChangeDetectorRef,
    private resolver: ComponentFactoryResolver,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let inputComponent = widgetComponents[this.widget.component];
    if (inputComponent) {
        let inputs = { challengeId: this.challengeId, userId: this.userId, widgetId: this.widget.id };
        let inputProviders = Object.keys(inputs).map((inputName) => { return { provide: inputName, useValue: inputs[inputName] }; });
        let resolvedInputs = ReflectiveInjector.resolve(inputProviders);
        let injector: ReflectiveInjector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.insertContainer.parentInjector);
        let factory = this.resolver.resolveComponentFactory(inputComponent as any);
        let component = factory.create(injector);
        const instance = component.instance as clgu.widgets.models.AbstractWidgetComponent;
        this.store.dispatch(new WidgetActions.FetchChallengeUserWidgetData({
          challengeId: this.challengeId,
          userId: this.userId,
          widgetId: this.widget.id
        }));
        WidgetSelectors.widgetData$(
          this.store,
          this.challengeId,
          this.userId,
          this.widget.id
        )
        .subscribe(data => {
          const copy = clgu.utils.cloneDeep(data)
          instance.dataArrived$.next(copy);
          this.cd.detectChanges();
        })

        instance.dataSaved$
          .subscribe(data => {
            this.store.dispatch(
              new WidgetActions.UpdateChallengeUserWidgetData(
                {
                  challengeId: this.challengeId,
                  userId: this.userId,
                  widgetId: this.widget.id,
                  data
                }
              )
            )
          })

        this.insertContainer.insert(component.hostView);
        this.cd.detectChanges();
    }
  }

}
