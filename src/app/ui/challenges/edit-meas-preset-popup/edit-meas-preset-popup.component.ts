import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormControl, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'y-edit-meas-preset-popup',
  templateUrl: './edit-meas-preset-popup.component.html',
  styleUrls: ['./edit-meas-preset-popup.component.scss']
})
export class EditMeasPresetPopupComponent implements OnInit {

  public fc: FormControl = new FormControl(null, [ Validators.required ]);
  public fg: FormGroup = new FormGroup({
    name: this.fc
  })

  constructor(
    public dialogRef: MatDialogRef<EditMeasPresetPopupComponent>
  ) { }

  ngOnInit() {
  }

  public onSubmit(): void {
    if (this.fc.valid) {
      this.dialogRef.close(this.fc.value);
    }
  }

  public onCancel(): void {
    this.dialogRef.close();
  }

}
