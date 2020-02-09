import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextMaskModule } from 'angular2-text-mask';
import { AppMaterialModule } from './app-material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginFormModalComponent } from './components/common/modals/login-form-modal/login-form-modal.component';
import { NotificationModalComponent } from './components/common/modals/notification-modal/notification-modal.component';
import { RegistrationFormModalComponent } from './components/common/modals/registration-form-modal/registration-form-modal.component';
import { AddEditCycleCommissionModalComponent } from './components/discipline/add-edit-cycle-commission-modal/add-edit-cycle-commission-modal.component';
import { DisciplineComponent } from './components/discipline/discipline/discipline.component';
import { SelectSubjectModalComponent } from './components/discipline/select-subject-modal/select-subject-modal.component';
import { HomeComponent } from './components/home/home.component';
import { AddDiplomaModalComponent } from './components/personal-card/add-diploma-modal/add-diploma-modal.component';
import { AddPersonalCardModalComponent } from './components/personal-card/add-personal-card-modal/add-personal-card-modal.component';
import { EditPersonalCardModalComponent } from './components/personal-card/edit-personal-card-modal/edit-personal-card-modal.component';
import { PersonalCardDetailsComponent } from './components/personal-card/personal-card-details/personal-card-details.component';
import { PersonalCardListComponent } from './components/personal-card/personal-card-list/personal-card-list.component';
import { AddAnnualVacationFormModalComponent } from './components/personal-card/vacation/add-annual-vacation-form-modal/add-annual-vacation-form-modal.component';
import { AddAnnualVacationModalComponent } from './components/personal-card/vacation/add-annual-vacation-modal/add-annual-vacation-modal.component';
import { AnnualVacationFormComponent } from './components/personal-card/vacation/annual-vacation-form/annual-vacation-form.component';
import { EditAnnualVacationFormModalComponent } from './components/personal-card/vacation/edit-annual-vacation-form-modal/edit-annual-vacation-form-modal.component';
import { EditAnnualVacationModalComponent } from './components/personal-card/vacation/edit-annual-vacation-modal/edit-annual-vacation-modal.component';
import { RegistrationRequestListComponent } from './components/registration-request-list/registration-request-list.component';
import { RoleDirective } from './directives/role.directive';
import { CanActiveAdministrator } from './services/administrator.guard';
import { TechschoolInterceptor } from './services/techschool.interceptor';
import { AddEditSubjectModalComponent } from './components/discipline/add-edit-subject-modal/add-edit-subject-modal.component';

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
    AddEditSubjectModalComponent
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
    AddEditSubjectModalComponent
  ]
})
export class AppModule { }
