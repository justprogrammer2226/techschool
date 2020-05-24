import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AnnualVacationModel } from '@models/vacations/annual-vacation.model';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { ModalService } from '@services/modal.service';
import { NotificationModalComponent } from 'app/components/common/modals/notification-modal/notification-modal.component';
import { VacationService } from '../../../../services/vacation.service';
import { CustomValidator } from 'app/validators/custom.validator';
import { WorkingYearModel } from '@models/vacations/working-year.model';

const vacationDateBefore = 'vacationDateBefore';
const orderDateAfter = 'orderDateAfter';

@Component({
  templateUrl: './edit-annual-vacation-modal.component.html',
  styleUrls: [
    './edit-annual-vacation-modal.component.css'
  ]
})
export class EditAnnualVacationModalComponent {

  public formGroup: FormGroup;
  public vacation: AnnualVacationModel = new AnnualVacationModel();
  private workingYear: WorkingYearModel;
  private existingVacations: AnnualVacationModel[] = [];
  private leftDaysFromPreviousYearsWorkingYears: number;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<EditAnnualVacationModalComponent>,
    private formBuilder: FormBuilder,
    private modalService: ModalService,
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
    },
    {
      validator: [
        CustomValidator.isBefore('startOfVacationDate', 'endOfVacationDate', vacationDateBefore),
        CustomValidator.isAfter('startOfVacationDate', 'orderDate', orderDateAfter)
      ]
    });
    if (data.vacation) {
      this.vacation = data.vacation;
      this.setFormGroupByVacation(this.vacation);
    }
    this.existingVacations = data.existingVacations;
    this.workingYear = data.workingYear;
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
    this.vacation.startOfVacationDate = formValue.startOfVacationDate;
    this.vacation.endOfVacationDate = formValue.endOfVacationDate;
    this.vacation.orderNumber = formValue.orderNumber;
    this.vacation.orderDate = formValue.orderDate;
    const isExist = this.existingVacations.find(_ => _.startOfVacationDate < this.vacation.endOfVacationDate && this.vacation.startOfVacationDate < _.endOfVacationDate && _.id != this.vacation.id);
    if (isExist) {
      this.modalService.showError('Помилка', 'Діапазон дат вказаний невірно');
      return;
    }
    if (!(this.workingYear.startOfWorkingYear <= this.vacation.startOfVacationDate && this.vacation.endOfVacationDate <= this.workingYear.endOfWorkingYear)) {
      this.modalService.showError('Помилка', 'Діапазон дат виходить за діапазон робочого року');
      return;
    }
    if (this.getExistingVacationDays(this.vacation.id) + this.getDaysBetweenDates(this.vacation.startOfVacationDate, this.vacation.endOfVacationDate) > this.workingYear.annualVacationDays + this.leftDaysFromPreviousYearsWorkingYears) {
      this.modalService.showError('Помилка', 'Кількість днів більше положеного');
      return;
    }
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
