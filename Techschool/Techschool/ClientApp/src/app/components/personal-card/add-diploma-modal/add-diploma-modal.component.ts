import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { ModalService } from '@services/modal.service';
import { PersonalCardService } from '@services/personal-card.service';
import { CustomValidator } from 'app/validators/custom.validator';
import { DiplomaModel } from './../../../models/diploma.model';

@Component({
  templateUrl: './add-diploma-modal.component.html',
  styleUrls: [
    './add-diploma-modal.component.css'
  ]
})
export class AddDiplomaModalComponent {

  public formGroup: FormGroup;
  private existingDiplomas: DiplomaModel[] = [];

  constructor(
    private authService: AuthService,
    private dialogRef: MatDialogRef<AddDiplomaModalComponent>,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private modalService: ModalService,
    private personalCardService: PersonalCardService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private disciplineService: DisciplineService) {
    this.existingDiplomas = data.existingDiplomas;
    this.formGroup = this.formBuilder.group({
      'nameOfTheInstitution': ['', Validators.required],
      'faculty': ['', Validators.required],
      'receiptDate': ['', Validators.required],
      'graduationDate': ['', Validators.required],
      'specialization': ['', Validators.required],
      'number': ['', Validators.required]
    },
    {
      validator: CustomValidator.isBefore('receiptDate', 'graduationDate', 'graduationDateBefore')
    });
  }

  public getError(controlElementName): string {
    console.log(this.formGroup);
    switch (controlElementName) {
      case 'nameOfTheInstitution':
        if (this.formGroup.get('nameOfTheInstitution').hasError('required')) {
          return 'Навчальний заклад обов\'язковий';
        } else {
          return 'Невідома помилка';
        }
      case 'faculty':
        if (this.formGroup.get('faculty').hasError('required')) {
          return 'Факультет обов\'язковий';
        } else {
          return 'Невідома помилка';
        }
      case 'receiptDate':
        if (this.formGroup.get('receiptDate').hasError('required')) {
          return 'Дата вступу обов\'язкова';
        } else {
          return 'Невідома помилка';
        }
      case 'graduationDate':
        if (this.formGroup.get('graduationDate').hasError('required')) {
          return 'Дата закінчення обов\'язкова';
        } else if (this.formGroup.get('graduationDate').hasError('graduationDateBefore')) {
          return 'Дата закінчення повинна бути після початку';
        } else {
          return 'Невідома помилка';
        }
      case 'specialization':
        if (this.formGroup.get('specialization').hasError('required')) {
          return 'Спеціальність обов\'язкова';
        } else {
          return 'Невідома помилка';
        }
      case 'number':
        if (this.formGroup.get('number').hasError('required')) {
          return 'Номер диплому обов\'язковий';
        } else {
          return 'Невідома помилка';
        }
      default:
        return 'Невідомий елемент для отримання помилки';
    }
  }

  public add(formValue: any): void {

    const diploma: DiplomaModel = new DiplomaModel();
    diploma.nameOfTheInstitution = formValue.nameOfTheInstitution;
    diploma.faculty = formValue.faculty;
    diploma.receiptDate = formValue.receiptDate;
    diploma.graduationDate = formValue.graduationDate;
    diploma.specialization = formValue.specialization;
    diploma.number = formValue.number;
    
    let isExist = this.existingDiplomas.find(_ => _.number == diploma.number);
    if (isExist) {
      this.modalService.showError('Помилка', 'Данний диплом вже добавлений до цього працівника');
      return;
    }

    isExist = this.existingDiplomas.find(_ => _.receiptDate < diploma.graduationDate && diploma.receiptDate < _.graduationDate);
    if (isExist) {
      this.modalService.showError('Помилка', 'Діапазон навчання вказаний невірно');
      return;
    }

    this.personalCardService.canSaveDiploma(diploma).subscribe(_ => {
      this.dialogRef.close({
        diploma: diploma
      });
    }, error => {
      if (error.error.isSameNumberExist) {
        this.modalService.showError('Помилка', 'Диплом з вказаним номером вже існує');
      }
    });
    
  }
}
