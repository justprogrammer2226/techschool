import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AnnualVacationModel } from '@models/vacations/annual-vacation.model';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { ModalService } from '@services/modal.service';
import { CustomValidator } from 'app/validators/custom.validator';
import { VacationService } from '../../../../services/vacation.service';
import { WorkingYearModel } from '@models/vacations/working-year.model';

const vacationDateBefore = 'vacationDateBefore';
const orderDateAfter = 'orderDateAfter';

@Component({
  templateUrl: './add-annual-vacation-modal.component.html',
  styleUrls: [
    './add-annual-vacation-modal.component.css'
  ]
})
export class AddAnnualVacationModalComponent {

  public formGroup: FormGroup;
  
  private workingYear: WorkingYearModel;
  private existingVacations: AnnualVacationModel[] = [];
  private leftDaysFromPreviousYearsWorkingYears: number;
  
  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<AddAnnualVacationModalComponent>,
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
      validator: [
        CustomValidator.isBefore('startOfVacationDate', 'endOfVacationDate', vacationDateBefore),
        CustomValidator.isAfter('startOfVacationDate', 'orderDate', orderDateAfter)
      ]
    });
    this.workingYear = data.workingYear;
    this.existingVacations = data.existingVacations;
    this.leftDaysFromPreviousYearsWorkingYears = data.leftDaysFromPreviousYearsWorkingYears;
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
        } else if (this.formGroup.get('orderDate').hasError(orderDateAfter)) {
          return 'Дата наказу повинна бути до дати початку';
        } else {
          return 'Невідома помилка';
        }
      default:
        return 'Невідомий елемент для отримання помилки';
    }
  }

  public saveVacation(formValue: any): void {
    const vacation: AnnualVacationModel = new AnnualVacationModel();
    vacation.startOfVacationDate = formValue.startOfVacationDate;
    vacation.endOfVacationDate = formValue.endOfVacationDate;
    vacation.orderNumber = formValue.orderNumber;
    vacation.orderDate = formValue.orderDate;
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
    if (this.getExistingVacationDays() + this.getDaysBetweenDates(vacation.startOfVacationDate, vacation.endOfVacationDate) > this.workingYear.annualVacationDays + this.leftDaysFromPreviousYearsWorkingYears) {
      this.modalService.showError('Помилка', 'Кількість днів більше положеного');
      return;
    }
    this.vacationService.saveAnnualVacation(vacation).subscribe(_ => {
      this.dialogRef.close();
    });
  }

  // Except current vacation
  private getExistingVacationDays(currentId: string = null): number {
    let vacationDays = 0;
    vacationDays += this.existingVacations.filter(_ => _.id !== currentId).reduce((sum, current) => {
      return sum + this.getDaysBetweenDates(current.startOfVacationDate, current.endOfVacationDate);
    }, 0);
    return vacationDays;
  }

  private getDaysBetweenDates(date1: Date, date2: Date): number {
    const days = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
    return days;
  }
}
