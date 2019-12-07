import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DisciplineService } from '@services/discipline.service';
import { CycleCommissionModel } from '../../../models/cycle-commission.model';

@Component({
  templateUrl: './add-cycle-commission-modal.component.html',
  styleUrls: [
    './add-cycle-commission-modal.component.css'
  ]
})
export class AddCycleCommissionModalComponent {

  public newCycleCommissionName: string;

  constructor(private dialogRef: MatDialogRef<AddCycleCommissionModalComponent>, private dialog: MatDialog, private disciplineService: DisciplineService) { }

  public save(): void {
    const newCycleCommission = new CycleCommissionModel();
    newCycleCommission.name = this.newCycleCommissionName;
    this.disciplineService.saveCycleCommission(newCycleCommission).subscribe(response => {
      this.dialogRef.close();
    });
  }
}
