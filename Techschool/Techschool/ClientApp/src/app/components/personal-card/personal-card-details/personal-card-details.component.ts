import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MatTableDataSource, MatDatepicker } from '@angular/material';
import { CycleCommissionModel } from '@models/cycle-commission.model';
import { PersonalCardModel } from '@models/personal-card.model';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { PersonalCardService } from '@services/personal-card.service';
import { NotificationModalComponent } from '../../common/modals/notification-modal/notification-modal.component';
import { SubjectModel } from '../../../models/subject.model';
import { SelectSubjectModalComponent } from '../../discipline/select-subject-modal/select-subject-modal.component';
import { ActivatedRoute, Router } from '@angular/router';
import { EditPersonalCardModalComponent } from '../edit-personal-card-modal/edit-personal-card-modal.component';
import { DiplomaModel } from '../../../models/diploma.model';
import { AddAnnualVacationModalComponent } from '../vacation/add-annual-vacation-modal/add-annual-vacation-modal.component';
import { EditAnnualVacationModalComponent } from '../vacation/edit-annual-vacation-modal/edit-annual-vacation-modal.component';
import { AnnualVacationModel } from '@models/vacations/annual-vacation.model';
import { AnnualVacationFormModel } from '@models/vacations/annual-vacation-form.model';
import { AddAnnualVacationFormModalComponent } from '../vacation/add-annual-vacation-form-modal/add-annual-vacation-form-modal.component';

@Component({
  templateUrl: './personal-card-details.component.html',
  styleUrls: [
    './personal-card-details.component.css'
  ]
})
export class PersonalCardDetailsComponent {

  public formGroup: FormGroup;
  datemask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];

  public cycleCommissions: CycleCommissionModel[] = [];
  public subjectsDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  public subjectsDisplayedColumns: string[] = ['name'];
  public diplomasDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  public diplomasDisplayedColumns: string[] = ['number', 'graduationDate', 'qualification', 'specialization'];

  public personalCard: PersonalCardModel = new PersonalCardModel();
  public typeOfPersonalCard: string;

  public annualVacations: AnnualVacationModel[] = [];
  public annualVacationsDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  public annualVacationsDisplayedColumns: string[] = ['add-edit', 'year', 'dateDiapason', 'days', 'orderNumber', 'orderDate', 'delete'];

  public annualVacationForms: AnnualVacationFormModel[] = [];

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private personalCardService: PersonalCardService,
    private disciplineService: DisciplineService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.initFormGroup();
    this.activateRoute.params.subscribe(params => {
      if (params['id']) {
        this.personalCardService.getById(params['id']).subscribe(response => {
          this.personalCard = response;
          this.typeOfPersonalCard = this.getTypeOfPersonalCard();
          this.subjectsDataSource.data = this.subjectsToDataSource(this.personalCard.subjects);
          this.diplomasDataSource.data = this.diplomasToDataSource(this.personalCard.diplomas);
          this.disciplineService.getCycleCommissions().subscribe(response => {
            this.cycleCommissions = response;
            this.setFormGroupByPersonalCard(this.personalCard);
          });
        });
        this.personalCardService.getAnnualVacationsByPersonalCardId(params['id']).subscribe(response => {
          this.annualVacations = response;
          this.annualVacationsDataSource.data = this.annualVacations;
        });
        this.personalCardService.getAnnualVacationFormsByPersonalCardId(params['id']).subscribe(response => {
          this.annualVacationForms = response;
        });
      }
    });
  }

  private getTypeOfPersonalCard(): string {
    let type = '';
    type += this.personalCard.isEmployee ? type ? ', Працівник' : 'Працівник' : '';
    type += this.personalCard.isTeacher ? type ? ', Викладач' : 'Викладач' : '';
    return type;
  }

  private initFormGroup(): void {
    this.formGroup = this.formBuilder.group({
      'name': [{ value: '', disabled: true}],
      'surname': [{ value: '', disabled: true }],
      'patronymic': [{ value: '', disabled: true }],
      'birthday': [{ value: '', disabled: true }],
      'address': [{ value: '', disabled: true }],
      'phone': [{ value: '', disabled: true }],
      'email': [{ value: '', disabled: true }],
      'employmentType': [{ value: '', disabled: true }],
      'isTeacher': [{ value: false, disabled: true }],
      'isEmployee': [{ value: false, disabled: true }],
      'cycleCommission': [{ value: '', disabled: true }],
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
    this.formGroup.controls['cycleCommission'].setValue(personalCard.cycleCommission ? personalCard.cycleCommission.id : null);
  }

  private subjectsToDataSource(subjects: SubjectModel[]): any {
    return subjects.map(subject => {
      return {
        name: subject.name
      };
    });
  }

  private diplomasToDataSource(diplomas: DiplomaModel[]): any {
    return diplomas.map(diploma => {
      return {
        number: diploma.number,
        graduationDate: diploma.graduationDate,
        qualification: diploma.qualification,
        specialization: diploma.specialization
      };
    });
  }

  public openEditPersonalCardModal(): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(EditPersonalCardModalComponent, {
        data: {
          personalCard: this.personalCard
        },
        width: '500px'
      }).afterClosed().subscribe(response => {
        this.personalCardService.getById(this.personalCard.id).subscribe(response => {
          this.personalCard = response;
          this.typeOfPersonalCard = this.getTypeOfPersonalCard();
          this.subjectsDataSource.data = this.subjectsToDataSource(this.personalCard.subjects);
          this.disciplineService.getCycleCommissions().subscribe(response => {
            this.cycleCommissions = response;
            this.setFormGroupByPersonalCard(this.personalCard);
          });
        });
      });
    } else {
      this.dialog.open(NotificationModalComponent, {
        width: '300px',
        data: {
          title: 'Помилка',
          message: 'Ви не маєте прав на редагування предмету',
          isError: true
        }
      });
    }
  }

  public openAddAnnualVacationFormModal(): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(AddAnnualVacationFormModalComponent, {
        width: '500px',
        data: {
          personalCardId: this.personalCard.id
        }
      }).afterClosed().subscribe(response => {
        this.personalCardService.getAnnualVacationFormsByPersonalCardId(this.personalCard.id).subscribe(response => {
          this.annualVacationForms = response;
        });
      });
    } else {
      this.dialog.open(NotificationModalComponent, {
        width: '300px',
        data: {
          title: 'Помилка',
          message: 'Ви не маєте прав на додання форми щорічної відпустки',
          isError: true
        }
      });
    }
  }

  public navigateToAnnualVacationForm(form: AnnualVacationFormModel): void {
    this.router.navigateByUrl('personal-cards/' + this.personalCard.id + '/annual-vacations/' + form.id);
  }

  public getDaysBetweenDates(date1: Date, date2: Date): number {
    const days = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
    return days;
  }

  public getDays(): number {
    if (this.annualVacationForms) {
      let days = 0;
      days += this.annualVacationForms.reduce((sum, current) => {
        return sum + current.days;
      }, 0);
      return days;
    }
    return 0;
  }

  public getLeftDays(): number {
    if (this.annualVacationForms) {
      return this.getDays() - this.getVacationDays();
    }
    return 0;
  }

  public getVacationDays(): number {
    if (this.annualVacationForms) {
      let vacationDays = 0;
      this.annualVacationForms.forEach(form => {
        vacationDays += form.annualVacations.reduce((sum, current) => {
          return sum + this.getDaysBetweenDates(current.startOfVacationDate, current.endOfVacationDate);
        }, 0)
      });
      return vacationDays;
    }
    return 0;
  }
}
