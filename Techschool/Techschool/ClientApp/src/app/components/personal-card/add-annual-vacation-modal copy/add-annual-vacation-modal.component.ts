import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthService } from '@services/auth.service';
import { PersonalCardService } from '@services/personal-card.service';
import { DisciplineService } from '@services/discipline.service';
import { AnnualVacationModel } from '@models/annual-vacation.model';

@Component({
  templateUrl: './add-annual-vacation-modal.component.html',
  styleUrls: [
    './add-annual-vacation-modal.component.css'
  ]
})
export class AddAnnualVacationModalComponent {

  public formGroup: FormGroup;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<AddAnnualVacationModalComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private personalCardService: PersonalCardService,
    private disciplineService: DisciplineService
  ) {
    this.formGroup = this.formBuilder.group({
      'startVacationDate': ['', Validators.required],
      'endVacationDate': ['', Validators.required],
      'orderNumber': ['', Validators.required],
      'orderDate': ['', Validators.required]
    });
  }

  public getError(controlElementName): string {
    console.log(this.formGroup);
    switch (controlElementName) {
      case 'startVacationDate':
        if (this.formGroup.get('startVacationDate').hasError('required')) {
          return 'Дата початку обов\'язкова';
        } else {
          return 'Невідома помилка';
        }
      case 'endVacationDate':
        if (this.formGroup.get('endVacationDate').hasError('required')) {
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
      default:
        return 'Невідомий елемент для отримання помилки';
    }
  }

  public select(formValue: any): void {
    const annualVacation: AnnualVacationModel = new AnnualVacationModel();
    annualVacation.startVacationDate = formValue.startVacationDate;
    annualVacation.endVacationDate = formValue.endVacationDate;
    annualVacation.orderNumber = formValue.orderNumber;
    annualVacation.orderDate = formValue.orderDate;
    console.log('Selected', annualVacation);
    this.dialogRef.close({
      annualVacation: annualVacation
    });
  }
}
