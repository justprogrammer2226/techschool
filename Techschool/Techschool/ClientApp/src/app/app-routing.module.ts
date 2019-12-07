import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PersonalCardListComponent } from './components/personal-card/personal-card-list/personal-card-list.component';
import { RegistrationRequestListComponent } from './components/personal-card/registration-request-list/registration-request-list.component';
import { DisciplineComponent } from './components/discipline/discipline/discipline.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: 'personal-cards', component: PersonalCardListComponent },
      { path: 'registration-requests', component: RegistrationRequestListComponent },
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
