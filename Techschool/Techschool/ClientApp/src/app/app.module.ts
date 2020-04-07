import { UploadFileComponent } from './components/common/upload-file/upload-file.component';
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
import { AddEditCycleCommissionModalComponent } from './components/discipline/add-edit-cycle-commission-modal/add-edit-cycle-commission-modal.component';
import { AddEditSubjectModalComponent } from './components/discipline/add-edit-subject-modal/add-edit-subject-modal.component';
import { DisciplineInfoComponent } from './components/discipline/discipline-info/discipline-info.component';
import { DisciplineComponent } from './components/discipline/discipline/discipline.component';
import { SelectSubjectModalComponent } from './components/discipline/select-subject-modal/select-subject-modal.component';
import { SelectSubjectComponent } from './components/discipline/select-subject/select-subject.component';
import { HomeComponent } from './components/home/home.component';
import { AddDiplomaModalComponent } from './components/personal-card/add-diploma-modal/add-diploma-modal.component';
import { AddPersonalCardModalComponent } from './components/personal-card/add-personal-card-modal/add-personal-card-modal.component';
import { EditPersonalCardModalComponent } from './components/personal-card/edit-personal-card-modal/edit-personal-card-modal.component';
import { PersonalCardDetailsComponent } from './components/personal-card/personal-card-details/personal-card-details.component';
import { PersonalCardListComponent } from './components/personal-card/personal-card-list/personal-card-list.component';
import { RegistrationRequestListComponent } from './components/registration-request-list/registration-request-list.component';
import { AddAdditionalStudyVacationFormModalComponent } from './components/vacation/additional-study-vacation/add-additional-study-vacation-form-modal/add-additional-study-vacation-form-modal.component';
import { AddAdditionalStudyVacationModalComponent } from './components/vacation/additional-study-vacation/add-additional-study-vacation-modal/add-additional-study-vacation-modal.component';
import { AdditionalStudyVacationFormComponent } from './components/vacation/additional-study-vacation/additional-study-vacation-form/additional-study-vacation-form.component';
import { EditAdditionalStudyVacationFormModalComponent } from './components/vacation/additional-study-vacation/edit-additional-study-vacation-form-modal/edit-additional-study-vacation-form-modal.component';
import { EditAdditionalStudyVacationModalComponent } from './components/vacation/additional-study-vacation/edit-additional-study-vacation-modal/edit-additional-study-vacation-modal.component';
import { AddAnnualVacationFormModalComponent } from './components/vacation/annual-vacation/add-annual-vacation-form-modal/add-annual-vacation-form-modal.component';
import { AddAnnualVacationModalComponent } from './components/vacation/annual-vacation/add-annual-vacation-modal/add-annual-vacation-modal.component';
import { AnnualVacationFormComponent } from './components/vacation/annual-vacation/annual-vacation-form/annual-vacation-form.component';
import { EditAnnualVacationFormModalComponent } from './components/vacation/annual-vacation/edit-annual-vacation-form-modal/edit-annual-vacation-form-modal.component';
import { EditAnnualVacationModalComponent } from './components/vacation/annual-vacation/edit-annual-vacation-modal/edit-annual-vacation-modal.component';
import { AddOtherVacationFormModalComponent } from './components/vacation/other-vacation/add-other-vacation-form-modal/add-other-vacation-form-modal.component';
import { AddOtherVacationModalComponent } from './components/vacation/other-vacation/add-other-vacation-modal/add-other-vacation-modal.component';
import { EditOtherVacationFormModalComponent } from './components/vacation/other-vacation/edit-other-vacation-form-modal/edit-other-vacation-form-modal.component';
import { EditOtherVacationModalComponent } from './components/vacation/other-vacation/edit-other-vacation-modal/edit-other-vacation-modal.component';
import { OtherVacationFormComponent } from './components/vacation/other-vacation/other-vacation-form/other-vacation-form.component';
import { AddSocialWithChildrenVacationFormModalComponent } from './components/vacation/social-with-children-vacation/add-social-with-children-vacation-form-modal/add-social-with-children-vacation-form-modal.component';
import { AddSocialWithChildrenVacationModalComponent } from './components/vacation/social-with-children-vacation/add-social-with-children-vacation-modal/add-social-with-children-vacation-modal.component';
import { EditSocialWithChildrenVacationFormModalComponent } from './components/vacation/social-with-children-vacation/edit-social-with-children-vacation-form-modal/edit-social-with-children-vacation-form-modal.component';
import { EditSocialWithChildrenVacationModalComponent } from './components/vacation/social-with-children-vacation/edit-social-with-children-vacation-modal/edit-social-with-children-vacation-modal.component';
import { SocialWithChildrenVacationFormComponent } from './components/vacation/social-with-children-vacation/social-with-children-vacation-form/social-with-children-vacation-form.component';
import { AddSocialWithPregnancyOrLookVacationFormModalComponent } from './components/vacation/social-with-pregnancy-vacation/add-social-with-pregnancy-vacation-form-modal/add-social-with-pregnancy-vacation-form-modal.component';
import { AddSocialWithPregnancyOrLookVacationModalComponent } from './components/vacation/social-with-pregnancy-vacation/add-social-with-pregnancy-vacation-modal/add-social-with-pregnancy-vacation-modal.component';
import { EditSocialWithPregnancyOrLookVacationFormModalComponent } from './components/vacation/social-with-pregnancy-vacation/edit-social-with-pregnancy-vacation-form-modal/edit-social-with-pregnancy-vacation-form-modal.component';
import { EditSocialWithPregnancyOrLookVacationModalComponent } from './components/vacation/social-with-pregnancy-vacation/edit-social-with-pregnancy-vacation-modal/edit-social-with-pregnancy-vacation-modal.component';
import { SocialWithPregnancyOrLookVacationFormComponent } from './components/vacation/social-with-pregnancy-vacation/social-with-pregnancy-vacation-form/social-with-pregnancy-vacation-form.component';
import { AddWithoutPayrollVacationFormModalComponent } from './components/vacation/without-payroll-vacation/add-without-payroll-vacation-form-modal/add-without-payroll-vacation-form-modal.component';
import { AddWithoutPayrollVacationModalComponent } from './components/vacation/without-payroll-vacation/add-without-payroll-vacation-modal/add-without-payroll-vacation-modal.component';
import { EditWithoutPayrollVacationFormModalComponent } from './components/vacation/without-payroll-vacation/edit-without-payroll-vacation-form-modal/edit-without-payroll-vacation-form-modal.component';
import { EditWithoutPayrollVacationModalComponent } from './components/vacation/without-payroll-vacation/edit-without-payroll-vacation-modal/edit-without-payroll-vacation-modal.component';
import { WithoutPayrollVacationFormComponent } from './components/vacation/without-payroll-vacation/without-payroll-vacation-form/without-payroll-vacation-form.component';
import { RoleDirective } from './directives/role.directive';
import { CanActiveAdministrator } from './services/administrator.guard';
import { TechschoolInterceptor } from './services/techschool.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoleDirective,
    LoginFormModalComponent,
    NotificationModalComponent,
    RegistrationFormModalComponent,
    AddPersonalCardModalComponent,
    PersonalCardListComponent,
    RegistrationRequestListComponent,
    DisciplineComponent,
    SelectSubjectModalComponent,
    PersonalCardDetailsComponent,
    EditPersonalCardModalComponent,
    AddDiplomaModalComponent,
    AddAnnualVacationModalComponent,
    EditAnnualVacationModalComponent,
    AnnualVacationFormComponent,
    AddAnnualVacationFormModalComponent,
    EditAnnualVacationFormModalComponent,
    AddEditCycleCommissionModalComponent,
    AddEditSubjectModalComponent,
    DisciplineInfoComponent,
    SelectSubjectComponent,
    AddOtherVacationFormModalComponent,
    AddOtherVacationModalComponent,
    EditOtherVacationFormModalComponent,
    EditOtherVacationModalComponent,
    OtherVacationFormComponent,
    AddSocialWithPregnancyOrLookVacationFormModalComponent,
    AddSocialWithPregnancyOrLookVacationModalComponent,
    EditSocialWithPregnancyOrLookVacationFormModalComponent,
    EditSocialWithPregnancyOrLookVacationModalComponent,
    SocialWithPregnancyOrLookVacationFormComponent,
    AddWithoutPayrollVacationModalComponent,
    AddWithoutPayrollVacationFormModalComponent,
    EditWithoutPayrollVacationFormModalComponent,
    EditWithoutPayrollVacationModalComponent,
    WithoutPayrollVacationFormComponent,
    AddAdditionalStudyVacationFormModalComponent,
    AddAdditionalStudyVacationModalComponent,
    EditAdditionalStudyVacationModalComponent,
    EditAdditionalStudyVacationFormModalComponent,
    AdditionalStudyVacationFormComponent,
    AddSocialWithChildrenVacationFormModalComponent,
    AddSocialWithChildrenVacationModalComponent,
    EditSocialWithChildrenVacationFormModalComponent,
    EditSocialWithChildrenVacationModalComponent,
    SocialWithChildrenVacationFormComponent,
    UploadFileComponent
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
    AddPersonalCardModalComponent,
    SelectSubjectModalComponent,
    EditPersonalCardModalComponent,
    AddDiplomaModalComponent,
    AddAnnualVacationModalComponent,
    EditAnnualVacationModalComponent,
    AddAnnualVacationFormModalComponent,
    EditAnnualVacationFormModalComponent,
    AddEditCycleCommissionModalComponent,
    AddEditSubjectModalComponent,
    AddOtherVacationFormModalComponent,
    AddOtherVacationModalComponent,
    EditOtherVacationFormModalComponent,
    EditOtherVacationModalComponent,
    AddSocialWithPregnancyOrLookVacationFormModalComponent,
    AddSocialWithPregnancyOrLookVacationModalComponent,
    EditSocialWithPregnancyOrLookVacationFormModalComponent,
    EditSocialWithPregnancyOrLookVacationModalComponent,
    AddWithoutPayrollVacationModalComponent,
    AddWithoutPayrollVacationFormModalComponent,
    EditWithoutPayrollVacationFormModalComponent,
    EditWithoutPayrollVacationModalComponent,
    AddAdditionalStudyVacationFormModalComponent,
    AddAdditionalStudyVacationModalComponent,
    EditAdditionalStudyVacationModalComponent,
    EditAdditionalStudyVacationFormModalComponent,
    AddSocialWithChildrenVacationFormModalComponent,
    AddSocialWithChildrenVacationModalComponent,
    EditSocialWithChildrenVacationFormModalComponent,
    EditSocialWithChildrenVacationModalComponent,
  ]
})
export class AppModule { }
