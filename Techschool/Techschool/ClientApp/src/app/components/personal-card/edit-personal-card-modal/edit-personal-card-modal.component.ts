import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatTableDataSource, MAT_DIALOG_DATA } from '@angular/material';
import { CycleCommissionModel } from '@models/cycle-commission.model';
import { PersonalCardModel } from '@models/personal-card.model';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { PersonalCardService } from '@services/personal-card.service';
import { NotificationModalComponent } from '../../common/modals/notification-modal/notification-modal.component';
import { SubjectModel } from '@models/subject.model';
import { SelectSubjectModalComponent } from '../../discipline/select-subject-modal/select-subject-modal.component';

@Component({
  templateUrl: './edit-personal-card-modal.component.html',
  styleUrls: [
    './edit-personal-card-modal.component.css'
  ]
})
export class EditPersonalCardModalComponent {

  public formGroup: FormGroup;
  datemask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];

  public cycleCommissions: CycleCommissionModel[] = [];
  public subjectsDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  public subjectsDisplayedColumns: string[] = ['add-delete', 'name'];

  public personalCard: PersonalCardModel = new PersonalCardModel();

  constructor(private authService: AuthService, private dialogRef: MatDialogRef<EditPersonalCardModalComponent>, private formBuilder: FormBuilder, private dialog: MatDialog,
    private personalCardService: PersonalCardService, private disciplineService: DisciplineService, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.initFormGroup();
    if (data.personalCard) {
      this.personalCard = data.personalCard;
      this.subjectsDataSource.data = this.subjectsToDataSource(this.personalCard.subjects);
      this.disciplineService.getCycleCommissions().subscribe(response => {
        this.cycleCommissions = response;
        this.setFormGroupByPersonalCard(this.personalCard);
      });
    }
  }

  public getError(controlElementName): string {
    switch (controlElementName) {
      case 'name':
        if (this.formGroup.get('name').hasError('required')) {
          return 'Ім\'я обов\'язкове';
        } else {
          return 'Невідома помилка';
        }
      case 'surname':
        if (this.formGroup.get('surname').hasError('required')) {
          return 'Прізвище обов\'язкове';
        } else {
          return 'Невідома помилка';
        }
      case 'patronymic':
        if (this.formGroup.get('patronymic').hasError('required')) {
          return 'По-батькові обов\'язкове';
        } else {
          return 'Невідома помилка';
        }
      case 'birthday':
        if (this.formGroup.get('birthday').hasError('required')) {
          return 'Дата народження обов\'язкова';
        } else {
          return 'Невідома помилка';
        }
      case 'address':
        if (this.formGroup.get('address').hasError('required')) {
          return 'Адрес обов\'язковий';
        } else {
          return 'Невідома помилка';
        }
      case 'phone':
        if (this.formGroup.get('phone').hasError('required')) {
          return 'Телефон обов\'язковий';
        } else {
          return 'Невідома помилка';
        }
      case 'email':
        if (this.formGroup.get('email').hasError('required')) {
          return 'Електронна пошта обов\'язкова';
        } else if (this.formGroup.get('email').hasError('email')) {
          return 'Некорректна електронна пошта';
        } else {
          return 'Невідома помилка';
        }
      case 'employmentType':
        if (this.formGroup.get('employmentType').hasError('required')) {
          return 'Вид працевлаштування обов\'язковий';
        } else {
          return 'Невідома помилка';
        }
      case 'cycleCommission':
        if (this.formGroup.get('cycleCommission').hasError('required')) {
          return 'Циклова комісія обов\'язкова';
        } else {
          return 'Невідома помилка';
        }
      default:
        return 'Невідомий елемент для отримання помилки';
    }
  }

  public save(formValue: any): void {
    this.personalCard.name = formValue.name;
    this.personalCard.surname = formValue.surname;
    this.personalCard.patronymic = formValue.patronymic;
    this.personalCard.birthday = formValue.birthday;
    this.personalCard.address = formValue.address;
    this.personalCard.phoneNumber = formValue.phone;
    this.personalCard.email = formValue.email;
    this.personalCard.employmentType = formValue.employmentType;
    this.personalCard.isTeacher = formValue.isTeacher;
    this.personalCard.isEmployee = formValue.isEmployee;
    this.personalCard.cycleCommission = formValue.cycleCommission;
    this.personalCard.subjects = [];
    this.subjectsDataSource.data.forEach(item => {
      const newSubject = new SubjectModel();
      newSubject.id = item.id;
      newSubject.name = item.name;
      this.personalCard.subjects.push(newSubject);
    });

    this.personalCardService.save(this.personalCard).subscribe(response => {
      this.dialog.open(NotificationModalComponent, {
        width: '300px',
        data: {
          title: 'Особистка картка',
          message: 'Додання особистої картки пройшло успішно.'
        }
      });
      this.dialogRef.close();
    }, error => {
        this.dialog.open(NotificationModalComponent, {
          width: '300px',
          data: {
            title: 'Помилка',
            message: 'Невідома помилка при реєстрації',
            isError: true
          }
        });
    });
  }

  public openSelectSubjectModal(): void {
    this.dialog.open(SelectSubjectModalComponent, {
      width: '350px'
    }).afterClosed().subscribe(data => {
      if (data && data.selectedSubject) {
        const isExist = this.subjectsDataSource.data.find(_ => _.id == data.selectedSubject.id);
        if (!isExist) {
          this.subjectsDataSource.data.push({
            id: data.selectedSubject.id,
            name: data.selectedSubject.name
          });
          // Refresh data source
          this.subjectsDataSource.data = this.subjectsDataSource.data;
        } else {
          this.dialog.open(NotificationModalComponent, {
            width: '300px',
            data: {
              title: 'Помилка',
              message: 'Данний предмет вже добавлений',
              isError: true
            }
          });
        }
      }
    });
  }

  public delete(subjectId: string): void {
    console.log(this.personalCard);
    this.subjectsDataSource.data = this.subjectsDataSource.data.filter(_ => _.id != subjectId);
  }

  private initFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      'name': ['', Validators.required],
      'surname': ['', Validators.required],
      'patronymic': ['', Validators.required],
      'birthday': ['', Validators.required],
      'address': ['', Validators.required],
      'phone': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'employmentType': ['', Validators.required],
      'isTeacher': [false,],
      'isEmployee': [false,],
      'cycleCommission': [''],
    });

    this.formGroup.get('isTeacher').valueChanges.subscribe(isTeacher => {
      const cycleCommissionControl = this.formGroup.get('cycleCommission');
      if (isTeacher) {
        cycleCommissionControl.setValidators([Validators.required]);
      } else {
        cycleCommissionControl.setValidators(null);
      }
      cycleCommissionControl.updateValueAndValidity();
    });
  }

  private setFormGroupByPersonalCard(personalCard: PersonalCardModel): void {
    this.formGroup.controls['name'].setValue(personalCard.name);
    this.formGroup.controls['surname'].setValue(personalCard.surname);
    this.formGroup.controls['patronymic'].setValue(personalCard.patronymic);
    this.formGroup.controls['birthday'].setValue(personalCard.birthday);
    this.formGroup.controls['address'].setValue(personalCard.address);
    this.formGroup.controls['phone'].setValue(personalCard.phoneNumber);
    this.formGroup.controls['email'].setValue(personalCard.email);
    this.formGroup.controls['employmentType'].setValue(personalCard.employmentType);
    this.formGroup.controls['isTeacher'].setValue(personalCard.isTeacher);
    this.formGroup.controls['isEmployee'].setValue(personalCard.isEmployee);
    const selectedCycleCommission = this.cycleCommissions.find(_ => _.id == personalCard.cycleCommission.id);
    this.formGroup.controls['cycleCommission'].setValue(selectedCycleCommission);
  }

  private subjectsToDataSource(subjects: SubjectModel[]): any {
    return subjects.map(subject => {
      return {
        id: subject.id,
        name: subject.name
      };
    });
  }
}
