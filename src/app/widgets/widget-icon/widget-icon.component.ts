import { Component, OnInit, Input } from '@angular/core';
import { clgu } from 'src/types';

@Component({
  selector: 'y-widget-icon',
  templateUrl: './widget-icon.component.html',
  styleUrls: ['./widget-icon.component.scss']
})
export class WidgetIconComponent implements OnInit {

  @Input() public widget: clgu.widgets.Widget;
  public isStandard: boolean = false;

  constructor() { }

  ngOnInit() {
    this.isStandard = this.widget.iconUrl && !this.widget.iconUrl.startsWith('/assets');
  }

}
