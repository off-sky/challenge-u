import { Component, OnInit, Input, SimpleChanges, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DragulaService } from 'ng2-dragula';
import { clgu } from 'src/types';

@Component({
  selector: 'y-combine-editor',
  templateUrl: './combine-editor.component.html',
  styleUrls: ['./combine-editor.component.scss']
})
export class CombineEditorComponent implements OnChanges, OnInit {

  @Input() public id: string;
  @Input() public control: FormControl;
  @Input() public options: clgu.common.Option[];

  public bagName: string;
  public optionsCopy: clgu.common.Option[] = [];

  public currExpression: clgu.common.Option[] = [];


  /**
   * Support mouse click operation
   */
  private optionToBeAddedStore = {};
  private optionToBeRemovedStore = {};



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


  ngOnChanges(changes: SimpleChanges) {
    if (changes.options && !!this.options) {
      this.optionsCopy = clgu.utils.cloneDeep(this.options)
    }
  }


  public removeFromExpression(ind: number): void {
    this.currExpression.splice(ind, 1);
  }

  public onExpressionChange(): void {
    this.control.setValue(this.currExpression);
  }

  public onMouseDownExpressionOption(ind: number): void {
    this.optionToBeRemovedStore[ind] = setTimeout(() => {
        if (this.optionToBeRemovedStore[ind] !== undefined) {
          clearTimeout(this.optionToBeRemovedStore[ind]);
          delete this.optionToBeRemovedStore[ind];
        }
    }, 1000);
  }

  public onMouseUpExpressionOption(ind: number): void {
      if (this.optionToBeRemovedStore[ind] !== undefined) {
        clearTimeout(this.optionToBeRemovedStore[ind]);
        delete this.optionToBeRemovedStore[ind];
        this.currExpression.splice(ind, 1);
        this.onExpressionChange();
      }
  }


  public onMouseDownOption(ind: number): void {
    this.optionToBeAddedStore[ind] = setTimeout(() => {
        if (this.optionToBeAddedStore[ind] !== undefined) {
          clearTimeout(this.optionToBeAddedStore[ind]);
          delete this.optionToBeAddedStore[ind];
        }
    }, 1000);
  }

  public onMouseUpOption(ind: number, option: clgu.common.Option): void {
      if (this.optionToBeAddedStore[ind] !== undefined) {
        clearTimeout(this.optionToBeAddedStore[ind]);
        delete this.optionToBeAddedStore[ind];
        this.currExpression.push(option);
        this.onExpressionChange();
      }
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
