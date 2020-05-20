import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SocialWithPregnancyOrLookVacationModel } from '@models/vacations/social-with-pregnancy-or-look-vacation.model';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { ModalService } from '@services/modal.service';
import { NotificationModalComponent } from 'app/components/common/modals/notification-modal/notification-modal.component';
import { VacationService } from '../../../../services/vacation.service';

@Component({
  templateUrl: './edit-social-with-pregnancy-vacation-modal.component.html',
  styleUrls: [
    './edit-social-with-pregnancy-vacation-modal.component.css'
  ]
})
export class EditSocialWithPregnancyOrLookVacationModalComponent {

  public formGroup: FormGroup;
  public vacation: SocialWithPregnancyOrLookVacationModel = new SocialWithPregnancyOrLookVacationModel();
  private existingVacations: SocialWithPregnancyOrLookVacationModel[] = [];

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<EditSocialWithPregnancyOrLookVacationModalComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private modalService: ModalService,
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
    });
    if (data.vacation) {
      this.vacation = data.vacation;
      this.setFormGroupByVacation(this.vacation);
    }
    this.existingVacations = data.existingVacations;
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
      default:
        return 'Невідомий елемент для отримання помилки';
    }
  }

  public saveVacation(formValue: any): void {
    this.vacation.typeOfVacation = formValue.typeOfVacation;
    this.vacation.startOfVacationDate = formValue.startOfVacationDate;
    this.vacation.endOfVacationDate = formValue.endOfVacationDate;
    this.vacation.orderNumber = formValue.orderNumber;
    this.vacation.orderDate = formValue.orderDate;
    const isExist = this.existingVacations.find(_ => _.startOfVacationDate < this.vacation.endOfVacationDate && this.vacation.startOfVacationDate < _.endOfVacationDate && _.id != this.vacation.id);
    if (isExist) {
      this.modalService.showError('Помилка', 'Діапазон дат вказаний невірно');
      return;
    }
    this.vacationService.saveSocialWithPregnancyOrLookVacation(this.vacation).subscribe(response => {
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

  private setFormGroupByVacation(vacation: SocialWithPregnancyOrLookVacationModel): void {
    this.formGroup.controls['typeOfVacation'].setValue(vacation.typeOfVacation);
    this.formGroup.controls['startOfVacationDate'].setValue(vacation.startOfVacationDate);
    this.formGroup.controls['endOfVacationDate'].setValue(vacation.endOfVacationDate);
    this.formGroup.controls['orderNumber'].setValue(vacation.orderNumber);
    this.formGroup.controls['orderDate'].setValue(vacation.orderDate);
  }
}
