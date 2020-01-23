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
import { AddCycleCommissionModalComponent } from './components/discipline/add-cycle-commission-modal/add-cycle-commission-modal.component';
import { AddSubjectModalComponent } from './components/discipline/add-subject-modal/add-subject-modal.component';
import { DisciplineComponent } from './components/discipline/discipline/discipline.component';
import { EditCycleCommissionModalComponent } from './components/discipline/edit-cycle-commission-modal/edit-cycle-commission-modal.component';
import { EditSubjectModalComponent } from './components/discipline/edit-subject-modal/edit-subject-modal.component';
import { SelectCycleCommissionModalComponent } from './components/discipline/select-cycle-commission-modal/select-cycle-commission-modal.component';
import { SelectSubjectModalComponent } from './components/discipline/select-subject-modal/select-subject-modal.component';
import { HomeComponent } from './components/home/home.component';
import { AddDiplomaModalComponent } from './components/personal-card/add-diploma-modal/add-diploma-modal.component';
import { AddPersonalCardModalComponent } from './components/personal-card/add-personal-card-modal/add-personal-card-modal.component';
import { EditPersonalCardModalComponent } from './components/personal-card/edit-personal-card-modal/edit-personal-card-modal.component';
import { PersonalCardDetailsComponent } from './components/personal-card/personal-card-details/personal-card-details.component';
import { PersonalCardListComponent } from './components/personal-card/personal-card-list/personal-card-list.component';
import { AddAnnualVacationModalComponent } from './components/personal-card/vacation/add-annual-vacation-modal/add-annual-vacation-modal.component';
import { EditAnnualVacationModalComponent } from './components/personal-card/vacation/edit-annual-vacation-modal/edit-annual-vacation-modal.component';
import { RegistrationRequestListComponent } from './components/registration-request-list/registration-request-list.component';
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
    EditSubjectModalComponent,
    SelectCycleCommissionModalComponent,
    AddSubjectModalComponent,
    AddCycleCommissionModalComponent,
    EditCycleCommissionModalComponent,
    SelectSubjectModalComponent,
    PersonalCardDetailsComponent,
    EditPersonalCardModalComponent,
    AddDiplomaModalComponent,
    AddAnnualVacationModalComponent,
    EditAnnualVacationModalComponent
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
    EditSubjectModalComponent,
    SelectCycleCommissionModalComponent,
    AddSubjectModalComponent,
    AddCycleCommissionModalComponent,
    EditCycleCommissionModalComponent,
    SelectSubjectModalComponent,
    EditPersonalCardModalComponent,
    AddDiplomaModalComponent,
    AddAnnualVacationModalComponent,
    EditAnnualVacationModalComponent
  ]
})
export class AppModule { }
