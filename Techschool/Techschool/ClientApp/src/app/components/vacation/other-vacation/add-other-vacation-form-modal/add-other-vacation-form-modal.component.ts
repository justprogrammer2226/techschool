import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { OtherVacationFormModel } from '../../../../models/vacations/other-vacation-form.model';
import { VacationService } from '../../../../services/vacation.service';

@Component({
  templateUrl: './add-other-vacation-form-modal.component.html',
  styleUrls: [
    './add-other-vacation-form-modal.component.css'
  ]
})
export class AddOtherVacationFormModalComponent {

  public formGroup: FormGroup;
  private personalCardId: string;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<AddOtherVacationFormModalComponent>,
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
    const form: OtherVacationFormModel = new OtherVacationFormModel();
    form.title = formValue.title;
    form.personalCardId = this.personalCardId;
    this.vacationService.saveOtherVacationForm(form).subscribe(_ => {
      this.dialogRef.close();
    });
  }
}
