import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { PersonalCardService } from '@services/personal-card.service';
import { DiplomaModel } from '../../../models/diploma.model';

@Component({
  templateUrl: './add-diploma-modal.component.html',
  styleUrls: [
    './add-diploma-modal.component.css'
  ]
})
export class AddDiplomaModalComponent {

  public formGroup: FormGroup;

  constructor(private authService: AuthService, private dialogRef: MatDialogRef<AddDiplomaModalComponent>, private formBuilder: FormBuilder, private dialog: MatDialog,
    private personalCardService: PersonalCardService, private disciplineService: DisciplineService) {
    this.formGroup = this.formBuilder.group({
      'number': ['', Validators.required],
      'graduationDate': ['', Validators.required],
      'qualification': ['', Validators.required],
      'specialization': ['', Validators.required]
    });
  }

  public getError(controlElementName): string {
    console.log(this.formGroup);
    switch (controlElementName) {
      case 'number':
        if (this.formGroup.get('number').hasError('required')) {
          return 'номер диплому обов\'язковий';
        } else {
          return 'Невідома помилка';
        }
      case 'graduationDate':
        if (this.formGroup.get('graduationDate').hasError('required')) {
          return 'Дата закінчення обов\'язкова';
        } else {
          return 'Невідома помилка';
        }
      case 'qualification':
        if (this.formGroup.get('qualification').hasError('required')) {
          return 'Кваліфікація обов\'язкова';
        } else {
          return 'Невідома помилка';
        }
      case 'specialization':
        if (this.formGroup.get('specialization').hasError('required')) {
          return 'Спеціалізація обов\'язкова';
        } else {
          return 'Невідома помилка';
        }
      default:
        return 'Невідомий елемент для отримання помилки';
    }
  }

  public select(formValue: any): void {
    const diploma: DiplomaModel = new DiplomaModel();
    diploma.number = formValue.number;
    diploma.graduationDate = formValue.graduationDate;
    diploma.qualification = formValue.qualification;
    diploma.specialization = formValue.specialization;
    this.dialogRef.close({
      diploma: diploma
    });
  }
}
