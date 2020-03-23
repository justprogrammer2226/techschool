import { VacationService } from '../../../../services/vacation.service';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AnnualVacationFormModel } from '@models/vacations/annual-vacation-form.model';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { PersonalCardService } from '@services/personal-card.service';

@Component({
  templateUrl: './add-annual-vacation-form-modal.component.html',
  styleUrls: [
    './add-annual-vacation-form-modal.component.css'
  ]
})
export class AddAnnualVacationFormModalComponent {

  public formGroup: FormGroup;
  private personalCardId: string;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<AddAnnualVacationFormModalComponent>,
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
    this.personalCardId = data.personalCardId;
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
    const form: AnnualVacationFormModel = new AnnualVacationFormModel();
    form.startOfWorkingYear = formValue.startOfWorkingYear;
    form.endOfWorkingYear = formValue.endOfWorkingYear;
    form.title = formValue.title;
    form.days = +formValue.days;
    form.personalCardId = this.personalCardId;
    this.vacationService.saveAnnualVacationForm(form).subscribe(_ => {
      this.dialogRef.close();
    });
  }
}
