import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CycleCommissionModel } from '@models/cycle-commission.model';
import { DisciplineService } from '@services/discipline.service';

@Component({
  templateUrl: './select-cycle-commission-modal.component.html',
  styleUrls: [
    './select-cycle-commission-modal.component.css'
  ]
})
export class SelectCycleCommissionModalComponent {

  public selectedCycleCommission: CycleCommissionModel;
  public cycleCommissions: CycleCommissionModel[] = [];

  constructor(private dialogRef: MatDialogRef<SelectCycleCommissionModalComponent>, private dialog: MatDialog, private disciplineService: DisciplineService) {
    this.disciplineService.getCycleCommissions().subscribe(response => {
      this.cycleCommissions = response;
    });
  }

  public select(): void {
    this.dialogRef.close({
      selectedCycleCommission: this.selectedCycleCommission
    });
  }

}
