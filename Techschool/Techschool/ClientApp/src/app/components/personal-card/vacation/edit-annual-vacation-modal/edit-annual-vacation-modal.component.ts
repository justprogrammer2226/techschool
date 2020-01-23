import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { PersonalCardService } from '@services/personal-card.service';
import { DiplomaModel } from '../../../../models/diploma.model';
import { AnnualVacationModel } from '@models/annual-vacation.model';
import { NotificationModalComponent } from 'app/components/common/modals/notification-modal/notification-modal.component';

@Component({
  templateUrl: './edit-annual-vacation-modal.component.html',
  styleUrls: [
    './edit-annual-vacation-modal.component.css'
  ]
})
export class EditAnnualVacationModalComponent {

  public formGroup: FormGroup;
  public annualVacation: AnnualVacationModel = new AnnualVacationModel();

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<EditAnnualVacationModalComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private personalCardService: PersonalCardService,
    private disciplineService: DisciplineService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formGroup = this.formBuilder.group({
      'startVacationDate': ['', Validators.required],
      'endVacationDate': ['', Validators.required],
      'orderNumber': ['', Validators.required],
      'orderDate': ['', Validators.required]
    });
    if (data.annualVacation) {
      this.annualVacation = data.annualVacation;
      this.setFormGroupByAnnualVacation(this.annualVacation);
    }
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

  public save(formValue: any): void {
    this.annualVacation.startVacationDate = formValue.startVacationDate;
    this.annualVacation.endVacationDate = formValue.endVacationDate;
    this.annualVacation.orderNumber = formValue.orderNumber;
    this.annualVacation.orderDate = formValue.orderDate;
    this.personalCardService.saveAnnualVacation(this.annualVacation).subscribe(response => {
      this.dialog.open(NotificationModalComponent, {
        width: '300px',
        data: {
          title: 'Відпустка',
          message: 'Збереження відпустки пройшло успішно.'
        }
      });
      this.dialogRef.close();
    }, error => {
        this.dialog.open(NotificationModalComponent, {
          width: '300px',
          data: {
            title: 'Помилка',
            message: 'Невідома помилка при збереженні',
            isError: true
          }
        });
      });
  }

  private setFormGroupByAnnualVacation(annualVacation: AnnualVacationModel): void {
    this.formGroup.controls['startVacationDate'].setValue(annualVacation.startVacationDate);
    this.formGroup.controls['endVacationDate'].setValue(annualVacation.endVacationDate);
    this.formGroup.controls['orderNumber'].setValue(annualVacation.orderNumber);
    this.formGroup.controls['orderDate'].setValue(annualVacation.orderDate);
  }
}
