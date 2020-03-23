import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { AdditionalStudyVacationModel } from '@models/vacations/additional-study-vacation.model';
import { SocialWithChildrenVacationFormModel } from '@models/vacations/social-with-children-vacation-form.model';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { NotificationModalComponent } from 'app/components/common/modals/notification-modal/notification-modal.component';
import { VacationService } from '../../../../services/vacation.service';
import { AddSocialWithChildrenVacationModalComponent } from '../add-social-with-children-vacation-modal/add-social-with-children-vacation-modal.component';
import { EditSocialWithChildrenVacationFormModalComponent } from './../edit-social-with-children-vacation-form-modal/edit-social-with-children-vacation-form-modal.component';
import { EditSocialWithChildrenVacationModalComponent } from './../edit-social-with-children-vacation-modal/edit-social-with-children-vacation-modal.component';

@Component({
  templateUrl: './social-with-children-vacation-form.component.html',
  styleUrls: [
    './social-with-children-vacation-form.component.css'
  ]
})
export class SocialWithChildrenVacationFormComponent {

  public vacationForm: SocialWithChildrenVacationFormModel = new SocialWithChildrenVacationFormModel();
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
        this.vacationService.getSocialWithChildrenVacationForm(this.personalCardId, this.formId).subscribe(response => {
          this.vacationForm = response;
        });
      }
    });
  }

  public openAddVacationModal(): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(AddSocialWithChildrenVacationModalComponent, {
        width: '500px',
        data: {
          formId: this.vacationForm.id
        }
      }).afterClosed().subscribe(response => {
        this.vacationService.getSocialWithChildrenVacationForm(this.personalCardId, this.formId).subscribe(response => {
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
      this.dialog.open(EditSocialWithChildrenVacationModalComponent, {
        data: {
          vacation: vacation
        },
        width: '500px'
      }).afterClosed().subscribe(response => {
        this.vacationService.getSocialWithChildrenVacationForm(this.personalCardId, this.formId).subscribe(response => {
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
      this.dialog.open(EditSocialWithChildrenVacationFormModalComponent, {
        data: {
          form: this.vacationForm
        },
        width: '500px'
      }).afterClosed().subscribe(response => {
        this.vacationService.getSocialWithChildrenVacationForm(this.personalCardId, this.formId).subscribe(response => {
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
    this.vacationService.deleteSocialWithChildrenVacation(id).subscribe(_ => {
      this.vacationService.getSocialWithChildrenVacationForm(this.personalCardId, this.formId).subscribe(response => {
        this.vacationForm = response;
      });
    });
  }

  public getDaysBetweenDates(date1: Date, date2: Date): number {
    const days = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
    return days;
  }

  public getLeftDays(): number {
    if (this.vacationForm && this.vacationForm.socialWithChildrenVacations) {
      return this.vacationForm.days - this.getVacationDays();
    }
    return 0;
  }

  public getVacationDays(): number {
    if (this.vacationForm && this.vacationForm.socialWithChildrenVacations) {
      return this.vacationForm.socialWithChildrenVacations.reduce((sum, current) => {
        return sum + this.getDaysBetweenDates(current.startOfVacationDate, current.endOfVacationDate);
      }, 0);
    }
    return 0;
  }
}
