import { WorkingYearModel } from '../../../models/vacations/working-year.model';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { ModalService } from '@services/modal.service';
import { CustomValidator } from 'app/validators/custom.validator';
import { VacationService } from '../../../services/vacation.service';
import { AdditionalStudyVacationModel } from '../../../models/vacations/additional-study-vacation.model';

const workingYearDateBefore = 'workingYearDateBefore';

@Component({
  templateUrl: './add-edit-working-year-modal.component.html',
  styleUrls: [
    './add-edit-working-year-modal.component.css'
  ]
})
export class AddEditWorkingYearModalComponent {

  public formGroup: FormGroup;
  private existingWorkingYears: WorkingYearModel[] = [];
  public workingYear: WorkingYearModel = new WorkingYearModel();

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<AddEditWorkingYearModalComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private modalService: ModalService,
    private vacationService: VacationService,
    private disciplineService: DisciplineService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formGroup = this.formBuilder.group({
      'startOfWorkingYear': ['', Validators.required],
      'endOfWorkingYear': ['', Validators.required],
      'additionalStudyVacationAdditionalInfo': ['', null],
      'annualVacationDays': ['', CustomValidator.number],
      'socialWithChildrenVacationChildAge': ['', CustomValidator.number],
      'socialWithChildrenVacationDays': ['', CustomValidator.number],
    },
    {
      validator: CustomValidator.isBefore('startOfWorkingYear', 'endOfWorkingYear', workingYearDateBefore)
    });
    if (data.workingYear) {
      this.workingYear = data.workingYear;
      this.setFormGroupByWorkingYear(this.workingYear);
    } else {
      this.workingYear.personalCardId = data.personalCardId;
    }
    this.existingWorkingYears = data.existingWorkingYears;
  }

  public getError(controlElementName): string {
    switch (controlElementName) {
      case 'startOfWorkingYear':
        if (this.formGroup.get('startOfWorkingYear').hasError('required')) {
          return 'Дата початку обов\'язкова';
        } else {
          return 'Невідома помилка';
        }
      case 'endOfWorkingYear':
        if (this.formGroup.get('endOfWorkingYear').hasError('required')) {
          return 'Дата закінчення обов\'язкова';
        } else if (this.formGroup.get('endOfWorkingYear').hasError(workingYearDateBefore)) {
          return 'Дата закінчення повинна бути після початку';
        } else {
          return 'Невідома помилка';
        }
      case 'annualVacationDays':
        if (this.formGroup.get('annualVacationDays').hasError('number')) {
          return 'Кількість днів повинна бути числом';
        } else {
          return 'Невідома помилка';
        }
      case 'socialWithChildrenVacationChildAge':
        if (this.formGroup.get('socialWithChildrenVacationChildAge').hasError('number')) {
          return 'Вік дитини повинен бути числом';
        } else {
          return 'Невідома помилка';
        }
      case 'socialWithChildrenVacationDays':
        if (this.formGroup.get('socialWithChildrenVacationDays').hasError('number')) {
          return 'Кількість днів повинна бути числом';
        } else {
          return 'Невідома помилка';
        }
      default:
        return 'Невідомий елемент для отримання помилки';
    }
  }

  public saveWorkingYear(formValue: any): void {
    this.workingYear.startOfWorkingYear = formValue.startOfWorkingYear;
    this.workingYear.endOfWorkingYear = formValue.endOfWorkingYear;
    this.workingYear.additionalStudyVacationAdditionalInfo = formValue.additionalStudyVacationAdditionalInfo;
    if (formValue.annualVacationDays) this.workingYear.annualVacationDays = +formValue.annualVacationDays;
    if (formValue.socialWithChildrenVacationChildAge) this.workingYear.socialWithChildrenVacationChildAge = +formValue.socialWithChildrenVacationChildAge;
    if (formValue.socialWithChildrenVacationDays) this.workingYear.socialWithChildrenVacationDays = +formValue.socialWithChildrenVacationDays;
    const isExist = this.existingWorkingYears.find(_ => _.startOfWorkingYear < this.workingYear.endOfWorkingYear && this.workingYear.startOfWorkingYear < _.endOfWorkingYear && _.id != this.workingYear.id);
    if (isExist) {
      this.modalService.showError('Помилка', 'Діапазон дат вказаний невірно');
      return;
    }
    if (this.workingYear.startOfWorkingYear.getFullYear() + 1 != this.workingYear.endOfWorkingYear.getFullYear()
    && this.workingYear.startOfWorkingYear.getFullYear() != this.workingYear.endOfWorkingYear.getFullYear()) {
      this.modalService.showError('Помилка', 'Діапазон дат вказаний невірно');
      return;
    }
    this.vacationService.saveWorkingYear(this.workingYear).subscribe(_ => {
      this.dialogRef.close();
    }, error => {
      this.modalService.showError('Помилка', 'Невідома помилка при збереженні');
    });
  }

  private setFormGroupByWorkingYear(workingYear: WorkingYearModel): void {
    this.formGroup.controls['startOfWorkingYear'].setValue(workingYear.startOfWorkingYear);
    this.formGroup.controls['endOfWorkingYear'].setValue(workingYear.endOfWorkingYear);
    this.formGroup.controls['additionalStudyVacationAdditionalInfo'].setValue(workingYear.additionalStudyVacationAdditionalInfo);
    this.formGroup.controls['annualVacationDays'].setValue(workingYear.annualVacationDays);
    this.formGroup.controls['socialWithChildrenVacationChildAge'].setValue(workingYear.socialWithChildrenVacationChildAge);
    this.formGroup.controls['socialWithChildrenVacationDays'].setValue(workingYear.socialWithChildrenVacationDays);
  }
}
