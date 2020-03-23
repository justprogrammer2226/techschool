import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { VacationService } from '../../../../services/vacation.service';
import { WithoutPayrollVacationModel } from './../../../../models/vacations/without-payroll-vacation.model';

@Component({
  templateUrl: './add-without-payroll-vacation-modal.component.html',
  styleUrls: [
    './add-without-payroll-vacation-modal.component.css'
  ]
})
export class AddWithoutPayrollVacationModalComponent {

  public formGroup: FormGroup;
  private formId: string;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<AddWithoutPayrollVacationModalComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private vacationService: VacationService,
    private disciplineService: DisciplineService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formGroup = this.formBuilder.group({
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
    const vacation: WithoutPayrollVacationModel = new WithoutPayrollVacationModel();
    vacation.startOfVacationDate = formValue.startOfVacationDate;
    vacation.endOfVacationDate = formValue.endOfVacationDate;
    vacation.orderNumber = formValue.orderNumber;
    vacation.orderDate = formValue.orderDate;
    vacation.notes = formValue.notes;
    vacation.withoutPayrollVacationFormId = this.formId;
    this.vacationService.saveWithoutPayrollVacation(vacation).subscribe(_ => {
      this.dialogRef.close();
    });
  }
}
