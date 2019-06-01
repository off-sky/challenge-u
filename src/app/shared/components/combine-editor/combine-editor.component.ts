import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DragulaService } from 'ng2-dragula';
import { filter } from 'rxjs/operators';
import { clgu } from 'src/types';

@Component({
  selector: 'y-combine-editor',
  templateUrl: './combine-editor.component.html',
  styleUrls: ['./combine-editor.component.scss']
})
export class CombineEditorComponent implements OnInit {

  @Input() public id: string;
  @Input() public control: FormControl;
  @Input() public options: clgu.common.Option[];

  public bagName: string;

  private currExpression: clgu.common.Option[] = [];



  constructor(
    private dragulaService: DragulaService
  ) { }

  ngOnInit() {
    this.bagName = this.id + '_BAG';
    this.updateDragula();
    if (this.control.value && this.control.value.length > 0) {
      this.currExpression = this.control.value;
    }
  }


  public removeFromExpression(ind: number): void {
    this.currExpression.splice(ind, 1);
  }

  public onExpressionChange(): void {
    this.control.setValue(this.currExpression);
  }


  private updateDragula(): void {
    const measGroup = this.dragulaService.find(this.bagName);

    if (measGroup) {
      return;
    }
    
    this.dragulaService.createGroup(this.bagName, {
      copy: function (el, source) {
        const s = source as HTMLDivElement;
        return s.dataset.type === 'options'
      },
      removeOnSpill: true,
      copyItem: (item) => {
        return clgu.utils.cloneDeep(item);
      }
    });
  }



}
