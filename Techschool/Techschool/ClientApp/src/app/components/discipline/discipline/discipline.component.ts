import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { CycleCommissionModel } from '@models/cycle-commission.model';
import { SubjectModel } from '@models/subject.model';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { NotificationModalComponent } from '../../common/modals/notification-modal/notification-modal.component';
import { EditSubjectModalComponent } from '../edit-subject-modal/edit-subject-modal.component';
import { AddSubjectModalComponent } from '../add-subject-modal/add-subject-modal.component';
import { AddCycleCommissionModalComponent } from '../add-cycle-commission-modal/add-cycle-commission-modal.component';
import { EditCycleCommissionModalComponent } from '../edit-cycle-commission-modal/edit-cycle-commission-modal.component';

@Component({
  templateUrl: './discipline.component.html',
  styleUrls: [
    './discipline.component.css'
  ]
})
export class DisciplineComponent implements OnInit {

  private cycleCommissions: CycleCommissionModel[] = [];
  public cycleCommissionsDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  public cycleCommissionDisplayedColumns: string[] = ['add-edit', 'name', 'subjects', 'delete'];

  private subjects: SubjectModel[] = [];
  public subjectsDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  public subjectsDisplayedColumns: string[] = ['add-edit', 'name', 'cycleCommissions', 'delete'];

  constructor(private authService: AuthService, private disciplineService: DisciplineService, private dialog: MatDialog) {

  }

  public ngOnInit(): void {
    this.refreshTables();
  }

  public openAddSubjectModal(): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(AddSubjectModalComponent, {
        width: '400px'
      }).afterClosed().subscribe(response => {
        this.refreshTables();
      });
    } else {
      this.dialog.open(NotificationModalComponent, {
        width: '300px',
        data: {
          title: 'Помилка',
          message: 'Ви не маєте прав на додання предмету',
          isError: true
        }
      });
    }
  }

  public openEditSubjectModal(id: string): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(EditSubjectModalComponent, {
        data: {
          subjectId: id
        },
        width: '500px'
      }).afterClosed().subscribe(response => {
        this.refreshTables();
      });   
    } else {
      this.dialog.open(NotificationModalComponent, {
        width: '300px',
        data: {
          title: 'Помилка',
          message: 'Ви не маєте прав на редагування предмету',
          isError: true
        }
      });
    }
  }

  public deleteSubject(id: string): void {
    this.disciplineService.deleteSubject(id).subscribe(response => {
      this.refreshTables();
    });
  }

  public openAddCycleCommissionModal(): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(AddCycleCommissionModalComponent, {
        width: '400px'
      }).afterClosed().subscribe(response => {
        this.refreshTables();
      });
    } else {
      this.dialog.open(NotificationModalComponent, {
        width: '300px',
        data: {
          title: 'Помилка',
          message: 'Ви не маєте прав на додання циклової комісії',
          isError: true
        }
      });
    }
  }

  public openEditCycleCommissionModal(id: string): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(EditCycleCommissionModalComponent, {
        data: {
          cycleCommissionId: id
        },
        width: '500px'
      }).afterClosed().subscribe(response => {
        this.refreshTables();
      });
    } else {
      this.dialog.open(NotificationModalComponent, {
        width: '300px',
        data: {
          title: 'Помилка',
          message: 'Ви не маєте прав на редагування циклової комісії',
          isError: true
        }
      });
    }
  }

  public deleteCycleCommission(id: string): void {
    this.disciplineService.deleteCycleCommission(id).subscribe(response => {
      this.refreshTables();
    });
  }

  private refreshTables(): void {
    this.disciplineService.getSubjects().subscribe(response => {
      this.subjects = response;
      this.subjectsDataSource.data = this.subjects.map(_ => {
        return {
          id: _.id,
          name: _.name,
          cycleCommissions: _.cycleCommissions.map(_ => _.name).join(', ')
        };
      });
    });
    this.disciplineService.getCycleCommissions().subscribe(response => {
      this.cycleCommissions = response;
      this.cycleCommissionsDataSource.data = this.cycleCommissions.map(_ => {
        return {
          id: _.id,
          name: _.name,
          subjects: _.subjects.map(_ => _.name).join(', ')
        };
      });
    });
  }
}
