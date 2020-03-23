import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { VacationService } from '../../../../services/vacation.service';
import { AdditionalStudyVacationFormModel } from './../../../../models/vacations/additional-study-vacation-form.model';

@Component({
  templateUrl: './edit-additional-study-vacation-form-modal.component.html',
  styleUrls: [
    './edit-additional-study-vacation-form-modal.component.css'
  ]
})
export class EditAdditionalStudyVacationFormModalComponent {

  public formGroup: FormGroup;
  private form: AdditionalStudyVacationFormModel;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<EditAdditionalStudyVacationFormModalComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private vacationService: VacationService,
    private disciplineService: DisciplineService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formGroup = this.formBuilder.group({
      'title': ['', Validators.required],
      'additionalInfo': ['', Validators.required]
    });
    this.form = data.form;
    this.setFormGroupByVacationForm(this.form);
  }

  public getError(controlElementName): string {
    switch (controlElementName) {
      case 'title':
        if (this.formGroup.get('title').hasError('required')) {
          return 'Назва форми обов\'язкова';
        } else {
          return 'Невідома помилка';
        }
      case 'additionalInfo':
        if (this.formGroup.get('additionalInfo').hasError('required')) {
          return 'Навчальний заклад та курс обов\'язковий';
        } else {
          return 'Невідома помилка';
        }
      default:
        return 'Невідомий елемент для отримання помилки';
    }
  }

  public saveForm(formValue: any): void {
    this.form.additionalInfo = formValue.additionalInfo;
    this.form.title = formValue.title;
    this.vacationService.saveAdditionalStudyVacationForm(this.form).subscribe(_ => {
      this.dialogRef.close();
    });
  }

  private setFormGroupByVacationForm(form: AdditionalStudyVacationFormModel): void {
    this.formGroup.controls['title'].setValue(form.title);
    this.formGroup.controls['additionalInfo'].setValue(form.additionalInfo);
  }
}
