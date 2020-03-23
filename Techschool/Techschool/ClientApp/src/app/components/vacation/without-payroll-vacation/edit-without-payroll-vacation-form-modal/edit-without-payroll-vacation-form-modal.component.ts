import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { WithoutPayrollVacationFormModel } from '@models/vacations/without-payroll-vacation-form.model';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { VacationService } from '@services/vacation.service';

@Component({
  templateUrl: './edit-without-payroll-vacation-form-modal.component.html',
  styleUrls: [
    './edit-without-payroll-vacation-form-modal.component.css'
  ]
})
export class EditWithoutPayrollVacationFormModalComponent {

  public formGroup: FormGroup;
  private form: WithoutPayrollVacationFormModel;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<EditWithoutPayrollVacationFormModalComponent>,
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
    this.vacationService.saveWithoutPayrollVacationForm(this.form).subscribe(_ => {
      this.dialogRef.close();
    });
  }

  private setFormGroupByVacationForm(form: WithoutPayrollVacationFormModel): void {
    this.formGroup.controls['title'].setValue(form.title);
  }
}
