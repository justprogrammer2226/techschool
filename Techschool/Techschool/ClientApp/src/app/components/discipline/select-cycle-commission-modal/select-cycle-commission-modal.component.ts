import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { CycleCommissionModel } from '@models/cycle-commission.model';
import { DisciplineService } from '@services/discipline.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  templateUrl: './select-cycle-commission-modal.component.html',
  styleUrls: [
    './select-cycle-commission-modal.component.css'
  ]
})
export class SelectCycleCommissionModalComponent implements OnInit  {

  public cycleCommissions: CycleCommissionModel[] = [];

  public myControl = new FormControl();
  public filteredOptions: Observable<CycleCommissionModel[]>;

  constructor(private dialogRef: MatDialogRef<SelectCycleCommissionModalComponent>, private dialog: MatDialog, private disciplineService: DisciplineService) { }

  public ngOnInit(): void {
    this.disciplineService.getCycleCommissions().subscribe(response => {
      this.cycleCommissions = response;
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this.cycleCommissions.filter(option => option.name.toLowerCase().includes(value.toLowerCase())))
        );
    });
  }

  public select(cycleCommission: CycleCommissionModel): void {
    this.dialogRef.close({
      selectedCycleCommission: cycleCommission
    });
  }
}
