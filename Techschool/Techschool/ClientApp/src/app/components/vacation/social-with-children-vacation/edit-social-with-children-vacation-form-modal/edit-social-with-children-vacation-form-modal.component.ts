import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { VacationService } from '../../../../services/vacation.service';
import { SocialWithChildrenVacationFormModel } from './../../../../models/vacations/social-with-children-vacation-form.model';

@Component({
  templateUrl: './edit-social-with-children-vacation-form-modal.component.html',
  styleUrls: [
    './edit-social-with-children-vacation-form-modal.component.css'
  ]
})
export class EditSocialWithChildrenVacationFormModalComponent {

  public formGroup: FormGroup;
  private form: SocialWithChildrenVacationFormModel;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<EditSocialWithChildrenVacationFormModalComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private vacationService: VacationService,
    private disciplineService: DisciplineService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formGroup = this.formBuilder.group({
      'title': ['', Validators.required],
      'childAge': ['', Validators.required],
      'days': ['', Validators.required],
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
      case 'childAge':
        if (this.formGroup.get('childAge').hasError('required')) {
          return 'Вік дитини';
        } else {
          return 'Невідома помилка';
        }
      case 'days':
        if (this.formGroup.get('days').hasError('required')) {
          return 'Поле положено днів обов\'язкове';
        } else {
          return 'Невідома помилка';
        }
      default:
        return 'Невідомий елемент для отримання помилки';
    }
  }

  public saveForm(formValue: any): void {
    this.form.childAge = formValue.childAge;
    this.form.days = formValue.days;
    this.form.title = formValue.title;
    this.vacationService.saveSocialWithChildrenVacationForm(this.form).subscribe(_ => {
      this.dialogRef.close();
    });
  }

  private setFormGroupByVacationForm(form: SocialWithChildrenVacationFormModel): void {
    this.formGroup.controls['title'].setValue(form.title);
    this.formGroup.controls['childAge'].setValue(form.childAge);
    this.formGroup.controls['days'].setValue(form.days);
  }
}
