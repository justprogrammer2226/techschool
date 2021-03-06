import { Component, OnInit } from '@angular/core';
import { PersonalCardModel } from '@models/personal-card.model';
import { AuthService } from '@services/auth.service';
import { PersonalCardService } from '../../../services/personal-card.service';

@Component({
  templateUrl: './personal-card-list.component.html',
  styleUrls: [
    './personal-card-list.component.css'
  ]
})
export class PersonalCardListComponent implements OnInit {

  public personalCards: PersonalCardModel[] = [];
  public displayedColumns: string[] = ['edit', 'name', 'surname', 'birthday', 'employmentType'];

  constructor(private authService: AuthService, private personalCardService: PersonalCardService) {

  }

  public ngOnInit(): void {
    this.personalCardService.getAll().subscribe(response => {
      this.personalCards = response;
    });
  }

  public editPersonalCard(personalCard: PersonalCardModel): void {
    console.log(personalCard);
  }
}
