import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { SocialWithPregnancyOrLookVacationFormModel } from '../../../../models/vacations/social-with-pregnancy-or-look-vacation-form.model';
import { VacationService } from '../../../../services/vacation.service';

@Component({
  templateUrl: './add-social-with-pregnancy-vacation-form-modal.component.html',
  styleUrls: [
    './add-social-with-pregnancy-vacation-form-modal.component.css'
  ]
})
export class AddSocialWithPregnancyOrLookVacationFormModalComponent {

  public formGroup: FormGroup;
  private personalCardId: string;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<AddSocialWithPregnancyOrLookVacationFormModalComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private vacationService: VacationService,
    private disciplineService: DisciplineService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formGroup = this.formBuilder.group({
      'title': ['', Validators.required],
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
      default:
        return 'Невідомий елемент для отримання помилки';
    }
  }

  public saveForm(formValue: any): void {
    const form: SocialWithPregnancyOrLookVacationFormModel = new SocialWithPregnancyOrLookVacationFormModel();
    form.title = formValue.title;
    form.personalCardId = this.personalCardId;
    this.vacationService.saveSocialWithPregnancyOrLookVacationForm(form).subscribe(_ => {
      this.dialogRef.close();
    });
  }
}
