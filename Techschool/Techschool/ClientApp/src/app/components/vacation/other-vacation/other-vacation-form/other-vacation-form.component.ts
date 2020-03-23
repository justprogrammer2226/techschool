import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { NotificationModalComponent } from 'app/components/common/modals/notification-modal/notification-modal.component';
import { VacationService } from '../../../../services/vacation.service';
import { OtherVacationFormModel } from '../../../../models/vacations/other-vacation-form.model';
import { OtherVacationModel } from '../../../../models/vacations/other-vacation.model';
import { AddOtherVacationModalComponent } from '../add-other-vacation-modal/add-other-vacation-modal.component';
import { EditOtherVacationFormModalComponent } from '../edit-other-vacation-form-modal/edit-other-vacation-form-modal.component';
import { EditOtherVacationModalComponent } from '../edit-other-vacation-modal/edit-other-vacation-modal.component';

@Component({
  templateUrl: './other-vacation-form.component.html',
  styleUrls: [
    './other-vacation-form.component.css'
  ]
})
export class OtherVacationFormComponent {

  public vacationForm: OtherVacationFormModel = new OtherVacationFormModel();
  public vacationsDisplayedColumns: string[] = ['add-edit', 'typeOfVacation', 'dateDiapason', 'days', 'orderNumber', 'orderDate', 'notes', 'delete'];

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
        this.vacationService.getOtherVacationForm(this.personalCardId, this.formId).subscribe(response => {
          this.vacationForm = response;
        });
      }
    });
  }

  public openAddVacationModal(): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(AddOtherVacationModalComponent, {
        width: '500px',
        data: {
          formId: this.vacationForm.id
        }
      }).afterClosed().subscribe(response => {
        this.vacationService.getOtherVacationForm(this.personalCardId, this.formId).subscribe(response => {
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

  public openEditVacationModal(vacation: OtherVacationModel): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(EditOtherVacationModalComponent, {
        data: {
          vacation: vacation
        },
        width: '500px'
      }).afterClosed().subscribe(response => {
        this.vacationService.getOtherVacationForm(this.personalCardId, this.formId).subscribe(response => {
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
      this.dialog.open(EditOtherVacationFormModalComponent, {
        data: {
          vacationForm: this.vacationForm
        },
        width: '500px'
      }).afterClosed().subscribe(response => {
        this.vacationService.getOtherVacationForm(this.personalCardId, this.formId).subscribe(response => {
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
    this.vacationService.deleteOtherVacation(id).subscribe(_ => {
      this.vacationService.getOtherVacationForm(this.personalCardId, this.formId).subscribe(response => {
        this.vacationForm = response;
      });
    });
  }

  public getDaysBetweenDates(date1: Date, date2: Date): number {
    const days = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
    return days;
  }

  public getVacationDays(): number {
    if (this.vacationForm && this.vacationForm.otherVacations) {
      return this.vacationForm.otherVacations.reduce((sum, current) => {
        return sum + this.getDaysBetweenDates(current.startOfVacationDate, current.endOfVacationDate);
      }, 0);
    }
    return 0;
  }
}
