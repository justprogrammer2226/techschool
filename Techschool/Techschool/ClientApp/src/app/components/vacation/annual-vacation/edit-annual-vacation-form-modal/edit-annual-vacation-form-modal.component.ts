import { VacationService } from '../../../../services/vacation.service';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AnnualVacationFormModel } from '@models/vacations/annual-vacation-form.model';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { PersonalCardService } from '@services/personal-card.service';

@Component({
  templateUrl: './edit-annual-vacation-form-modal.component.html',
  styleUrls: [
    './edit-annual-vacation-form-modal.component.css'
  ]
})
export class EditAnnualVacationFormModalComponent {

  public formGroup: FormGroup;
  private form: AnnualVacationFormModel;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<EditAnnualVacationFormModalComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private vacationService: VacationService,
    private disciplineService: DisciplineService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formGroup = this.formBuilder.group({
      'startOfWorkingYear': ['', Validators.required],
      'endOfWorkingYear': ['', Validators.required],
      'title': ['', Validators.required],
      'days': ['', Validators.required]
    });
    this.form = data.form;
    this.setFormGroupByVacationForm(this.form);
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
    this.form.startOfWorkingYear = formValue.startOfWorkingYear;
    this.form.endOfWorkingYear = formValue.endOfWorkingYear;
    this.form.title = formValue.title;
    this.form.days = +formValue.days;
    this.vacationService.saveAnnualVacationForm(this.form).subscribe(_ => {
      this.dialogRef.close();
    });
  }

  private setFormGroupByVacationForm(form: AnnualVacationFormModel): void {
    this.formGroup.controls['startOfWorkingYear'].setValue(form.startOfWorkingYear);
    this.formGroup.controls['endOfWorkingYear'].setValue(form.endOfWorkingYear);
    this.formGroup.controls['title'].setValue(form.title);
    this.formGroup.controls['days'].setValue(form.days);
  }
}
