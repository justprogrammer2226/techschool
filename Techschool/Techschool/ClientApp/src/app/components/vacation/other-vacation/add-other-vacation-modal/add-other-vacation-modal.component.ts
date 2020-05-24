import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { ModalService } from '@services/modal.service';
import { CustomValidator } from 'app/validators/custom.validator';
import { OtherVacationModel } from '../../../../models/vacations/other-vacation.model';
import { VacationService } from '../../../../services/vacation.service';
import { WorkingYearModel } from '@models/vacations/working-year.model';

const vacationDateBefore = 'vacationDateBefore';
const orderDateAfter = 'orderDateAfter';

@Component({
  templateUrl: './add-other-vacation-modal.component.html',
  styleUrls: [
    './add-other-vacation-modal.component.css'
  ]
})
export class AddOtherVacationModalComponent {

  public formGroup: FormGroup;
  
  private workingYear: WorkingYearModel;
  private existingVacations: OtherVacationModel[] = [];

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<AddOtherVacationModalComponent>,
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
      'notes': ['', Validators.required]
    },
    {
      validator: [
        CustomValidator.isBefore('startOfVacationDate', 'endOfVacationDate', vacationDateBefore),
        CustomValidator.isAfter('startOfVacationDate', 'orderDate', orderDateAfter)
      ]
    });
    this.workingYear = data.workingYear;
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
        } else if (this.formGroup.get('orderDate').hasError(orderDateAfter)) {
          return 'Дата наказу повинна бути до дати початку';
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
    vacation.workingYearId = this.workingYear.id;
    const isExist = this.existingVacations.find(_ => _.startOfVacationDate < vacation.endOfVacationDate && vacation.startOfVacationDate < _.endOfVacationDate);
    if (isExist) {
      this.modalService.showError('Помилка', 'Діапазон дат вказаний невірно');
      return;
    }
    if (!(this.workingYear.startOfWorkingYear <= vacation.startOfVacationDate && vacation.endOfVacationDate <= this.workingYear.endOfWorkingYear)) {
      this.modalService.showError('Помилка', 'Діапазон дат виходить за діапазон робочого року');
      return;
    }
    this.vacationService.saveOtherVacation(vacation).subscribe(_ => {
      this.dialogRef.close();
    });
  }
}
