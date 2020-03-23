import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CycleCommissionModel } from '@models/cycle-commission.model';
import { PersonalCardModel } from '@models/personal-card.model';
import { AdditionalStudyVacationFormModel } from '@models/vacations/additional-study-vacation-form.model';
import { AnnualVacationFormModel } from '@models/vacations/annual-vacation-form.model';
import { OtherVacationFormModel } from '@models/vacations/other-vacation-form.model';
import { SocialWithPregnancyOrLookVacationFormModel } from '@models/vacations/social-with-pregnancy-or-look-vacation-form.model';
import { WithoutPayrollVacationFormModel } from '@models/vacations/without-payroll-vacation-form.model';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { PersonalCardService } from '@services/personal-card.service';
import { AddAdditionalStudyVacationFormModalComponent } from 'app/components/vacation/additional-study-vacation/add-additional-study-vacation-form-modal/add-additional-study-vacation-form-modal.component';
import { AddWithoutPayrollVacationFormModalComponent } from 'app/components/vacation/without-payroll-vacation/add-without-payroll-vacation-form-modal/add-without-payroll-vacation-form-modal.component';
import { DiplomaModel } from '../../../models/diploma.model';
import { SubjectModel } from '../../../models/subject.model';
import { NotificationModalComponent } from '../../common/modals/notification-modal/notification-modal.component';
import { AddAnnualVacationFormModalComponent } from '../../vacation/annual-vacation/add-annual-vacation-form-modal/add-annual-vacation-form-modal.component';
import { AddOtherVacationFormModalComponent } from '../../vacation/other-vacation/add-other-vacation-form-modal/add-other-vacation-form-modal.component';
import { AddSocialWithPregnancyOrLookVacationFormModalComponent } from '../../vacation/social-with-pregnancy-vacation/add-social-with-pregnancy-vacation-form-modal/add-social-with-pregnancy-vacation-form-modal.component';
import { EditPersonalCardModalComponent } from '../edit-personal-card-modal/edit-personal-card-modal.component';
import { VacationService } from './../../../services/vacation.service';
import { AdditionalStudyVacationFormComponent } from './../../vacation/additional-study-vacation/additional-study-vacation-form/additional-study-vacation-form.component';
import { SocialWithChildrenVacationFormModel } from '@models/vacations/social-with-children-vacation-form.model';
import { SocialWithChildrenVacationModel } from '@models/vacations/social-with-children-vacation.model';
import { AddSocialWithChildrenVacationFormModalComponent } from 'app/components/vacation/social-with-children-vacation/add-social-with-children-vacation-form-modal/add-social-with-children-vacation-form-modal.component';

enum VacationType {
  Annual,
  WithoutPayroll,
  AdditionalStudy,
  SocialWithChildren,
  SocialWithPregnancyOrLook,
  Other
}

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

  public additionalStudyVacationForms: AdditionalStudyVacationFormModel[] = [];
  public annualVacationForms: AnnualVacationFormModel[] = [];
  public otherVacationForms: OtherVacationFormModel[] = [];
  public socialWithChildrenVacationForms: SocialWithChildrenVacationFormModel[] = [];
  public socialWithPregnancyOrLookVacationForms: SocialWithPregnancyOrLookVacationFormModel[] = [];
  public withoutPayrollVacationForms: WithoutPayrollVacationFormModel[] = [];

  public selectedVacationType = VacationType.Annual;
  public VacationType = VacationType;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private personalCardService: PersonalCardService,
    private vacationService: VacationService,
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
        this.vacationService.getAdditionalStudyVacationFormsByPersonalCardId(params['id']).subscribe(response => {
          this.additionalStudyVacationForms = response;
        });
        this.vacationService.getAnnualVacationFormsByPersonalCardId(params['id']).subscribe(response => {
          this.annualVacationForms = response;
        });
        this.vacationService.getWithoutPayrollVacationFormsByPersonalCardId(params['id']).subscribe(response => {
          this.withoutPayrollVacationForms = response;
        });
        this.vacationService.getSocialWithChildrenVacationFormsByPersonalCardId(params['id']).subscribe(response => {
          this.socialWithChildrenVacationForms = response;
        });
        this.vacationService.getSocialWithPregnancyOrLookVacationFormsByPersonalCardId(params['id']).subscribe(response => {
          this.socialWithPregnancyOrLookVacationForms = response;
        });
        this.vacationService.getOtherVacationFormsByPersonalCardId(params['id']).subscribe(response => {
          this.otherVacationForms = response;
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

  public openAddAdditionalStudyVacationFormModal(): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(AddAdditionalStudyVacationFormModalComponent, {
        width: '500px',
        data: {
          personalCardId: this.personalCard.id
        }
      }).afterClosed().subscribe(response => {
        this.vacationService.getAdditionalStudyVacationFormsByPersonalCardId(this.personalCard.id).subscribe(response => {
          this.additionalStudyVacationForms = response;
        });
      });
    } else {
      this.dialog.open(NotificationModalComponent, {
        width: '300px',
        data: {
          title: 'Помилка',
          message: 'Ви не маєте прав на додання форми відпустки',
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
        this.vacationService.getAnnualVacationFormsByPersonalCardId(this.personalCard.id).subscribe(response => {
          this.annualVacationForms = response;
        });
      });
    } else {
      this.dialog.open(NotificationModalComponent, {
        width: '300px',
        data: {
          title: 'Помилка',
          message: 'Ви не маєте прав на додання форми відпустки',
          isError: true
        }
      });
    }
  }

  public openAddWithoutPayrollVacationFormModal(): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(AddWithoutPayrollVacationFormModalComponent, {
        width: '500px',
        data: {
          personalCardId: this.personalCard.id
        }
      }).afterClosed().subscribe(response => {
        this.vacationService.getWithoutPayrollVacationFormsByPersonalCardId(this.personalCard.id).subscribe(response => {
          this.withoutPayrollVacationForms = response;
        });
      });
    } else {
      this.dialog.open(NotificationModalComponent, {
        width: '300px',
        data: {
          title: 'Помилка',
          message: 'Ви не маєте прав на додання форми відпустки',
          isError: true
        }
      });
    }
  }

  public openAddSocialWithChildrenVacationFormModal(): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(AddSocialWithChildrenVacationFormModalComponent, {
        width: '500px',
        data: {
          personalCardId: this.personalCard.id
        }
      }).afterClosed().subscribe(response => {
        this.vacationService.getSocialWithChildrenVacationFormsByPersonalCardId(this.personalCard.id).subscribe(response => {
          this.socialWithChildrenVacationForms = response;
        });
      });
    } else {
      this.dialog.open(NotificationModalComponent, {
        width: '300px',
        data: {
          title: 'Помилка',
          message: 'Ви не маєте прав на додання форми відпустки',
          isError: true
        }
      });
    }
  }

  public openAddSocialWithPregnancyOrLookVacationFormModal(): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(AddSocialWithPregnancyOrLookVacationFormModalComponent, {
        width: '500px',
        data: {
          personalCardId: this.personalCard.id
        }
      }).afterClosed().subscribe(response => {
        this.vacationService.getSocialWithPregnancyOrLookVacationFormsByPersonalCardId(this.personalCard.id).subscribe(response => {
          this.socialWithPregnancyOrLookVacationForms = response;
        });
      });
    } else {
      this.dialog.open(NotificationModalComponent, {
        width: '300px',
        data: {
          title: 'Помилка',
          message: 'Ви не маєте прав на додання форми відпустки',
          isError: true
        }
      });
    }
  }

  public openAddOtherVacationFormModal(): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(AddOtherVacationFormModalComponent, {
        width: '500px',
        data: {
          personalCardId: this.personalCard.id
        }
      }).afterClosed().subscribe(response => {
        this.vacationService.getOtherVacationFormsByPersonalCardId(this.personalCard.id).subscribe(response => {
          this.otherVacationForms = response;
        });
      });
    } else {
      this.dialog.open(NotificationModalComponent, {
        width: '300px',
        data: {
          title: 'Помилка',
          message: 'Ви не маєте прав на додання форми відпустки',
          isError: true
        }
      });
    }
  }

  public navigateToAdditionalStudyVacationForm(form: AdditionalStudyVacationFormModel): void {
    this.router.navigateByUrl('personal-cards/' + this.personalCard.id + '/additional-study-vacations/' + form.id);
  }

  public navigateToAnnualVacationForm(form: AnnualVacationFormModel): void {
    this.router.navigateByUrl('personal-cards/' + this.personalCard.id + '/annual-vacations/' + form.id);
  }

  public navigateToWithoutPayrollVacationForm(form: WithoutPayrollVacationFormModel): void {
    this.router.navigateByUrl('personal-cards/' + this.personalCard.id + '/without-payroll-vacations/' + form.id);
  }

  public navigateToSocialWithChildrenVacationForm(form: SocialWithChildrenVacationFormModel): void {
    this.router.navigateByUrl('personal-cards/' + this.personalCard.id + '/social-with-children-vacations/' + form.id);
  }

  public navigateToSocialWithPregnancyOrLookVacationForm(form: SocialWithPregnancyOrLookVacationFormModel): void {
    this.router.navigateByUrl('personal-cards/' + this.personalCard.id + '/social-with-pregnancy-or-look-vacations/' + form.id);
  }

  public navigateToOtherVacationForm(form: OtherVacationFormModel): void {
    this.router.navigateByUrl('personal-cards/' + this.personalCard.id + '/other-vacations/' + form.id);
  }

  public getDaysBetweenDates(date1: Date, date2: Date): number {
    const days = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
    return days;
  }

  public getDaysOfAnnualVacationForm(): number {
    if (this.annualVacationForms) {
      let days = 0;
      days += this.annualVacationForms.reduce((sum, current) => {
        return sum + current.days;
      }, 0);
      return days;
    }
    return 0;
  }

  public getLeftDaysOfAnnualVacationForm(): number {
    if (this.annualVacationForms) {
      return this.getDaysOfAnnualVacationForm() - this.getVacationDaysOfAnnualVacationForm();
    }
    return 0;
  }

  public getVacationDaysOfAnnualVacationForm(): number {
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

  public getDaysOfSocialWithChildrenVacationForm(): number {
    if (this.socialWithChildrenVacationForms) {
      let days = 0;
      days += this.socialWithChildrenVacationForms.reduce((sum, current) => {
        return sum + current.days;
      }, 0);
      return days;
    }
    return 0;
  }

  public getLeftDaysOfSocialWithChildrenVacationForm(): number {
    if (this.socialWithChildrenVacationForms) {
      return this.getDaysOfSocialWithChildrenVacationForm() - this.getVacationDaysOfSocialWithChildrenVacationForm();
    }
    return 0;
  }

  public getVacationDaysOfSocialWithChildrenVacationForm(): number {
    if (this.socialWithChildrenVacationForms) {
      let vacationDays = 0;
      this.socialWithChildrenVacationForms.forEach(form => {
        vacationDays += form.socialWithChildrenVacations.reduce((sum, current) => {
          return sum + this.getDaysBetweenDates(current.startOfVacationDate, current.endOfVacationDate);
        }, 0)
      });
      return vacationDays;
    }
    return 0;
  }
}
