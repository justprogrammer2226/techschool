import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { CycleCommissionModel } from '@models/cycle-commission.model';
import { PersonalCardModel } from '@models/personal-card.model';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { PersonalCardService } from '@services/personal-card.service';
import { NotificationModalComponent } from '../../common/modals/notification-modal/notification-modal.component';
import { SubjectModel } from '../../../models/subject.model';
import { SelectSubjectModalComponent } from '../../discipline/select-subject-modal/select-subject-modal.component';
import { AddDiplomaModalComponent } from '../add-diploma-modal/add-diploma-modal.component';
import { DiplomaModel } from '../../../models/diploma.model';

@Component({
  templateUrl: './add-personal-card-modal.component.html',
  styleUrls: [
    './add-personal-card-modal.component.css'
  ]
})
export class AddPersonalCardModalComponent {

  public formGroup: FormGroup;
  datemask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];

  public cycleCommissions: CycleCommissionModel[] = [];
  public subjectsDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  public subjectsDisplayedColumns: string[] = ['add-delete', 'name'];
  public diplomasDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  public diplomasDisplayedColumns: string[] = ['add-delete', 'number', 'graduationDate', 'qualification', 'specialization'];

  public profilePhoto: string;

  constructor(private authService: AuthService, private dialogRef: MatDialogRef<AddPersonalCardModalComponent>, private formBuilder: FormBuilder, private dialog: MatDialog,
    private personalCardService: PersonalCardService, private disciplineService: DisciplineService) {
    this.formGroup = this.formBuilder.group({
      'name': ['', Validators.required],
      'surname': ['', Validators.required],
      'patronymic': ['', Validators.required],
      'birthday': ['', Validators.required],
      'address': ['', Validators.required],
      'phone': ['', Validators.required],
      'email': ['', [Validators.required, Validators.email]],
      'employmentType': ['', Validators.required],
      'teacherQualification': ['', []],
      'teacherQualificationNote': ['', []],
      'isTeacher': [false, []],
      'isEmployee': [false, []],
      'cycleCommission': ['', []],
      'totalWorkExperienceOnDate': ['', Validators.required],
      'numberOfYearsOfTotalWorkExperience': ['', Validators.required],
      'numberOfMonthsOfTotalWorkExperience': ['', Validators.required],
      'teachingWorkExperienceOnDate': ['', []],
      'numberOfYearsOfTeachingWorkExperience': ['', []],
      'numberOfMonthsOfTeachingWorkExperience': ['', []],
    });

    this.formGroup.get('isTeacher').valueChanges.subscribe(isTeacher => {
      const teacherQualificationControl = this.formGroup.get('teacherQualification');
      const cycleCommissionControl = this.formGroup.get('cycleCommission');
      const teachingWorkExperienceOnDateControl = this.formGroup.get('teachingWorkExperienceOnDate');
      const numberOfYearsOfTeachingWorkExperienceControl = this.formGroup.get('numberOfYearsOfTeachingWorkExperience');
      const numberOfMonthsOfTeachingWorkExperienceControl = this.formGroup.get('numberOfMonthsOfTeachingWorkExperience');

      if (isTeacher) {
        teacherQualificationControl.setValidators([Validators.required]);
        cycleCommissionControl.setValidators([Validators.required]);
        teachingWorkExperienceOnDateControl.setValidators([Validators.required]);
        numberOfYearsOfTeachingWorkExperienceControl.setValidators([Validators.required]);
        numberOfMonthsOfTeachingWorkExperienceControl.setValidators([Validators.required]);
      } else {
        teacherQualificationControl.setValidators(null);
        cycleCommissionControl.setValidators(null);
        teachingWorkExperienceOnDateControl.setValidators(null);
        numberOfYearsOfTeachingWorkExperienceControl.setValidators(null);
        numberOfMonthsOfTeachingWorkExperienceControl.setValidators(null);
      }
      teacherQualificationControl.updateValueAndValidity();
      cycleCommissionControl.updateValueAndValidity();
      teachingWorkExperienceOnDateControl.updateValueAndValidity();
      numberOfYearsOfTeachingWorkExperienceControl.updateValueAndValidity();
      numberOfMonthsOfTeachingWorkExperienceControl.updateValueAndValidity();
    });

    this.disciplineService.getCycleCommissions().subscribe(response => {
      this.cycleCommissions = response;
    });
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
      case 'teacherQualification':
        if (this.formGroup.get('teacherQualification').hasError('required')) {
          return 'Категорія обов\'язкова';
        } else {
          return 'Невідома помилка';
        }
      case 'cycleCommission':
        if (this.formGroup.get('cycleCommission').hasError('required')) {
          return 'Циклова комісія обов\'язкова';
        } else {
          return 'Невідома помилка';
        }
      case 'totalWorkExperienceOnDate':
        if (this.formGroup.get('totalWorkExperienceOnDate').hasError('required')) {
          return 'Дата обов\'язкова';
        } else {
          return 'Невідома помилка';
        }
      case 'numberOfYearsOfTotalWorkExperience':
        if (this.formGroup.get('numberOfYearsOfTotalWorkExperience').hasError('required')) {
          return 'Кількість років загального стажу роботи обов\'язкова';
        } else {
          return 'Невідома помилка';
        }
      case 'numberOfMonthsOfTotalWorkExperience':
        if (this.formGroup.get('numberOfMonthsOfTotalWorkExperience').hasError('required')) {
          return 'Кількість місяців загального стажу роботи обов\'язкова';
        } else {
          return 'Невідома помилка';
        }
      case 'teachingWorkExperienceOnDate':
        if (this.formGroup.get('teachingWorkExperienceOnDate').hasError('required')) {
          return 'Дата обов\'язкова';
        } else {
          return 'Невідома помилка';
        }
      case 'numberOfYearsOfTeachingWorkExperience':
        if (this.formGroup.get('numberOfYearsOfTeachingWorkExperience').hasError('required')) {
          return 'Кількість років педагогічного стажу роботи обов\'язкова';
        } else {
          return 'Невідома помилка';
        }
      case 'numberOfMonthsOfTeachingWorkExperience':
        if (this.formGroup.get('numberOfMonthsOfTeachingWorkExperience').hasError('required')) {
          return 'Кількість місяців педагогічного стажу роботи обов\'язкова';
        } else {
          return 'Невідома помилка';
        }
      default:
        return 'Невідомий елемент для отримання помилки';
    }
  }

  public save(formValue: any): void {
    const personalCard: PersonalCardModel = new PersonalCardModel();
    personalCard.photo = this.profilePhoto;
    personalCard.name = formValue.name;
    personalCard.surname = formValue.surname;
    personalCard.patronymic = formValue.patronymic;
    personalCard.birthday = formValue.birthday;
    personalCard.address = formValue.address;
    personalCard.phoneNumber = formValue.phone;
    personalCard.email = formValue.email;
    personalCard.employmentType = formValue.employmentType;
    personalCard.teacherQualification = formValue.teacherQualification;
    personalCard.teacherQualificationNote = formValue.teacherQualificationNote;
    personalCard.isTeacher = formValue.isTeacher;
    personalCard.isEmployee = formValue.isEmployee;
    personalCard.totalWorkExperienceOnDate = formValue.totalWorkExperienceOnDate;
    personalCard.numberOfYearsOfTotalWorkExperience = formValue.numberOfYearsOfTotalWorkExperience;
    personalCard.numberOfMonthsOfTotalWorkExperience = formValue.numberOfMonthsOfTotalWorkExperience;
    if (formValue.teachingWorkExperienceOnDate) personalCard.teachingWorkExperienceOnDate = formValue.teachingWorkExperienceOnDate;
    personalCard.numberOfYearsOfTeachingWorkExperience = formValue.numberOfYearsOfTeachingWorkExperience;
    personalCard.numberOfMonthsOfTeachingWorkExperience = formValue.numberOfMonthsOfTeachingWorkExperience;
    if (formValue.cycleCommission) personalCard.cycleCommission = formValue.cycleCommission;
    personalCard.subjects = [];
    this.subjectsDataSource.data.forEach(item => {
      const newSubject = new SubjectModel();
      newSubject.id = item.id;
      newSubject.name = item.name;
      personalCard.subjects.push(newSubject);
    });
    personalCard.diplomas = [];
    this.diplomasDataSource.data.forEach(item => {
      const newDiploma = new DiplomaModel();
      newDiploma.number = item.number;
      newDiploma.graduationDate = item.graduationDate;
      newDiploma.qualification = item.qualification;
      newDiploma.specialization = item.specialization;
      personalCard.diplomas.push(newDiploma);
    });
    console.log('this.personalCard', personalCard);

    this.personalCardService.save(personalCard).subscribe(response => {
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

  public openAddDiplomaModal(): void {
    this.dialog.open(AddDiplomaModalComponent, {
      width: '350px'
    }).afterClosed().subscribe(data => {

      if (data && data.diploma) {

        const isExist = this.diplomasDataSource.data.find(_ => _.number == data.diploma.number);
        if (!isExist) {
          this.diplomasDataSource.data.push({
            number: data.diploma.number,
            graduationDate: data.diploma.graduationDate,
            qualification: data.diploma.qualification,
            specialization: data.diploma.specialization
          });
          // Refresh data source
          this.diplomasDataSource.data = this.diplomasDataSource.data;
        } else {
          this.dialog.open(NotificationModalComponent, {
            width: '300px',
            data: {
              title: 'Помилка',
              message: 'Данний диплом вже добавлений',
              isError: true
            }
          });
        }
      }
    });
  }

  public deleteSubject(id: string): void {
    this.subjectsDataSource.data = this.subjectsDataSource.data.filter(_ => _.id != id);
  }

  public deleteDiplomaByNumber(number: string): void {
    this.diplomasDataSource.data = this.diplomasDataSource.data.filter(_ => _.number != number);
  }

  public loadProfilePhoto(base64image: string): void {
    this.profilePhoto = base64image;
  }
}
