import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { SocialWithPregnancyOrLookVacationFormModel } from '@models/vacations/social-with-pregnancy-or-look-vacation-form.model';
import { SocialWithPregnancyOrLookVacationModel } from '@models/vacations/social-with-pregnancy-or-look-vacation.model';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { NotificationModalComponent } from 'app/components/common/modals/notification-modal/notification-modal.component';
import { VacationService } from '../../../../services/vacation.service';
import { AddSocialWithPregnancyOrLookVacationModalComponent } from '../add-social-with-pregnancy-vacation-modal/add-social-with-pregnancy-vacation-modal.component';
import { EditSocialWithPregnancyOrLookVacationFormModalComponent } from '../edit-social-with-pregnancy-vacation-form-modal/edit-social-with-pregnancy-vacation-form-modal.component';
import { EditSocialWithPregnancyOrLookVacationModalComponent } from '../edit-social-with-pregnancy-vacation-modal/edit-social-with-pregnancy-vacation-modal.component';

@Component({
  templateUrl: './social-with-pregnancy-vacation-form.component.html',
  styleUrls: [
    './social-with-pregnancy-vacation-form.component.css'
  ]
})
export class SocialWithPregnancyOrLookVacationFormComponent {

  public vacationForm: SocialWithPregnancyOrLookVacationFormModel = new SocialWithPregnancyOrLookVacationFormModel();
  public vacationsDisplayedColumns: string[] = ['add-edit', 'typeOfVacation', 'dateDiapason', 'days', 'orderNumber', 'orderDate', 'delete'];

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
        this.vacationService.getSocialWithPregnancyOrLookVacationForm(this.personalCardId, this.formId).subscribe(response => {
          this.vacationForm = response;
        });
      }
    });
  }

  public openAddVacationModal(): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(AddSocialWithPregnancyOrLookVacationModalComponent, {
        width: '500px',
        data: {
          formId: this.vacationForm.id,
          existingVacations: this.vacationForm.socialWithPregnancyOrLookVacations,
        }
      }).afterClosed().subscribe(response => {
        this.vacationService.getSocialWithPregnancyOrLookVacationForm(this.personalCardId, this.formId).subscribe(response => {
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

  public openEditVacationModal(vacation: SocialWithPregnancyOrLookVacationModel): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(EditSocialWithPregnancyOrLookVacationModalComponent, {
        data: {
          vacation: vacation,
          existingVacations: this.vacationForm.socialWithPregnancyOrLookVacations,
        },
        width: '500px'
      }).afterClosed().subscribe(response => {
        this.vacationService.getSocialWithPregnancyOrLookVacationForm(this.personalCardId, this.formId).subscribe(response => {
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
      this.dialog.open(EditSocialWithPregnancyOrLookVacationFormModalComponent, {
        data: {
          vacationForm: this.vacationForm
        },
        width: '500px'
      }).afterClosed().subscribe(response => {
        this.vacationService.getSocialWithPregnancyOrLookVacationForm(this.personalCardId, this.formId).subscribe(response => {
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
    this.vacationService.deleteSocialWithPregnancyOrLookVacation(id).subscribe(_ => {
      this.vacationService.getSocialWithPregnancyOrLookVacationForm(this.personalCardId, this.formId).subscribe(response => {
        this.vacationForm = response;
      });
    });
  }

  public getDaysBetweenDates(date1: Date, date2: Date): number {
    const days = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
    return days;
  }

  public getVacationDays(): number {
    if (this.vacationForm && this.vacationForm.socialWithPregnancyOrLookVacations) {
      return this.vacationForm.socialWithPregnancyOrLookVacations.reduce((sum, current) => {
        return sum + this.getDaysBetweenDates(current.startOfVacationDate, current.endOfVacationDate);
      }, 0);
    }
    return 0;
  }
}
