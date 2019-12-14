import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { DisciplineService } from '@services/discipline.service';
import { CycleCommissionModel } from '../../../models/cycle-commission.model';
import { NotificationModalComponent } from '../../common/modals/notification-modal/notification-modal.component';
import { SelectSubjectModalComponent } from '../select-subject-modal/select-subject-modal.component';

@Component({
  templateUrl: './edit-cycle-commission-modal.component.html',
  styleUrls: [
    './edit-cycle-commission-modal.component.css'
  ]
})
export class EditCycleCommissionModalComponent {

  public cycleCommission: CycleCommissionModel = new CycleCommissionModel();
  public cycleCommissionDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  public cycleCommissionDisplayedColumns: string[] = ['add-delete', 'name', 'subjectName'];

  constructor(private dialogRef: MatDialogRef<EditCycleCommissionModalComponent>, private dialog: MatDialog, private disciplineService: DisciplineService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.cycleCommissionId) {
      this.disciplineService.getCycleCommissionById(data.cycleCommissionId).subscribe(response => {
        this.cycleCommission = response;
        console.log('cycle', this.cycleCommission);
        this.cycleCommissionDataSource.data = this.cycleCommission.subjects.map(subject => {
          return {
            subjectId: subject.id,
            name: this.cycleCommission.name,
            subjectName: subject.name
          };
        });
      });
    }
  }

  public openSelectSubjectModal(): void {
    this.dialog.open(SelectSubjectModalComponent, {
      width: '350px'
    }).afterClosed().subscribe(data => {
      if (data.selectedSubject) {
        const isExist = this.cycleCommissionDataSource.data.find(_ => _.cycleCommissionId == data.selectedSubject.id);
        if (!isExist) {
          this.cycleCommission.subjects.push(data.selectedSubject);
          this.cycleCommissionDataSource.data.push({
            subjectId: data.selectedSubject.id,
            name: this.cycleCommission.name,
            subjectName: data.selectedSubject.name
          });
          // Refresh data source
          this.cycleCommissionDataSource.data = this.cycleCommissionDataSource.data;
        } else {
          this.dialog.open(NotificationModalComponent, {
            width: '300px',
            data: {
              title: 'Помилка',
              message: 'Данний предмет вже добавлений',
              isError: true
            }
          });
        }
      }
    });   
  }

  public delete(subjectId: string): void {
    this.disciplineService.deleteCycleCommissionSubject(subjectId, this.cycleCommission.id).subscribe(response => {
      // Refresh data source
      this.cycleCommissionDataSource.data = this.cycleCommissionDataSource.data.filter(_ => _.subjectId != subjectId);
    });
  }

  public save(): void {
    this.disciplineService.saveCycleCommission(this.cycleCommission).subscribe(response => {
      this.dialogRef.close();
    });
  }
}
