import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DisciplineInfoComponent } from './components/discipline/discipline-info/discipline-info.component';
import { DisciplineComponent } from './components/discipline/discipline/discipline.component';
import { HomeComponent } from './components/home/home.component';
import { PersonalCardDetailsComponent } from './components/personal-card/personal-card-details/personal-card-details.component';
import { PersonalCardListComponent } from './components/personal-card/personal-card-list/personal-card-list.component';
import { RegistrationRequestListComponent } from './components/registration-request-list/registration-request-list.component';
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
