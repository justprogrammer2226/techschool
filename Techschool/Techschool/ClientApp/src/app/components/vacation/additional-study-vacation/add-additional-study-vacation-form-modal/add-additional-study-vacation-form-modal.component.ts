import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AdditionalStudyVacationFormModel } from '@models/vacations/additional-study-vacation-form.model';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { VacationService } from '../../../../services/vacation.service';

@Component({
  templateUrl: './add-additional-study-vacation-form-modal.component.html',
  styleUrls: [
    './add-additional-study-vacation-form-modal.component.css'
  ]
})
export class AddAdditionalStudyVacationFormModalComponent {

  public formGroup: FormGroup;
  private personalCardId: string;

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<AddAdditionalStudyVacationFormModalComponent>,
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
    const form: AdditionalStudyVacationFormModel = new AdditionalStudyVacationFormModel();
    form.additionalInfo = formValue.additionalInfo;
    form.title = formValue.title;
    form.personalCardId = this.personalCardId;
    this.vacationService.saveAdditionalStudyVacationForm(form).subscribe(_ => {
      this.dialogRef.close();
    });
  }
}
