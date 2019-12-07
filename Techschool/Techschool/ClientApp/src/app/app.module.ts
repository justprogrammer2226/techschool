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
import { DisciplineComponent } from './components/discipline/discipline/discipline.component';
import { EditSubjectModalComponent } from './components/discipline/edit-subject-modal/edit-subject-modal.component';
import { HomeComponent } from './components/home/home.component';
import { AddPersonalCardModalComponent } from './components/personal-card/add-personal-card-modal/add-personal-card-modal.component';
import { PersonalCardListComponent } from './components/personal-card/personal-card-list/personal-card-list.component';
import { RegistrationRequestListComponent } from './components/personal-card/registration-request-list/registration-request-list.component';
import { RoleDirective } from './directives/role.directive';
import { TechschoolInterceptor } from './services/techschool.interceptor';
import { AddSubjectModalComponent } from './components/discipline/add-subject-modal/add-subject-modal.component';
import { AddCycleCommissionModalComponent } from './components/discipline/add-cycle-commission-modal/add-cycle-commission-modal.component';
import { EditCycleCommissionModalComponent } from './components/discipline/edit-cycle-commission-modal/edit-cycle-commission-modal.component';
import { SelectCycleCommissionModalComponent } from './components/discipline/select-cycle-commission-modal/select-cycle-commission-modal.component';
import { SelectSubjectModalComponent } from './components/discipline/select-subject-modal/select-subject-modal.component';

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
    SelectSubjectModalComponent
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
    }
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
    SelectSubjectModalComponent
  ]
})
export class AppModule { }
