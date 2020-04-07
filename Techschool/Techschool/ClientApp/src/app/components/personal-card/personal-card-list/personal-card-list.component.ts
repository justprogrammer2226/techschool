import { Component, OnInit, ViewChild } from '@angular/core';
import { PersonalCardModel } from '@models/personal-card.model';
import { AuthService } from '@services/auth.service';
import { PersonalCardService } from '../../../services/personal-card.service';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';

@Component({
  templateUrl: './personal-card-list.component.html',
  styleUrls: [
    './personal-card-list.component.css'
  ]
})
export class PersonalCardListComponent implements OnInit {

  public dataSource: MatTableDataSource<PersonalCardModel>;
  public displayedColumns: string[] = ['edit', 'name', 'surname', 'patronymic', 'birthday', 'employmentType', 'cycleCommission'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  constructor(private authService: AuthService, private personalCardService: PersonalCardService, private router: Router) {

  }

  public ngOnInit(): void {
   
  }

  public ngAfterViewInit(): void {
    this.personalCardService.getAll().subscribe(response => {
      console.log(response);
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
    });
  }

  public openEditPersonalCardModal(personalCard: PersonalCardModel): void {
    this.router.navigate(['/personal-cards/', personalCard.id]);
  }
}
