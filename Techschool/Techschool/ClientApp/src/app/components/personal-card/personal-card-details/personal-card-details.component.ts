import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CycleCommissionModel } from '@models/cycle-commission.model';
import { PersonalCardModel, Sex } from '@models/personal-card.model';
import { AdditionalStudyVacationFormModel } from '@models/vacations/additional-study-vacation-form.model';
import { AnnualVacationFormModel } from '@models/vacations/annual-vacation-form.model';
import { OtherVacationFormModel } from '@models/vacations/other-vacation-form.model';
import { SocialWithChildrenVacationFormModel } from '@models/vacations/social-with-children-vacation-form.model';
import { SocialWithPregnancyOrLookVacationFormModel } from '@models/vacations/social-with-pregnancy-or-look-vacation-form.model';
import { WithoutPayrollVacationFormModel } from '@models/vacations/without-payroll-vacation-form.model';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { PersonalCardService } from '@services/personal-card.service';
import { AddAdditionalStudyVacationFormModalComponent } from 'app/components/vacation/additional-study-vacation/add-additional-study-vacation-form-modal/add-additional-study-vacation-form-modal.component';
import { AddSocialWithChildrenVacationFormModalComponent } from 'app/components/vacation/social-with-children-vacation/add-social-with-children-vacation-form-modal/add-social-with-children-vacation-form-modal.component';
import { AddWithoutPayrollVacationFormModalComponent } from 'app/components/vacation/without-payroll-vacation/add-without-payroll-vacation-form-modal/add-without-payroll-vacation-form-modal.component';
import { saveAs } from 'file-saver';
import { timer } from 'rxjs';
import { DiplomaModel } from '../../../models/diploma.model';
import { SubjectModel } from '../../../models/subject.model';
import { NotificationModalComponent } from '../../common/modals/notification-modal/notification-modal.component';
import { AddAnnualVacationFormModalComponent } from '../../vacation/annual-vacation/add-annual-vacation-form-modal/add-annual-vacation-form-modal.component';
import { AddOtherVacationFormModalComponent } from '../../vacation/other-vacation/add-other-vacation-form-modal/add-other-vacation-form-modal.component';
import { AddSocialWithPregnancyOrLookVacationFormModalComponent } from '../../vacation/social-with-pregnancy-vacation/add-social-with-pregnancy-vacation-form-modal/add-social-with-pregnancy-vacation-form-modal.component';
import { ReportService } from '../../../services/report.service';
import { VacationService } from '../../../services/vacation.service';
import { SelectSubjectModalComponent } from 'app/components/discipline/select-subject-modal/select-subject-modal.component';
import { AddDiplomaModalComponent } from '../add-diploma-modal/add-diploma-modal.component';
import { ModalService } from '@services/modal.service';

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

  datemask = ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/];

  public cycleCommissions: CycleCommissionModel[] = [];
  public subjectsDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  public subjectsDisplayedColumns: string[] = ['add-delete', 'name'];
  public diplomasDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  public diplomasDisplayedColumns: string[] = ['add-delete', 'nameOfTheInstitution', 'faculty', 'receiptDate', 'graduationDate', 'specialization', 'number'];

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
  public showValidationError = false;

  public Sex = Sex;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private personalCardService: PersonalCardService,
    private vacationService: VacationService,
    private disciplineService: DisciplineService,
    private modalService: ModalService,
    private reportService: ReportService,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) {
    this.activateRoute.params.subscribe(params => {
      if (params['id']) {
        this.personalCardService.getById(params['id']).subscribe(response => {
          this.personalCard = response;
          console.log(this.personalCard);
          this.typeOfPersonalCard = this.getTypeOfPersonalCard();
          this.subjectsDataSource.data = this.personalCard.subjects;
          this.diplomasDataSource.data = this.personalCard.diplomas;
          this.diplomasDataSource.data.sort((a, b) => {
            return a.receiptDate.getTime() - b.receiptDate.getTime();
          });
          this.disciplineService.getCycleCommissions().subscribe(response => {
            this.cycleCommissions = response;
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
      this.modalService.showError('Помилка', 'Ви не маєте прав на додання форми відпустки');
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
      this.modalService.showError('Помилка', 'Ви не маєте прав на додання форми відпустки');
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
      this.modalService.showError('Помилка', 'Ви не маєте прав на додання форми відпустки');
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
      this.modalService.showError('Помилка', 'Ви не маєте прав на додання форми відпустки');
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
      this.modalService.showError('Помилка', 'Ви не маєте прав на додання форми відпустки');
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
      this.modalService.showError('Помилка', 'Ви не маєте прав на додання форми відпустки');
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




  public loadProfilePhoto(base64image: string): void {
    this.personalCard.photo = base64image;
  }
  
  public save(): void {
    //this.showValidationError = true;
    //timer(2000).subscribe(_ => {
    //  this.showValidationError = false;
    //});
    this.personalCardService.save(this.personalCard).subscribe(response => {
      this.dialog.open(NotificationModalComponent, {
        width: '300px',
        data: {
          title: 'Особистка картка',
          message: 'Збереження особистої картки пройшло успішно.'
        }
      });
    }, error => {
        this.dialog.open(NotificationModalComponent, {
          width: '300px',
          data: {
            title: 'Помилка',
            message: 'Невідома помилка при збереженні',
            isError: true
          }
        });
    });
  }

  public download(): void {
    this.reportService.getPersonalCardReport(this.personalCard.id).subscribe(response => {
      saveAs(response, 'personal_card.docx');
    });
  }

  public openSelectSubjectModal(): void {
    this.dialog.open(SelectSubjectModalComponent, {
      width: '350px'
    }).afterClosed().subscribe(data => {
      if (data && data.selectedSubject) {
        const isExist = this.subjectsDataSource.data.find(_ => _.id == data.selectedSubject.id);
        if (!isExist) {
          this.subjectsDataSource.data.push(data.selectedSubject);
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
      data: {
        existingDiplomas: this.diplomasDataSource.data
      },
      width: '350px'
    }).afterClosed().subscribe(data => {
      if (data && data.diploma) {
        this.diplomasDataSource.data.push(data.diploma);
        this.diplomasDataSource.data.sort((a, b) => {
          return a.receiptDate.getTime() - b.receiptDate.getTime();
        });
        // Refresh data source
        this.diplomasDataSource.data = this.diplomasDataSource.data;
      }
    });
  }

  public deleteSubject(id: string): void {
    this.subjectsDataSource.data = this.subjectsDataSource.data.filter(_ => _.id != id);
  }

  public deleteDiplomaByNumber(number: string): void {
    this.personalCard.diplomas = this.personalCard.diplomas.filter(_ => _.number != number);
    this.diplomasDataSource.data = this.personalCard.diplomas;
  }

  public delete(): void {
    if (window.confirm('Ви дійсно хочете видалити персональну картку?')) {
      this.personalCardService.delete(this.personalCard.id).subscribe(_ => {
        this.router.navigateByUrl('/personal-cards');
      }, error => {
        this.modalService.showError('Помилка', 'Невідома помилка.');
      });
    }
  }
}
