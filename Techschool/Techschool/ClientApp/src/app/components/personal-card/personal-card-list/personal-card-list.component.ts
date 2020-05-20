import { Order } from './../../../models/filters/filter-personal-card.model';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { PersonalCardModel } from '@models/personal-card.model';
import { AuthService } from '@services/auth.service';
import { PersonalCardService } from '../../../services/personal-card.service';
import { Router } from '@angular/router';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { CycleCommissionModel } from '@models/cycle-commission.model';
import { DisciplineService } from '@services/discipline.service';
import { FilterPersonalCards, MathOperators } from '@models/filters/filter-personal-card.model';



@Component({
  templateUrl: './personal-card-list.component.html',
  styleUrls: [
    './personal-card-list.component.css'
  ]
})
export class PersonalCardListComponent implements OnInit, AfterViewInit {

  public cycleCommissions: CycleCommissionModel[] = [];
  public filter: FilterPersonalCards = new FilterPersonalCards();

  public dataSource: MatTableDataSource<PersonalCardModel>;
  public displayedColumns: string[] = ['edit', 'name', 'surname', 'patronymic', 'birthday', 'employmentType'];
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  public MathOperators = MathOperators;

  constructor(
    private authService: AuthService,
    private personalCardService: PersonalCardService,
    private disciplineService: DisciplineService,
    private router: Router) {

  }

  public ngOnInit(): void {
    this.disciplineService.getCycleCommissions().subscribe(response => {
      this.cycleCommissions = response;
    });
  }

  public ngAfterViewInit(): void {
    this.loadPersonalCards();
  }

  public navigateToPersonalCardDetails(personalCard: PersonalCardModel): void {
    this.router.navigate(['/personal-cards/details', personalCard.id]);
  }

  public loadPersonalCards(): void {
    this.personalCardService.getAll(this.filter).subscribe(response => {
      this.dataSource = new MatTableDataSource(response);
      this.dataSource.paginator = this.paginator;
    });
  }

  public changeFiltrationByName(): void {
    this.filter.nameOrderBy = this.nextOrder(this.filter.nameOrderBy);
    this.loadPersonalCards();
  }

  public changeFiltrationBySurname(): void {
    this.filter.surnameOrderBy = this.nextOrder(this.filter.surnameOrderBy);
    this.loadPersonalCards();
  }

  public changeFiltrationByPatronymic(): void {
    this.filter.patronymicOrderBy = this.nextOrder(this.filter.patronymicOrderBy);
    this.loadPersonalCards();
  }

  private nextOrder(currentOrder: Order): Order {
    if (currentOrder == Order.Random) {
      return Order.Asc;
    } else if (currentOrder == Order.Asc) {
      return Order.Desc;
    } else if (currentOrder == Order.Desc) {
      return Order.Random;
    } else {
      alert('DEV ERROR IN ORDER FILTRATION');
      return Order.Random;
    }
  }

  public getTitleByOrder(currentOrder: Order): string {
    if (currentOrder == Order.Random) {
      return 'Випадковий';
    } else if (currentOrder == Order.Asc) {
      return 'За зростанням';
    } else if (currentOrder == Order.Desc) {
      return 'За спаданням';
    } else {
      return 'DEV ERROR IN ORDER FILTRATION';
    }
  }

}
