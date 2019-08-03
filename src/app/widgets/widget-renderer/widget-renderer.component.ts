import { Component, OnInit, Input, ReflectiveInjector, ComponentFactoryResolver, ViewChild, ViewContainerRef, AfterViewInit } from '@angular/core';
import { clgu } from 'src/types';
import * as widgetComponents from '../../../types/widgets/widget-components';

@Component({
  selector: 'y-widget-renderer',
  templateUrl: './widget-renderer.component.html',
  styleUrls: ['./widget-renderer.component.scss']
})
export class WidgetRendererComponent implements AfterViewInit, OnInit {

  @Input() public widget: clgu.widgets.Widget;
  @ViewChild('insert', {read: ViewContainerRef }) private insertContainer: ViewContainerRef;

  constructor(
    private resolver: ComponentFactoryResolver
  ) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    let inputComponent = widgetComponents[this.widget.component];
    if (inputComponent) {
        let inputs = {data: {}};
        let inputProviders = Object.keys(inputs).map((inputName) => { return { provide: inputName, useValue: inputs[inputName] }; });
        let resolvedInputs = ReflectiveInjector.resolve(inputProviders);
        let injector: ReflectiveInjector = ReflectiveInjector.fromResolvedProviders(resolvedInputs, this.insertContainer.parentInjector);
        let factory = this.resolver.resolveComponentFactory(inputComponent as any);
        let component = factory.create(injector);
        this.insertContainer.insert(component.hostView);
    }
  }

}
