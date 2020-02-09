import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { PersonalCardService } from '@services/personal-card.service';
import { DiplomaModel } from '../../../../models/diploma.model';
import { AnnualVacationModel } from '@models/vacations/annual-vacation.model';

@Component({
  templateUrl: './add-annual-vacation-modal.component.html',
  styleUrls: [
    './add-annual-vacation-modal.component.css'
  ]
})
export class AddAnnualVacationModalComponent {

  public formGroup: FormGroup;
  private annualVacationFormId: string;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<AddAnnualVacationModalComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private personalCardService: PersonalCardService,
    private disciplineService: DisciplineService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formGroup = this.formBuilder.group({
      'startOfVacationDate': ['', Validators.required],
      'endOfVacationDate': ['', Validators.required],
      'orderNumber': ['', Validators.required],
      'orderDate': ['', Validators.required]
    });
    this.annualVacationFormId = data.annualVacationFormId;
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
      default:
        return 'Невідомий елемент для отримання помилки';
    }
  }

  public saveVacation(formValue: any): void {
    const annualVacation: AnnualVacationModel = new AnnualVacationModel();
    annualVacation.startOfVacationDate = formValue.startOfVacationDate;
    annualVacation.endOfVacationDate = formValue.endOfVacationDate;
    annualVacation.orderNumber = formValue.orderNumber;
    annualVacation.orderDate = formValue.orderDate;
    annualVacation.annualVacationFormId = this.annualVacationFormId;
    this.personalCardService.saveAnnualVacation(annualVacation).subscribe(_ => {
      this.dialogRef.close();
    });
  }
}
