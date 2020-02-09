import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DisciplineService } from '@services/discipline.service';
import { CycleCommissionModel } from '../../../models/cycle-commission.model';

@Component({
  templateUrl: './add-edit-cycle-commission-modal.component.html',
  styleUrls: [
    './add-edit-cycle-commission-modal.component.css'
  ]
})
export class AddEditCycleCommissionModalComponent {

  public cycleCommission: CycleCommissionModel = new CycleCommissionModel();
  public isAdd: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<AddEditCycleCommissionModalComponent>,
    private dialog: MatDialog,
    private disciplineService: DisciplineService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    if (data && data.cycleCommissionId) {
      this.disciplineService.getCycleCommissionById(data.cycleCommissionId).subscribe(response => {
        this.cycleCommission = response;
      });
    } else {
      this.isAdd = true;
      this.cycleCommission.subjects = [];
    }
  }

  public save(): void {
    this.disciplineService.saveCycleCommission(this.cycleCommission).subscribe(response => {
      this.dialogRef.close();
    });
  }
}
