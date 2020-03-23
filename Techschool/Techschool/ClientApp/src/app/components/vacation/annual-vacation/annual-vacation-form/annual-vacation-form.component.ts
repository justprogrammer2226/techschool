import { VacationService } from '../../../../services/vacation.service';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AnnualVacationFormModel } from '@models/vacations/annual-vacation-form.model';
import { AnnualVacationModel } from '@models/vacations/annual-vacation.model';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { PersonalCardService } from '@services/personal-card.service';
import { NotificationModalComponent } from 'app/components/common/modals/notification-modal/notification-modal.component';
import { AddAnnualVacationModalComponent } from '../add-annual-vacation-modal/add-annual-vacation-modal.component';
import { EditAnnualVacationFormModalComponent } from '../edit-annual-vacation-form-modal/edit-annual-vacation-form-modal.component';
import { EditAnnualVacationModalComponent } from '../edit-annual-vacation-modal/edit-annual-vacation-modal.component';

@Component({
  templateUrl: './annual-vacation-form.component.html',
  styleUrls: [
    './annual-vacation-form.component.css'
  ]
})
export class AnnualVacationFormComponent {

  public vacationForm: AnnualVacationFormModel = new AnnualVacationFormModel();
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
        this.vacationService.getAnnualVacationForm(this.personalCardId, this.formId).subscribe(response => {
          this.vacationForm = response;
        });
      }
    });
  }

  public openAddVacationModal(): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(AddAnnualVacationModalComponent, {
        width: '500px',
        data: {
          formId: this.vacationForm.id
        }
      }).afterClosed().subscribe(response => {
        this.vacationService.getAnnualVacationForm(this.personalCardId, this.formId).subscribe(response => {
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

  public openEditVacationModal(annualVacation: AnnualVacationModel): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(EditAnnualVacationModalComponent, {
        data: {
          annualVacation: annualVacation
        },
        width: '500px'
      }).afterClosed().subscribe(response => {
        this.vacationService.getAnnualVacationForm(this.personalCardId, this.formId).subscribe(response => {
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
      this.dialog.open(EditAnnualVacationFormModalComponent, {
        data: {
          form: this.vacationForm
        },
        width: '500px'
      }).afterClosed().subscribe(response => {
        this.vacationService.getAnnualVacationForm(this.personalCardId, this.formId).subscribe(response => {
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
    this.vacationService.deleteAnnualVacation(id).subscribe(_ => {
      this.vacationService.getAnnualVacationForm(this.personalCardId, this.formId).subscribe(response => {
        this.vacationForm = response;
      });
    });
  }

  public getDaysBetweenDates(date1: Date, date2: Date): number {
    const days = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
    return days;
  }

  public getLeftDays(): number {
    if (this.vacationForm && this.vacationForm.annualVacations) {
      return this.vacationForm.days - this.getVacationDays();
    }
    return 0;
  }

  public getVacationDays(): number {
    if (this.vacationForm && this.vacationForm.annualVacations) {
      return this.vacationForm.annualVacations.reduce((sum, current) => {
        return sum + this.getDaysBetweenDates(current.startOfVacationDate, current.endOfVacationDate);
      }, 0);
    }
    return 0;
  }
}
