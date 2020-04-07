import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { CustomValidator } from 'app/validators/custom.validator';
import { VacationService } from '../../../../services/vacation.service';
import { SocialWithChildrenVacationFormModel } from './../../../../models/vacations/social-with-children-vacation-form.model';

@Component({
  templateUrl: './add-social-with-children-vacation-form-modal.component.html',
  styleUrls: [
    './add-social-with-children-vacation-form-modal.component.css'
  ]
})
export class AddSocialWithChildrenVacationFormModalComponent {

  public formGroup: FormGroup;
  private personalCardId: string;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<AddSocialWithChildrenVacationFormModalComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private vacationService: VacationService,
    private disciplineService: DisciplineService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formGroup = this.formBuilder.group({
      'title': ['', Validators.required],
      'childAge': ['', [Validators.required, CustomValidator.number]],
      'days': ['', [Validators.required, CustomValidator.number]],
    });
    this.personalCardId = data.personalCardId;
  }

  public getError(controlElementName): string {
    switch (controlElementName) {
      case 'title':
        if (this.formGroup.get('title').hasError('required')) {
          return 'Назва форми обов\'язкова';
        } else {
          return 'Невідома помилка';
        }
      case 'childAge':
        if (this.formGroup.get('childAge').hasError('required')) {
          return 'Вік дитини';
        } else if (this.formGroup.get('childAge').hasError('number')) {
          return 'Вік дитини повинен бути числом';
        } else {
          return 'Невідома помилка';
        }
      case 'days':
        if (this.formGroup.get('days').hasError('required')) {
          return 'Поле положено днів обов\'язкове';
        } else if (this.formGroup.get('days').hasError('number')) {
          return 'Кількість днів повинна бути числом';
        } else {
          return 'Невідома помилка';
        }
      default:
        return 'Невідомий елемент для отримання помилки';
    }
  }

  public saveForm(formValue: any): void {
    const form: SocialWithChildrenVacationFormModel = new SocialWithChildrenVacationFormModel();
    form.childAge = +formValue.childAge;
    form.days = +formValue.days;
    form.title = formValue.title;
    form.personalCardId = this.personalCardId;
    this.vacationService.saveSocialWithChildrenVacationForm(form).subscribe(_ => {
      this.dialogRef.close();
    });
  }
}
