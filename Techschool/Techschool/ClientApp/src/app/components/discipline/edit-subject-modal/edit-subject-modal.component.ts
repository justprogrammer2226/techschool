import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { SubjectModel } from '@models/subject.model';
import { DisciplineService } from '@services/discipline.service';
import { NotificationModalComponent } from '../../common/modals/notification-modal/notification-modal.component';
import { SelectCycleCommissionModalComponent } from '../select-cycle-commission-modal/select-cycle-commission-modal.component';

@Component({
  templateUrl: './edit-subject-modal.component.html',
  styleUrls: [
    './edit-subject-modal.component.css'
  ]
})
export class EditSubjectModalComponent {

  public subject: SubjectModel = new SubjectModel();
  public subjectDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  public subjectDisplayedColumns: string[] = ['add-delete', 'name', 'cycleCommissionName'];

  constructor(private dialogRef: MatDialogRef<EditSubjectModalComponent>, private dialog: MatDialog, private disciplineService: DisciplineService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data.subjectId) {
      this.disciplineService.getSubjectById(data.subjectId).subscribe(response => {
        this.subject = response;
        this.subjectDataSource.data = this.subject.cycleCommissions.map(cycleCommission => {
          return {
            cycleCommissionId: cycleCommission.id,
            name: this.subject.name,
            cycleCommissionName: cycleCommission.name
          };
        });
      });
    }
  }

  public openSelectCycleCommissionModal(): void {
    this.dialog.open(SelectCycleCommissionModalComponent, {
      width: '350px'
    }).afterClosed().subscribe(data => {
      if (data.selectedCycleCommission) {
        const isExist = this.subjectDataSource.data.find(_ => _.cycleCommissionId == data.selectedCycleCommission.id);
        if (!isExist) {
          this.subject.cycleCommissions.push(data.selectedCycleCommission);
          this.subjectDataSource.data.push({
            cycleCommissionId: data.selectedCycleCommission.id,
            name: this.subject.name,
            cycleCommissionName: data.selectedCycleCommission.name
          });
          // Refresh data source
          this.subjectDataSource.data = this.subjectDataSource.data;
          this.disciplineService.saveSubject(this.subject).subscribe();
        } else {
          this.dialog.open(NotificationModalComponent, {
            width: '300px',
            data: {
              title: 'Помилка',
              message: 'Данна циклова комісія вже добавлена',
              isError: true
            }
          });
        }
      }
    });   
  }

  public delete(cycleCommissionId: string): void {
    this.disciplineService.deleteCycleCommissionSubject(this.subject.id, cycleCommissionId).subscribe(response => {
      // Refresh data source
      this.subjectDataSource.data = this.subjectDataSource.data.filter(_ => _.cycleCommissionId != cycleCommissionId);
    });
  }
}
