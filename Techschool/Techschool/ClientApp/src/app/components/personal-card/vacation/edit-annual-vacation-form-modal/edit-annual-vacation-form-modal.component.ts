import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { PersonalCardService } from '@services/personal-card.service';
import { DiplomaModel } from '../../../../models/diploma.model';
import { AnnualVacationModel } from '@models/vacations/annual-vacation.model';
import { AnnualVacationFormModel } from '@models/vacations/annual-vacation-form.model';

@Component({
  templateUrl: './edit-annual-vacation-form-modal.component.html',
  styleUrls: [
    './edit-annual-vacation-form-modal.component.css'
  ]
})
export class EditAnnualVacationFormModalComponent {

  public formGroup: FormGroup;
  private annualVacationForm: AnnualVacationFormModel;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<EditAnnualVacationFormModalComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private personalCardService: PersonalCardService,
    private disciplineService: DisciplineService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formGroup = this.formBuilder.group({
      'startOfWorkingYear': ['', Validators.required],
      'endOfWorkingYear': ['', Validators.required],
      'title': ['', Validators.required],
      'days': ['', Validators.required]
    });
    this.annualVacationForm = data.annualVacationForm;
    this.setFormGroupByAnnualVacationForm(this.annualVacationForm);
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
        } else {
          return 'Невідома помилка';
        }
      case 'title':
        if (this.formGroup.get('title').hasError('required')) {
          return 'Назва форми обов\'язкова';
        } else {
          return 'Невідома помилка';
        }
      case 'days':
        if (this.formGroup.get('days').hasError('required')) {
          return 'Кількість днів обов\'язкова';
        } else {
          return 'Невідома помилка';
        }
      default:
        return 'Невідомий елемент для отримання помилки';
    }
  }

  public saveForm(formValue: any): void {
    this.annualVacationForm.startOfWorkingYear = formValue.startOfWorkingYear;
    this.annualVacationForm.endOfWorkingYear = formValue.endOfWorkingYear;
    this.annualVacationForm.title = formValue.title;
    this.annualVacationForm.days = +formValue.days;
    this.personalCardService.saveAnnualVacationForm(this.annualVacationForm).subscribe(_ => {
      this.dialogRef.close();
    });
  }

  private setFormGroupByAnnualVacationForm(form: AnnualVacationFormModel): void {
    this.formGroup.controls['startOfWorkingYear'].setValue(form.startOfWorkingYear);
    this.formGroup.controls['endOfWorkingYear'].setValue(form.endOfWorkingYear);
    this.formGroup.controls['title'].setValue(form.title);
    this.formGroup.controls['days'].setValue(form.days);
  }
}
