import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisciplineInfoComponent } from './components/discipline/discipline-info/discipline-info.component';
import { DisciplineComponent } from './components/discipline/discipline/discipline.component';
import { HomeComponent } from './components/home/home.component';
import { PersonalCardListComponent } from './components/personal-card/personal-card-list/personal-card-list.component';
import { PersonalCardDetailsComponent } from './components/personal-card/personal-card-details/personal-card-details.component';
import { RegistrationRequestListComponent } from './components/registration-request-list/registration-request-list.component';
import { AdditionalStudyVacationFormComponent } from './components/vacation/additional-study-vacation/additional-study-vacation-form/additional-study-vacation-form.component';
import { AnnualVacationFormComponent } from './components/vacation/annual-vacation/annual-vacation-form/annual-vacation-form.component';
import { OtherVacationFormComponent } from './components/vacation/other-vacation/other-vacation-form/other-vacation-form.component';
import { SocialWithChildrenVacationFormComponent } from './components/vacation/social-with-children-vacation/social-with-children-vacation-form/social-with-children-vacation-form.component';
import { SocialWithPregnancyOrLookVacationFormComponent } from './components/vacation/social-with-pregnancy-vacation/social-with-pregnancy-vacation-form/social-with-pregnancy-vacation-form.component';
import { WithoutPayrollVacationFormComponent } from './components/vacation/without-payroll-vacation/without-payroll-vacation-form/without-payroll-vacation-form.component';
import { CanActiveAdministrator } from './services/administrator.guard';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'personal-cards',
        children: [
          {
            path: '',
            component: PersonalCardListComponent
          },
          {
            path: 'details',
            component: PersonalCardDetailsComponent,
            canActivate: [CanActiveAdministrator]
          },
          {
            path: 'details/:id',
            component: PersonalCardDetailsComponent,
            canActivate: [CanActiveAdministrator]
          },
          {
            path: ':id/additional-study-vacations/:formId',
            component: AdditionalStudyVacationFormComponent,
            canActivate: [CanActiveAdministrator]
          },
          {
            path: ':id/annual-vacations/:formId',
            component: AnnualVacationFormComponent,
            canActivate: [CanActiveAdministrator]
          },
          {
            path: ':id/other-vacations/:formId',
            component: OtherVacationFormComponent,
            canActivate: [CanActiveAdministrator]
          },
          {
            path: ':id/social-with-children-vacations/:formId',
            component: SocialWithChildrenVacationFormComponent,
            canActivate: [CanActiveAdministrator]
          },
          {
            path: ':id/social-with-pregnancy-or-look-vacations/:formId',
            component: SocialWithPregnancyOrLookVacationFormComponent,
            canActivate: [CanActiveAdministrator]
          },
          {
            path: ':id/without-payroll-vacations/:formId',
            component: WithoutPayrollVacationFormComponent,
            canActivate: [CanActiveAdministrator]
          },
        ]
      },
      { path: 'registration-requests', component: RegistrationRequestListComponent, canActivate: [CanActiveAdministrator] },
      { path: 'disciplines', component: DisciplineComponent },
      { path: 'disciplines/:cycleCommissionId', component: DisciplineComponent },
      { path: 'disciplines-info', component: DisciplineInfoComponent }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
