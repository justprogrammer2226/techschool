import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { SocialWithPregnancyOrLookVacationModel } from '../../../../models/vacations/social-with-pregnancy-or-look-vacation.model';
import { VacationService } from '../../../../services/vacation.service';
import { CustomValidator } from 'app/validators/custom.validator';

const vacationDateBefore = 'vacationDateBefore';

@Component({
  templateUrl: './add-social-with-pregnancy-vacation-modal.component.html',
  styleUrls: [
    './add-social-with-pregnancy-vacation-modal.component.css'
  ]
})
export class AddSocialWithPregnancyOrLookVacationModalComponent {

  public formGroup: FormGroup;
  private formId: string;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<AddSocialWithPregnancyOrLookVacationModalComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private vacationService: VacationService,
    private disciplineService: DisciplineService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formGroup = this.formBuilder.group({
      'typeOfVacation': ['', Validators.required],
      'startOfVacationDate': ['', Validators.required],
      'endOfVacationDate': ['', Validators.required],
      'orderNumber': ['', Validators.required],
      'orderDate': ['', Validators.required],
    },
    {
      validator: CustomValidator.isBefore('startOfVacationDate', 'endOfVacationDate', vacationDateBefore)
    });
    this.formId = data.formId;
  }

  public getError(controlElementName): string {
    switch (controlElementName) {
      case 'typeOfVacation':
        if (this.formGroup.get('typeOfVacation').hasError('required')) {
          return 'Тип відпустки обов\'язковий';
        } else {
          return 'Невідома помилка';
        }
      case 'startOfVacationDate':
        if (this.formGroup.get('startOfVacationDate').hasError('required')) {
          return 'Дата початку обов\'язкова';
        } else {
          return 'Невідома помилка';
        }
      case 'endOfVacationDate':
        if (this.formGroup.get('endOfVacationDate').hasError('required')) {
          return 'Дата закінчення обов\'язкова';
        } else if (this.formGroup.get('endOfVacationDate').hasError(vacationDateBefore)) {
          return 'Дата закінчення повинна бути після початку';
        } else {
          return 'Невідома помилка';
        }
      case 'orderNumber':
        if (this.formGroup.get('orderNumber').hasError('required')) {
          return 'Номер наказу обов\'язковий';
        } else {
          return 'Невідома помилка';
        }
      case 'orderDate':
        if (this.formGroup.get('orderDate').hasError('required')) {
          return 'Дата наказу обов\'язкова';
        } else {
          return 'Невідома помилка';
        }
      default:
        return 'Невідомий елемент для отримання помилки';
    }
  }

  public saveVacation(formValue: any): void {
    const vacation: SocialWithPregnancyOrLookVacationModel = new SocialWithPregnancyOrLookVacationModel();
    vacation.typeOfVacation = formValue.typeOfVacation;
    vacation.startOfVacationDate = formValue.startOfVacationDate;
    vacation.endOfVacationDate = formValue.endOfVacationDate;
    vacation.orderNumber = formValue.orderNumber;
    vacation.orderDate = formValue.orderDate;
    vacation.socialWithPregnancyOrLookVacationFormId = this.formId;
    this.vacationService.saveSocialWithPregnancyOrLookVacation(vacation).subscribe(_ => {
      this.dialogRef.close();
    });
  }
}
