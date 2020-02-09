import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisciplineComponent } from './components/discipline/discipline/discipline.component';
import { HomeComponent } from './components/home/home.component';
import { PersonalCardDetailsComponent } from './components/personal-card/personal-card-details/personal-card-details.component';
import { PersonalCardListComponent } from './components/personal-card/personal-card-list/personal-card-list.component';
import { RegistrationRequestListComponent } from './components/registration-request-list/registration-request-list.component';
import { CanActiveAdministrator } from './services/administrator.guard';
import { AnnualVacationFormModel } from '@models/vacations/annual-vacation-form.model';
import { AnnualVacationFormComponent } from './components/personal-card/vacation/annual-vacation-form/annual-vacation-form.component';

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
            path: ':id',
            component: PersonalCardDetailsComponent,
            canActivate: [CanActiveAdministrator]
          },
          {
            path: ':id/annual-vacations/:formId',
            component: AnnualVacationFormComponent,
            canActivate: [CanActiveAdministrator]
          },
        ]
      },
      { path: 'registration-requests', component: RegistrationRequestListComponent, canActivate: [CanActiveAdministrator] },
      { path: 'disciplines', component: DisciplineComponent }
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
