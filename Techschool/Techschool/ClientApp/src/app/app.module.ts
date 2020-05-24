import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextMaskModule } from 'angular2-text-mask';
import { AppMaterialModule } from './app-material.module';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { LoginFormModalComponent } from './components/common/modals/login-form-modal/login-form-modal.component';
import { NotificationModalComponent } from './components/common/modals/notification-modal/notification-modal.component';
import { RegistrationFormModalComponent } from './components/common/modals/registration-form-modal/registration-form-modal.component';
import { UploadFileComponent } from './components/common/upload-file/upload-file.component';
import { AddEditCycleCommissionModalComponent } from './components/discipline/add-edit-cycle-commission-modal/add-edit-cycle-commission-modal.component';
import { AddEditSubjectModalComponent } from './components/discipline/add-edit-subject-modal/add-edit-subject-modal.component';
import { DisciplineInfoComponent } from './components/discipline/discipline-info/discipline-info.component';
import { DisciplineComponent } from './components/discipline/discipline/discipline.component';
import { SelectSubjectModalComponent } from './components/discipline/select-subject-modal/select-subject-modal.component';
import { SelectSubjectComponent } from './components/discipline/select-subject/select-subject.component';
import { HomeComponent } from './components/home/home.component';
import { AddDiplomaModalComponent } from './components/personal-card/add-diploma-modal/add-diploma-modal.component';
import { PersonalCardDetailsComponent } from './components/personal-card/personal-card-details/personal-card-details.component';
import { PersonalCardListComponent } from './components/personal-card/personal-card-list/personal-card-list.component';
import { RegistrationRequestListComponent } from './components/registration-request-list/registration-request-list.component';
import { AddAdditionalStudyVacationModalComponent } from './components/vacation/additional-study-vacation/add-additional-study-vacation-modal/add-additional-study-vacation-modal.component';
import { EditAdditionalStudyVacationModalComponent } from './components/vacation/additional-study-vacation/edit-additional-study-vacation-modal/edit-additional-study-vacation-modal.component';
import { AddAnnualVacationModalComponent } from './components/vacation/annual-vacation/add-annual-vacation-modal/add-annual-vacation-modal.component';
import { EditAnnualVacationModalComponent } from './components/vacation/annual-vacation/edit-annual-vacation-modal/edit-annual-vacation-modal.component';
import { AddOtherVacationModalComponent } from './components/vacation/other-vacation/add-other-vacation-modal/add-other-vacation-modal.component';
import { EditOtherVacationModalComponent } from './components/vacation/other-vacation/edit-other-vacation-modal/edit-other-vacation-modal.component';
import { AddSocialWithChildrenVacationModalComponent } from './components/vacation/social-with-children-vacation/add-social-with-children-vacation-modal/add-social-with-children-vacation-modal.component';
import { EditSocialWithChildrenVacationModalComponent } from './components/vacation/social-with-children-vacation/edit-social-with-children-vacation-modal/edit-social-with-children-vacation-modal.component';
import { AddSocialWithPregnancyOrLookVacationModalComponent } from './components/vacation/social-with-pregnancy-vacation/add-social-with-pregnancy-vacation-modal/add-social-with-pregnancy-vacation-modal.component';
import { EditSocialWithPregnancyOrLookVacationModalComponent } from './components/vacation/social-with-pregnancy-vacation/edit-social-with-pregnancy-vacation-modal/edit-social-with-pregnancy-vacation-modal.component';
import { AddWithoutPayrollVacationModalComponent } from './components/vacation/without-payroll-vacation/add-without-payroll-vacation-modal/add-without-payroll-vacation-modal.component';
import { EditWithoutPayrollVacationModalComponent } from './components/vacation/without-payroll-vacation/edit-without-payroll-vacation-modal/edit-without-payroll-vacation-modal.component';
import { RoleDirective } from './directives/role.directive';
import { CanActiveAdministrator } from './services/administrator.guard';
import { TechschoolInterceptor } from './services/techschool.interceptor';
import { AddEditWorkingYearModalComponent } from './components/vacation/add-edit-working-year-modal/add-edit-working-year-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoleDirective,
    LoginFormModalComponent,
    NotificationModalComponent,
    RegistrationFormModalComponent,
    PersonalCardListComponent,
    RegistrationRequestListComponent,
    DisciplineComponent,
    SelectSubjectModalComponent,
    AddDiplomaModalComponent,
    AddAnnualVacationModalComponent,
    EditAnnualVacationModalComponent,
    AddEditCycleCommissionModalComponent,
    AddEditSubjectModalComponent,
    DisciplineInfoComponent,
    SelectSubjectComponent,
    AddOtherVacationModalComponent,
    EditOtherVacationModalComponent,
    AddSocialWithPregnancyOrLookVacationModalComponent,
    EditSocialWithPregnancyOrLookVacationModalComponent,
    AddWithoutPayrollVacationModalComponent,
    EditWithoutPayrollVacationModalComponent,
    AddAdditionalStudyVacationModalComponent,
    EditAdditionalStudyVacationModalComponent,
    AddSocialWithChildrenVacationModalComponent,
    EditSocialWithChildrenVacationModalComponent,
    UploadFileComponent,
    PersonalCardDetailsComponent,
    AddEditWorkingYearModalComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AppMaterialModule,
    ReactiveFormsModule,
    TextMaskModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TechschoolInterceptor,
      multi: true
    },
    CanActiveAdministrator
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    LoginFormModalComponent,
    NotificationModalComponent,
    RegistrationFormModalComponent,
    SelectSubjectModalComponent,
    AddDiplomaModalComponent,
    AddAnnualVacationModalComponent,
    EditAnnualVacationModalComponent,
    AddEditCycleCommissionModalComponent,
    AddEditSubjectModalComponent,
    AddOtherVacationModalComponent,
    EditOtherVacationModalComponent,
    AddSocialWithPregnancyOrLookVacationModalComponent,
    EditSocialWithPregnancyOrLookVacationModalComponent,
    AddWithoutPayrollVacationModalComponent,
    EditWithoutPayrollVacationModalComponent,
    AddAdditionalStudyVacationModalComponent,
    EditAdditionalStudyVacationModalComponent,
    AddSocialWithChildrenVacationModalComponent,
    EditSocialWithChildrenVacationModalComponent,
    AddEditWorkingYearModalComponent,
  ]
})
export class AppModule { }
