import { Component, OnInit, Input } from '@angular/core';
import { clgu } from 'src/types';

interface RequirementCategory {
  category: string;
  requirements: clgu.challenges.Requirement[];
}

@Component({
  selector: 'y-submit-requirements',
  templateUrl: './submit-requirements.component.html',
  styleUrls: ['./submit-requirements.component.scss']
})
export class SubmitRequirementsComponent implements OnInit {

  @Input() public requirements: clgu.challenges.Requirement[];
  @Input() public readOnly: boolean;
  public requirementCategories: RequirementCategory[] = [];
  
  constructor() { }

  ngOnInit() {
    if (this.requirements) {
      const categoryObj = this.requirements.reduce((prev, curr) => {
        const cat = curr.category || 'no_cat';
        if (!prev[cat]) {
          prev[cat] = [];
        }
        prev[cat].push(curr);
        return prev;
      }, {});

      Object.keys(categoryObj).forEach(cat => {
        this.requirementCategories.push({
          category: cat === 'no_cat' ? undefined : cat,
          requirements: categoryObj[cat]
        });
      });

    }

  }

}
