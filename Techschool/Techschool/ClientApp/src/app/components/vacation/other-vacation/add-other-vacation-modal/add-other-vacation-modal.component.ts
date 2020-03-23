import { OtherVacationModel } from '../../../../models/vacations/other-vacation.model';
import { VacationService } from '../../../../services/vacation.service';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { AnnualVacationModel } from '@models/vacations/annual-vacation.model';

@Component({
  templateUrl: './add-other-vacation-modal.component.html',
  styleUrls: [
    './add-other-vacation-modal.component.css'
  ]
})
export class AddOtherVacationModalComponent {

  public formGroup: FormGroup;
  private formId: string;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<AddOtherVacationModalComponent>,
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
      'notes': ['', Validators.required]
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
      case 'notes':
        if (this.formGroup.get('notes').hasError('required')) {
          return 'Примітка обов\'язкова';
        } else {
          return 'Невідома помилка';
        }
      default:
        return 'Невідомий елемент для отримання помилки';
    }
  }

  public saveVacation(formValue: any): void {
    const vacation: OtherVacationModel = new OtherVacationModel();
    vacation.typeOfVacation = formValue.typeOfVacation;
    vacation.startOfVacationDate = formValue.startOfVacationDate;
    vacation.endOfVacationDate = formValue.endOfVacationDate;
    vacation.orderNumber = formValue.orderNumber;
    vacation.orderDate = formValue.orderDate;
    vacation.notes = formValue.notes;
    vacation.otherVacationFormId = this.formId;
    this.vacationService.saveOtherVacation(vacation).subscribe(_ => {
      this.dialogRef.close();
    });
  }
}
