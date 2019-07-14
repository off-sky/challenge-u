import { Component, OnInit, ViewChild, TemplateRef, AfterContentInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'y-widget-menu-contents',
  templateUrl: './widget-menu-contents.component.html',
  styleUrls: ['./widget-menu-contents.component.scss']
})
export class WidgetMenuContentsComponent implements AfterContentInit, OnInit {
  

  @ViewChild('templateContents', { read: TemplateRef }) public template: any;

  public templateSub: BehaviorSubject<TemplateRef<any>> = new BehaviorSubject<TemplateRef<any>>(null);

  constructor() { }

  ngOnInit() {
  }

  ngAfterContentInit(): void {
    this.templateSub.next(this.template);
  }

}
