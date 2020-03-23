import { VacationService } from '../../../../services/vacation.service';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AnnualVacationModel } from '@models/vacations/annual-vacation.model';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { PersonalCardService } from '@services/personal-card.service';
import { NotificationModalComponent } from 'app/components/common/modals/notification-modal/notification-modal.component';

@Component({
  templateUrl: './edit-annual-vacation-modal.component.html',
  styleUrls: [
    './edit-annual-vacation-modal.component.css'
  ]
})
export class EditAnnualVacationModalComponent {

  public formGroup: FormGroup;
  public vacation: AnnualVacationModel = new AnnualVacationModel();

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<EditAnnualVacationModalComponent>,
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
      'orderDate': ['', Validators.required]
    });
    if (data.annualVacation) {
      this.vacation = data.annualVacation;
      this.setFormGroupByVacation(this.vacation);
    }
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
    this.vacation.startOfVacationDate = formValue.startOfVacationDate;
    this.vacation.endOfVacationDate = formValue.endOfVacationDate;
    this.vacation.orderNumber = formValue.orderNumber;
    this.vacation.orderDate = formValue.orderDate;
    this.vacationService.saveAnnualVacation(this.vacation).subscribe(response => {
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

  private setFormGroupByVacation(vacation: AnnualVacationModel): void {
    this.formGroup.controls['startOfVacationDate'].setValue(vacation.startOfVacationDate);
    this.formGroup.controls['endOfVacationDate'].setValue(vacation.endOfVacationDate);
    this.formGroup.controls['orderNumber'].setValue(vacation.orderNumber);
    this.formGroup.controls['orderDate'].setValue(vacation.orderDate);
  }
}
