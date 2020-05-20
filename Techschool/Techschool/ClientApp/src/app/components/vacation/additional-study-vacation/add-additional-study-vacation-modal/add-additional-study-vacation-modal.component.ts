import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { ModalService } from '@services/modal.service';
import { CustomValidator } from 'app/validators/custom.validator';
import { VacationService } from '../../../../services/vacation.service';
import { AdditionalStudyVacationModel } from './../../../../models/vacations/additional-study-vacation.model';

const vacationDateBefore = 'vacationDateBefore';

@Component({
  templateUrl: './add-additional-study-vacation-modal.component.html',
  styleUrls: [
    './add-additional-study-vacation-modal.component.css'
  ]
})
export class AddAdditionalStudyVacationModalComponent {

  public formGroup: FormGroup;
  private formId: string;
  private existingVacations: AdditionalStudyVacationModel[] = [];

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<AddAdditionalStudyVacationModalComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private modalService: ModalService,
    private vacationService: VacationService,
    private disciplineService: DisciplineService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formGroup = this.formBuilder.group({
      'startOfVacationDate': ['', Validators.required],
      'endOfVacationDate': ['', Validators.required],
      'orderNumber': ['', Validators.required],
      'orderDate': ['', Validators.required]
    },
    {
      validator: CustomValidator.isBefore('startOfVacationDate', 'endOfVacationDate', vacationDateBefore)
    });
    this.formId = data.formId;
    this.existingVacations = data.existingVacations;
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
    const vacation: AdditionalStudyVacationModel = new AdditionalStudyVacationModel();
    vacation.startOfVacationDate = formValue.startOfVacationDate;
    vacation.endOfVacationDate = formValue.endOfVacationDate;
    vacation.orderNumber = formValue.orderNumber;
    vacation.orderDate = formValue.orderDate;
    vacation.additionalStudyVacationFormId = this.formId;
    const isExist = this.existingVacations.find(_ => _.startOfVacationDate < vacation.endOfVacationDate && vacation.startOfVacationDate < _.endOfVacationDate);
    if (isExist) {
      this.modalService.showError('Помилка', 'Діапазон дат вказаний невірно');
      return;
    }
    this.vacationService.saveAdditionalStudyVacation(vacation).subscribe(_ => {
      this.dialogRef.close();
    });
  }
}
