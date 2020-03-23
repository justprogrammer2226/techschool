import { Component, OnInit } from '@angular/core';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { CycleCommissionModel } from '@models/cycle-commission.model';
import { SubjectModel } from '@models/subject.model';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { ModalService } from '@services/modal.service';
import { NotificationModalComponent } from '../../common/modals/notification-modal/notification-modal.component';
import { AddEditCycleCommissionModalComponent } from '../add-edit-cycle-commission-modal/add-edit-cycle-commission-modal.component';
import { SelectSubjectModalComponent } from '../select-subject-modal/select-subject-modal.component';
import { AddEditSubjectModalComponent } from '../add-edit-subject-modal/add-edit-subject-modal.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  templateUrl: './discipline.component.html',
  styleUrls: [
    './discipline.component.css'
  ]
})
export class DisciplineComponent implements OnInit {

  public cycleCommissions: CycleCommissionModel[] = [];
  private selectedCycleCommission: CycleCommissionModel = new CycleCommissionModel();

  public subjectsDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  public subjectsDisplayedColumns: string[] = ['add-edit', 'name', 'delete'];
  public isSubjectListShowed = true;

  private cycleCommissionId: string;

  constructor(
    private authService: AuthService,
    private disciplineService: DisciplineService,
    private modalService: ModalService,
    private router: Router,
    private activateRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {
  }

  public ngOnInit(): void {
    this.activateRoute.params.subscribe(params => {
      if (params['cycleCommissionId']) {
        this.cycleCommissionId = params['cycleCommissionId'];
      }
      this.refreshTables();
    });
  }

  public openEditSubjectModal(id: string): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(AddEditSubjectModalComponent, {
        data: {
          subjectId: id
        },
        width: '500px'
      }).afterClosed().subscribe(response => {
        this.refreshTables();
      });
    } else {
      this.modalService.showError('Помилка', 'Ви не маєте прав на редагування предмету');
    }
  }

  public deleteSubjectFromCycleCommission(subject: SubjectModel): void {
    if (this.authService.isAuthentificated()) {
      if (window.confirm('Ви дійсно хочете видалити предмет \'' + subject.name + '\'?')) {
        this.disciplineService.deleteSubjectFromCycleCommission(subject.id, this.selectedCycleCommission.id).subscribe(response => {
          this.refreshTables();
        }, error => {
          this.modalService.showError('Помилка', 'Невідома помилка.');
        });
      }
    } else {
      this.modalService.showError('Помилка', 'Ви не маєте прав на видалення предмета');
    }
  }

  public openAddCycleCommissionModal(): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(AddEditCycleCommissionModalComponent, {
        width: '400px'
      }).afterClosed().subscribe(response => {
        this.refreshTables();
      });
    } else {
      this.modalService.showError('Помилка', 'Ви не маєте прав на додання циклової комісії');
    }
  }

  public openEditCycleCommissionModal(id: string): void {
    if (this.selectedCycleCommission.id === id) { 
      if (this.authService.isAuthentificated()) {
        this.dialog.open(AddEditCycleCommissionModalComponent, {
          data: {
            cycleCommissionId: id
          },
          width: '500px'
        }).afterClosed().subscribe(response => {
          this.refreshTables();
        });
      } else {
        this.modalService.showError('Помилка', 'Ви не маєте прав на редагування циклової комісії');
      }
    }
  }

  public deleteCycleCommission(id: string): void {
    if (this.selectedCycleCommission.id === id) {
      if (this.authService.isAuthentificated()) {
        if (window.confirm('Ви дійсно хочете видалити комісію \'' + this.selectedCycleCommission.name + '\'?')) {
          this.disciplineService.deleteCycleCommission(id).subscribe(response => {
            this.refreshTables();
          }, error => {
            this.modalService.showError('Помилка', 'Циклова комісія не може бути видалена, коли хоча б один викладач, відноситься до неї.');
          });
        }
      } else {
        this.modalService.showError('Помилка', 'Ви не маєте прав на видалення циклової комісії');
      }
    }
  }

  private refreshTables(): void {
    this.disciplineService.getCycleCommissions().subscribe(response => {
      this.cycleCommissions = response;

      if (this.cycleCommissionId) {
        const cycleCommission = this.cycleCommissions.find(_ => _.id === this.cycleCommissionId);
        if (!cycleCommission) {
          if (this.cycleCommissions.length !== 0) {
            this.router.navigateByUrl('disciplines/' + this.cycleCommissions[0].id);
          }
        } else {
          this.isSubjectListShowed = false;
          // Transition duration is 0.25s
          setTimeout(() => {
            this.selectedCycleCommission = cycleCommission;
            this.subjectsDataSource.data = this.selectedCycleCommission.subjects.map(_ => {
              return {
                id: _.id,
                name: _.name
              };
            });
            this.isSubjectListShowed = true;
          }, 250);
        }
      } else {
        this.router.navigateByUrl('disciplines/' + this.cycleCommissions[0].id);
      }
    });
  }

  public selectCycleCommission(cycleCommission: CycleCommissionModel, changeRoute: boolean): void {
    if (!this.checkSelectCycleCommission(cycleCommission)) {
      if (changeRoute) {
        this.router.navigateByUrl('disciplines/' + cycleCommission.id);
      }
    }
  }

  public checkSelectCycleCommission(cycleCommission: CycleCommissionModel): boolean {
    return this.selectedCycleCommission.id === cycleCommission.id;
  }

  public openSelectSubjectModal(): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(SelectSubjectModalComponent, {
        width: '500px'
      }).afterClosed().subscribe(response => {
        if (response && response.selectedSubject) {
          this.disciplineService.addSubjectToCycleCommission(response.selectedSubject.id, this.selectedCycleCommission.id).subscribe(_ => {
            this.refreshTables();
          });
        }
      });
    } else {
      this.modalService.showError('Помилка', 'Ви не маєте прав на редагування циклової комісії');
    }
  }
}
