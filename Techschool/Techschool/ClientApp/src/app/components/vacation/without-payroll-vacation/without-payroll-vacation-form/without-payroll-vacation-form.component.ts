import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { WithoutPayrollVacationFormModel } from '@models/vacations/without-payroll-vacation-form.model';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { NotificationModalComponent } from 'app/components/common/modals/notification-modal/notification-modal.component';
import { VacationService } from '../../../../services/vacation.service';
import { EditWithoutPayrollVacationModalComponent } from '../edit-without-payroll-vacation-modal/edit-without-payroll-vacation-modal.component';
import { WithoutPayrollVacationModel } from './../../../../models/vacations/without-payroll-vacation.model';
import { AddWithoutPayrollVacationModalComponent } from './../add-without-payroll-vacation-modal/add-without-payroll-vacation-modal.component';
import { EditWithoutPayrollVacationFormModalComponent } from './../edit-without-payroll-vacation-form-modal/edit-without-payroll-vacation-form-modal.component';

@Component({
  templateUrl: './without-payroll-vacation-form.component.html',
  styleUrls: [
    './without-payroll-vacation-form.component.css'
  ]
})
export class WithoutPayrollVacationFormComponent {

  public vacationForm: WithoutPayrollVacationFormModel = new WithoutPayrollVacationFormModel();
  public vacationsDisplayedColumns: string[] = ['add-edit', 'dateDiapason', 'days', 'orderNumber', 'orderDate', 'notes', 'delete'];

  private personalCardId: string;
  private formId: string;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private vacationService: VacationService,
    private disciplineService: DisciplineService,
    private activateRoute: ActivatedRoute
  ) {
    this.activateRoute.params.subscribe(params => {
      if (params['id'] && params['formId']) {
        this.personalCardId = params['id'];
        this.formId = params['formId'];
        this.vacationService.getWithoutPayrollVacationForm(this.personalCardId, this.formId).subscribe(response => {
          this.vacationForm = response;
        });
      }
    });
  }

  public openAddVacationModal(): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(AddWithoutPayrollVacationModalComponent, {
        width: '500px',
        data: {
          formId: this.vacationForm.id,
          existingVacations: this.vacationForm.withoutPayrollVacations,
        }
      }).afterClosed().subscribe(response => {
        this.vacationService.getWithoutPayrollVacationForm(this.personalCardId, this.formId).subscribe(response => {
          this.vacationForm = response;
        });
      });
    } else {
      this.dialog.open(NotificationModalComponent, {
        width: '300px',
        data: {
          title: 'Помилка',
          message: 'Ви не маєте прав на додання відпустки',
          isError: true
        }
      });
    }
  }

  public openEditVacationModal(vacation: WithoutPayrollVacationModel): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(EditWithoutPayrollVacationModalComponent, {
        data: {
          vacation: vacation,
          existingVacations: this.vacationForm.withoutPayrollVacations,
        },
        width: '500px'
      }).afterClosed().subscribe(response => {
        this.vacationService.getWithoutPayrollVacationForm(this.personalCardId, this.formId).subscribe(response => {
          this.vacationForm = response;
        });
      });
    } else {
      this.dialog.open(NotificationModalComponent, {
        width: '300px',
        data: {
          title: 'Помилка',
          message: 'Ви не маєте прав на редагування відпустки',
          isError: true
        }
      });
    }
  }

  public openEditVacationFormModal(): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(EditWithoutPayrollVacationFormModalComponent, {
        data: {
          vacationForm: this.vacationForm
        },
        width: '500px'
      }).afterClosed().subscribe(response => {
        this.vacationService.getWithoutPayrollVacationForm(this.personalCardId, this.formId).subscribe(response => {
          this.vacationForm = response;
        });
      });
    } else {
      this.dialog.open(NotificationModalComponent, {
        width: '300px',
        data: {
          title: 'Помилка',
          message: 'Ви не маєте прав на редагування відпустки',
          isError: true
        }
      });
    }
  }

  public deleteVacation(id: string): void {
    this.vacationService.deleteWithoutPayrollVacation(id).subscribe(_ => {
      this.vacationService.getWithoutPayrollVacationForm(this.personalCardId, this.formId).subscribe(response => {
        this.vacationForm = response;
      });
    });
  }

  public getDaysBetweenDates(date1: Date, date2: Date): number {
    const days = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
    return days;
  }

  public getVacationDays(): number {
    if (this.vacationForm && this.vacationForm.withoutPayrollVacations) {
      return this.vacationForm.withoutPayrollVacations.reduce((sum, current) => {
        return sum + this.getDaysBetweenDates(current.startOfVacationDate, current.endOfVacationDate);
      }, 0);
    }
    return 0;
  }
}
