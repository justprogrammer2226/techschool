import { AdditionalStudyVacationModel } from '@models/vacations/additional-study-vacation.model';
import { EditAdditionalStudyVacationModalComponent } from './../edit-additional-study-vacation-modal/edit-additional-study-vacation-modal.component';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AnnualVacationModel } from '@models/vacations/annual-vacation.model';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { NotificationModalComponent } from 'app/components/common/modals/notification-modal/notification-modal.component';
import { VacationService } from '../../../../services/vacation.service';
import { AddAdditionalStudyVacationModalComponent } from '../add-additional-study-vacation-modal/add-additional-study-vacation-modal.component';
import { EditAdditionalStudyVacationFormModalComponent } from '../edit-additional-study-vacation-form-modal/edit-additional-study-vacation-form-modal.component';
import { AdditionalStudyVacationFormModel } from './../../../../models/vacations/additional-study-vacation-form.model';
import { EditOtherVacationModalComponent } from './../../other-vacation/edit-other-vacation-modal/edit-other-vacation-modal.component';

@Component({
  templateUrl: './additional-study-vacation-form.component.html',
  styleUrls: [
    './additional-study-vacation-form.component.css'
  ]
})
export class AdditionalStudyVacationFormComponent {

  public vacationForm: AdditionalStudyVacationFormModel = new AdditionalStudyVacationFormModel();
  public vacationsDisplayedColumns: string[] = ['add-edit', 'dateDiapason', 'days', 'orderNumber', 'orderDate', 'delete'];

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
        this.vacationService.getAdditionalStudyVacationForm(this.personalCardId, this.formId).subscribe(response => {
          this.vacationForm = response;
        });
      }
    });
  }

  public openAddVacationModal(): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(AddAdditionalStudyVacationModalComponent, {
        width: '500px',
        data: {
          formId: this.vacationForm.id
        }
      }).afterClosed().subscribe(response => {
        this.vacationService.getAdditionalStudyVacationForm(this.personalCardId, this.formId).subscribe(response => {
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

  public openEditVacationModal(vacation: AdditionalStudyVacationModel): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(EditAdditionalStudyVacationModalComponent, {
        data: {
          vacation: vacation
        },
        width: '500px'
      }).afterClosed().subscribe(response => {
        this.vacationService.getAdditionalStudyVacationForm(this.personalCardId, this.formId).subscribe(response => {
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
      this.dialog.open(EditAdditionalStudyVacationFormModalComponent, {
        data: {
          form: this.vacationForm
        },
        width: '500px'
      }).afterClosed().subscribe(response => {
        this.vacationService.getAdditionalStudyVacationForm(this.personalCardId, this.formId).subscribe(response => {
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
    this.vacationService.deleteAdditionalStudyVacation(id).subscribe(_ => {
      this.vacationService.getAdditionalStudyVacationForm(this.personalCardId, this.formId).subscribe(response => {
        this.vacationForm = response;
      });
    });
  }

  public getDaysBetweenDates(date1: Date, date2: Date): number {
    const days = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
    return days;
  }

  public getVacationDays(): number {
    if (this.vacationForm && this.vacationForm.additionalStudyVacations) {
      return this.vacationForm.additionalStudyVacations.reduce((sum, current) => {
        return sum + this.getDaysBetweenDates(current.startOfVacationDate, current.endOfVacationDate);
      }, 0);
    }
    return 0;
  }
}
