import { EditSocialWithChildrenVacationModalComponent } from './../../vacation/social-with-children-vacation/edit-social-with-children-vacation-modal/edit-social-with-children-vacation-modal.component';
import { AddSocialWithPregnancyOrLookVacationModalComponent } from './../../vacation/social-with-pregnancy-vacation/add-social-with-pregnancy-vacation-modal/add-social-with-pregnancy-vacation-modal.component';
import { OtherVacationModel } from './../../../models/vacations/other-vacation.model';
import { EditOtherVacationModalComponent } from './../../vacation/other-vacation/edit-other-vacation-modal/edit-other-vacation-modal.component';
import { AddOtherVacationModalComponent } from './../../vacation/other-vacation/add-other-vacation-modal/add-other-vacation-modal.component';
import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { CycleCommissionModel } from '@models/cycle-commission.model';
import { PersonalCardModel, Sex } from '@models/personal-card.model';
import { AuthService } from '@services/auth.service';
import { DisciplineService } from '@services/discipline.service';
import { ModalService } from '@services/modal.service';
import { PersonalCardService } from '@services/personal-card.service';
import { SelectSubjectModalComponent } from 'app/components/discipline/select-subject-modal/select-subject-modal.component';
import { AddEditWorkingYearModalComponent } from 'app/components/vacation/add-edit-working-year-modal/add-edit-working-year-modal.component';
import { saveAs } from 'file-saver';
import { timer } from 'rxjs';
import { ReportService } from '../../../services/report.service';
import { VacationService } from '../../../services/vacation.service';
import { NotificationModalComponent } from '../../common/modals/notification-modal/notification-modal.component';
import { AddDiplomaModalComponent } from '../add-diploma-modal/add-diploma-modal.component';
import { WorkingYearModel } from './../../../models/vacations/working-year.model';
import { AddAnnualVacationModalComponent } from './../../vacation/annual-vacation/add-annual-vacation-modal/add-annual-vacation-modal.component';
import { EditAnnualVacationModalComponent } from './../../vacation/annual-vacation/edit-annual-vacation-modal/edit-annual-vacation-modal.component';
import { AnnualVacationModel } from '@models/vacations/annual-vacation.model';
import { SocialWithChildrenVacationModel } from '@models/vacations/social-with-children-vacation.model';
import { EditSocialWithPregnancyOrLookVacationModalComponent } from 'app/components/vacation/social-with-pregnancy-vacation/edit-social-with-pregnancy-vacation-modal/edit-social-with-pregnancy-vacation-modal.component';
import { SocialWithPregnancyOrLookVacationModel } from '@models/vacations/social-with-pregnancy-or-look-vacation.model';
import { AddSocialWithChildrenVacationModalComponent } from 'app/components/vacation/social-with-children-vacation/add-social-with-children-vacation-modal/add-social-with-children-vacation-modal.component';
import { AddWithoutPayrollVacationModalComponent } from 'app/components/vacation/without-payroll-vacation/add-without-payroll-vacation-modal/add-without-payroll-vacation-modal.component';
import { EditWithoutPayrollVacationModalComponent } from 'app/components/vacation/without-payroll-vacation/edit-without-payroll-vacation-modal/edit-without-payroll-vacation-modal.component';
import { WithoutPayrollVacationModel } from '@models/vacations/without-payroll-vacation.model';
import { AddAdditionalStudyVacationModalComponent } from 'app/components/vacation/additional-study-vacation/add-additional-study-vacation-modal/add-additional-study-vacation-modal.component';
import { EditAdditionalStudyVacationModalComponent } from 'app/components/vacation/additional-study-vacation/edit-additional-study-vacation-modal/edit-additional-study-vacation-modal.component';
import { AdditionalStudyVacationModel } from '@models/vacations/additional-study-vacation.model';

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

  public selectedVacationType = VacationType.Annual;
  public selectedWorkingYear: WorkingYearModel;
  public workingYearsDataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  public workingYearColumns: string[] = ['add-edit', 'startOfWorkingYear', 'endOfWorkingYear', 'delete'];
  public VacationType = VacationType;
  public showValidationError = false;

  public additionalStudyVacationsDisplayedColumns: string[] = ['add-edit', 'dateDiapason', 'days', 'orderNumber', 'orderDate', 'delete'];
  public annualVacationsDisplayedColumns: string[] = ['add-edit', 'dateDiapason', 'days', 'orderNumber', 'orderDate', 'delete'];
  public otherVacationsDisplayedColumns: string[] = ['add-edit', 'typeOfVacation', 'dateDiapason', 'days', 'orderNumber', 'orderDate', 'notes', 'delete'];
  public socialWithChildrenVacationsDisplayedColumns: string[] = ['add-edit', 'dateDiapason', 'days', 'orderNumber', 'orderDate', 'delete'];
  public socialWithPregnancyOrLookVacationsDisplayedColumns: string[] = ['add-edit', 'typeOfVacation', 'dateDiapason', 'days', 'orderNumber', 'orderDate', 'delete'];
  public withoutPayrollVacationsDisplayedColumns: string[] = ['add-edit', 'dateDiapason', 'days', 'orderNumber', 'orderDate', 'notes', 'delete'];


  public Sex = Sex;

  public errorMessage: string;

  private personalCardId: string;

  public validator = {
    name: {
      isValid: () => this.personalCard.name != null && this.personalCard.name.length !== 0,
      errorMessage: 'Ім\'я обов\'язкове.',
    },
    surname: {
      isValid: () => this.personalCard.surname != null && this.personalCard.surname.length !== 0,
      errorMessage: 'Прізвище обов\'язкове.',
    },
    patronymic: {
      isValid: () => this.personalCard.patronymic != null && this.personalCard.patronymic.length !== 0,
      errorMessage: 'По батькові обов\'язкове.',
    },
    diploma: {
      isValid: () => this.personalCard.diplomas != null && this.personalCard.diplomas.length !== 0,
      errorMessage: 'Повинен бути мінімум 1 диплом.',
    },
    birthday: {
      isValid: () => this.personalCard.birthday != null && this.personalCard.birthday < new Date(),
      errorMessage: 'Дата народження обов\'язкова та повинна бути у минулому.',
    },
    email: {
      isValid: () => this.personalCard.email != null && this.personalCard.email.length !== 0,
      errorMessage: 'Пошта обов\'язкова.',
    },
    phone: {
      isValid: () => this.personalCard.phoneNumber != null && this.personalCard.phoneNumber.length !== 0,
      errorMessage: 'Телефон обов\'язковий.',
    },
  };

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
        this.personalCardId = params['id'];
        this.loadPersonalCard();
      } else {
        console.log(this.personalCard);
      }
    });
  }

  private loadPersonalCard(): void {
    this.personalCardService.getById(this.personalCardId).subscribe(response => {
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
      this.workingYearsDataSource.data = this.personalCard.workingYears;
      if (this.selectedWorkingYear) {
        this.selectedWorkingYear = this.personalCard.workingYears.find(_ => _.id == this.selectedWorkingYear.id);
      }
    });
  }

  private getTypeOfPersonalCard(): string {
    let type = '';
    type += this.personalCard.isEmployee ? type ? ', Працівник' : 'Працівник' : '';
    type += this.personalCard.isTeacher ? type ? ', Викладач' : 'Викладач' : '';
    return type;
  }

  

 



  public getDaysBetweenDates(date1: Date, date2: Date): number {
    const days = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
    return days;
  }

  // public getDaysOfAnnualVacationForm(): number {
  //   if (this.annualVacationForms) {
  //     let days = 0;
  //     days += this.annualVacationForms.reduce((sum, current) => {
  //       return sum + current.days;
  //     }, 0);
  //     return days;
  //   }
  //   return 0;
  // }

  // public getLeftDaysOfAnnualVacationForm(): number {
  //   if (this.annualVacationForms) {
  //     return this.getDaysOfAnnualVacationForm() - this.getVacationDaysOfAnnualVacationForm();
  //   }
  //   return 0;
  // }

  // public getVacationDaysOfAnnualVacationForm(): number {
  //   if (this.annualVacationForms) {
  //     let vacationDays = 0;
  //     this.annualVacationForms.forEach(form => {
  //       vacationDays += form.annualVacations.reduce((sum, current) => {
  //         return sum + this.getDaysBetweenDates(current.startOfVacationDate, current.endOfVacationDate);
  //       }, 0)
  //     });
  //     return vacationDays;
  //   }
  //   return 0;
  // }

  // public getDaysOfSocialWithChildrenVacationForm(): number {
  //   if (this.socialWithChildrenVacationForms) {
  //     let days = 0;
  //     days += this.socialWithChildrenVacationForms.reduce((sum, current) => {
  //       return sum + current.days;
  //     }, 0);
  //     return days;
  //   }
  //   return 0;
  // }

  // public getLeftDaysOfSocialWithChildrenVacationForm(): number {
  //   if (this.socialWithChildrenVacationForms) {
  //     return this.getDaysOfSocialWithChildrenVacationForm() - this.getVacationDaysOfSocialWithChildrenVacationForm();
  //   }
  //   return 0;
  // }

  // public getVacationDaysOfSocialWithChildrenVacationForm(): number {
  //   if (this.socialWithChildrenVacationForms) {
  //     let vacationDays = 0;
  //     this.socialWithChildrenVacationForms.forEach(form => {
  //       vacationDays += form.socialWithChildrenVacations.reduce((sum, current) => {
  //         return sum + this.getDaysBetweenDates(current.startOfVacationDate, current.endOfVacationDate);
  //       }, 0)
  //     });
  //     return vacationDays;
  //   }
  //   return 0;
  // }




  public loadProfilePhoto(base64image: string): void {
    this.personalCard.photo = base64image;
  }

  public save(): void {
    for (const key of Object.keys(this.validator)) {
      if (!this.validator[key].isValid()) {
        this.errorMessage = this.validator[key].errorMessage;
        this.showValidationError = true;
        timer(5000).subscribe(_ => {
          this.showValidationError = false;
        });
        return;
      }
    }

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

  public selectWorkingYear(workingYear: WorkingYearModel): void {
    this.selectedWorkingYear = workingYear;
    console.log('this.selectedWorkingYear', this.selectedWorkingYear);
  }

  public isSelectedWorkingYear(id: string): boolean {
    if (!this.selectedWorkingYear) return false;
    return id === this.selectedWorkingYear.id;
  }

  public openAddWorkingYearModal(): void {
    this.dialog.open(AddEditWorkingYearModalComponent, {
      width: '500px',
      data: {
        personalCardId: this.personalCard.id,
        existingWorkingYears: this.personalCard.workingYears
      }
    }).afterClosed().subscribe(response => {
      this.loadPersonalCard();
    });
  }

  public openEditWorkingYearModal(workingYear: WorkingYearModel): void {
    this.dialog.open(AddEditWorkingYearModalComponent, {
      width: '500px',
      data: {
        workingYear: workingYear,
        existingWorkingYears: this.personalCard.workingYears
      }
    }).afterClosed().subscribe(response => {
      this.loadPersonalCard();
    });
  }

  public deleteWorkingYear(id: string): void {
    this.vacationService.deleteWorkingYear(id).subscribe(_ => {
      this.loadPersonalCard();
    });
  }

  public openAddAdditionalStudyVacationModal(): void {
    this.dialog.open(AddAdditionalStudyVacationModalComponent, {
      width: '500px',
      data: {
        workingYear: this.selectedWorkingYear,
        existingVacations: this.selectedWorkingYear.additionalStudyVacations
      }
    }).afterClosed().subscribe(response => {
      this.loadPersonalCard();
    });
  }

  public openEditAdditionalStudyVacationModal(vacation: AdditionalStudyVacationModel): void {
    this.dialog.open(EditAdditionalStudyVacationModalComponent, {
      width: '500px',
      data: {
        vacation: vacation,
        workingYear: this.selectedWorkingYear,
        existingVacations: this.selectedWorkingYear.additionalStudyVacations
      }
    }).afterClosed().subscribe(response => {
      this.loadPersonalCard();
    });
  }

  public deleteAdditionalStudyVacation(id: string): void {
    this.vacationService.deleteAdditionalStudyVacation(id).subscribe(_ => {
      this.loadPersonalCard();
    });
  }

  public openAddAnnualVacationModal(): void {
    if (this.selectedWorkingYear.annualVacationDays <= 0) {
      this.modalService.showError('Помилка', 'Вкажіть кількість положених днів для обраного робочого року.');
      return;
    }
    this.dialog.open(AddAnnualVacationModalComponent, {
      width: '500px',
      data: {
        leftDaysFromPreviousYearsWorkingYears: this.getAnnualLeftDaysFromPreviousYearsWorkingYears(),
        workingYear: this.selectedWorkingYear,
        existingVacations: this.selectedWorkingYear.annualVacations
      }
    }).afterClosed().subscribe(response => {
      this.loadPersonalCard();
    });
  }

  public openEditAnnualVacationModal(vacation: AnnualVacationModel): void {
    if (this.selectedWorkingYear.annualVacationDays <= 0) {
      this.modalService.showError('Помилка', 'Вкажіть кількість положених днів для обраного робочого року.');
      return;
    }
    this.dialog.open(EditAnnualVacationModalComponent, {
      width: '500px',
      data: {
        leftDaysFromPreviousYearsWorkingYears: this.getAnnualLeftDaysFromPreviousYearsWorkingYears(),
        vacation: vacation,
        workingYear: this.selectedWorkingYear,
        existingVacations: this.selectedWorkingYear.annualVacations
      }
    }).afterClosed().subscribe(response => {
      this.loadPersonalCard();
    });
  }

  public deleteAnnualVacation(id: string): void {
    this.vacationService.deleteAnnualVacation(id).subscribe(_ => {
      this.loadPersonalCard();
    });
  }

  public openAddWithoutPayrollVacationModal(): void {
    this.dialog.open(AddWithoutPayrollVacationModalComponent, {
      width: '500px',
      data: {
        workingYear: this.selectedWorkingYear,
        existingVacations: this.selectedWorkingYear.withoutPayrollVacations
      }
    }).afterClosed().subscribe(response => {
      this.loadPersonalCard();
    });
  }

  public openEditWithoutPayrollVacationModal(vacation: WithoutPayrollVacationModel): void {
    this.dialog.open(EditWithoutPayrollVacationModalComponent, {
      width: '500px',
      data: {
        vacation: vacation,
        workingYear: this.selectedWorkingYear,
        existingVacations: this.selectedWorkingYear.withoutPayrollVacations
      }
    }).afterClosed().subscribe(response => {
      this.loadPersonalCard();
    });
  }

  public deleteWithoutPayrollVacation(id: string): void {
    this.vacationService.deleteWithoutPayrollVacation(id).subscribe(_ => {
      this.loadPersonalCard();
    });
  }

  public openAddSocialWithChildrenVacationModal(): void {
    if (this.selectedWorkingYear.socialWithChildrenVacationDays <= 0) {
      this.modalService.showError('Помилка', 'Вкажіть кількість положених днів для обраного робочого року.');
      return;
    }
    this.dialog.open(AddSocialWithChildrenVacationModalComponent, {
      width: '500px',
      data: {
        leftDaysFromPreviousYearsWorkingYears: this.getSocialWithChildrenLeftDaysFromPreviousYearsWorkingYears(),
        workingYear: this.selectedWorkingYear,
        existingVacations: this.selectedWorkingYear.socialWithChildrenVacations
      }
    }).afterClosed().subscribe(response => {
      this.loadPersonalCard();
    });
  }

  public openEditSocialWithChildrenVacationModal(vacation: SocialWithChildrenVacationModel): void {
    if (this.selectedWorkingYear.socialWithChildrenVacationDays <= 0) {
      this.modalService.showError('Помилка', 'Вкажіть кількість положених днів для обраного робочого року.');
      return;
    }
    this.dialog.open(EditSocialWithChildrenVacationModalComponent, {
      width: '500px',
      data: {
        leftDaysFromPreviousYearsWorkingYears: this.getSocialWithChildrenLeftDaysFromPreviousYearsWorkingYears(),
        vacation: vacation,
        workingYear: this.selectedWorkingYear,
        existingVacations: this.selectedWorkingYear.socialWithChildrenVacations
      }
    }).afterClosed().subscribe(response => {
      this.loadPersonalCard();
    });
  }

  public deleteSocialWithChildrenVacation(id: string): void {
    this.vacationService.deleteSocialWithChildrenVacation(id).subscribe(_ => {
      this.loadPersonalCard();
    });
  }

  public openAddSocialWithPregnancyOrLookVacationModal(): void {
    this.dialog.open(AddSocialWithPregnancyOrLookVacationModalComponent, {
      width: '500px',
      data: {
        workingYear: this.selectedWorkingYear,
        existingVacations: this.selectedWorkingYear.socialWithPregnancyOrLookVacations
      }
    }).afterClosed().subscribe(response => {
      this.loadPersonalCard();
    });
  }

  public openEditSocialWithPregnancyOrLookVacationModal(vacation: SocialWithPregnancyOrLookVacationModel): void {
    this.dialog.open(EditSocialWithPregnancyOrLookVacationModalComponent, {
      width: '500px',
      data: {
        vacation: vacation,
        workingYear: this.selectedWorkingYear,
        existingVacations: this.selectedWorkingYear.socialWithPregnancyOrLookVacations
      }
    }).afterClosed().subscribe(response => {
      this.loadPersonalCard();
    });
  }

  public deleteSocialWithPregnancyOrLookVacation(id: string): void {
    this.vacationService.deleteSocialWithPregnancyOrLookVacation(id).subscribe(_ => {
      this.loadPersonalCard();
    });
  }

  public openAddOtherVacationModal(): void {
    this.dialog.open(AddOtherVacationModalComponent, {
      width: '500px',
      data: {
        workingYear: this.selectedWorkingYear,
        existingVacations: this.selectedWorkingYear.otherVacations
      }
    }).afterClosed().subscribe(response => {
      this.loadPersonalCard();
    });
  }

  public openEditOtherVacationModal(vacation: OtherVacationModel): void {
    this.dialog.open(EditOtherVacationModalComponent, {
      width: '500px',
      data: {
        vacation: vacation,
        workingYear: this.selectedWorkingYear,
        existingVacations: this.selectedWorkingYear.otherVacations
      }
    }).afterClosed().subscribe(response => {
      this.loadPersonalCard();
    });
  }

  public deleteOtherVacation(id: string): void {
    this.vacationService.deleteOtherVacation(id).subscribe(_ => {
      this.loadPersonalCard();
    });
  }

  public getAnnualLeftDaysFromPreviousYearsWorkingYears(): number {
    const previousWorkingYears = this.personalCard.workingYears.filter(_ => _.startOfWorkingYear < this.selectedWorkingYear.startOfWorkingYear);
    return previousWorkingYears.reduce((sum, current) => {
      return sum + current.annualVacationDays;
    }, 0);
  }

  public getSocialWithChildrenLeftDaysFromPreviousYearsWorkingYears(): number {
    const previousWorkingYears = this.personalCard.workingYears.filter(_ => _.startOfWorkingYear < this.selectedWorkingYear.startOfWorkingYear);
    return previousWorkingYears.reduce((sum, current) => {
      return sum + current.socialWithChildrenVacationDays;
    }, 0);
  }

}
