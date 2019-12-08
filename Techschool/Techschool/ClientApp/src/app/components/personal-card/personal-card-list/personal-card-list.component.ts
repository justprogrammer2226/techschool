import { Component, OnInit } from '@angular/core';
import { PersonalCardModel } from '@models/personal-card.model';
import { AuthService } from '@services/auth.service';
import { PersonalCardService } from '../../../services/personal-card.service';
import { Router } from '@angular/router';

@Component({
  templateUrl: './personal-card-list.component.html',
  styleUrls: [
    './personal-card-list.component.css'
  ]
})
export class PersonalCardListComponent implements OnInit {

  public personalCards: PersonalCardModel[] = [];
  public displayedColumns: string[] = ['edit', 'name', 'surname', 'birthday', 'employmentType'];

  constructor(private authService: AuthService, private personalCardService: PersonalCardService, private router: Router) {

  }

  public ngOnInit(): void {
    this.personalCardService.getAll().subscribe(response => {
      this.personalCards = response;
    });
  }

  public openEditPersonalCardModal(personalCard: PersonalCardModel): void {
    this.router.navigate(['/personal-cards/', personalCard.id]);
  }
}
