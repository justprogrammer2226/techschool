import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PersonalCardListComponent } from './components/personal-card/personal-card-list/personal-card-list.component';
import { RegistrationRequestListComponent } from './components/personal-card/registration-request-list/registration-request-list.component';
import { DisciplineComponent } from './components/discipline/discipline/discipline.component';
import { PersonalCardDetailsComponent } from './components/personal-card/personal-card-details/personal-card-details.component';
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
            path: ':id',
            component: PersonalCardDetailsComponent
          }
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
