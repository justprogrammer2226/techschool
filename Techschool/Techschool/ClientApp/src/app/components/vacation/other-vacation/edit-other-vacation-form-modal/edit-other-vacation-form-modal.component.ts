import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AnnualVacationFormModel } from '@models/vacations/annual-vacation-form.model';
import { AuthService } from '@services/auth.service';
import { VacationService } from '@services/vacation.service';
import { DisciplineService } from '@services/discipline.service';
import { OtherVacationFormModel } from '@models/vacations/other-vacation-form.model';

@Component({
  templateUrl: './edit-other-vacation-form-modal.component.html',
  styleUrls: [
    './edit-other-vacation-form-modal.component.css'
  ]
})
export class EditOtherVacationFormModalComponent {

  public formGroup: FormGroup;
  private form: OtherVacationFormModel;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<EditOtherVacationFormModalComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private vacationService: VacationService,
    private disciplineService: DisciplineService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.formGroup = this.formBuilder.group({
      'title': ['', Validators.required],
    });
    this.form = data.vacationForm;
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
      default:
        return 'Невідомий елемент для отримання помилки';
    }
  }

  public saveForm(formValue: any): void {
    this.form.title = formValue.title;
    this.vacationService.saveOtherVacationForm(this.form).subscribe(_ => {
      this.dialogRef.close();
    });
  }

  private setFormGroupByVacationForm(form: OtherVacationFormModel): void {
    this.formGroup.controls['title'].setValue(form.title);
  }
}
