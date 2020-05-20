import { DiplomaModel } from './../models/diploma.model';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PersonalCardModel } from '@models/personal-card.model';
import { map } from 'rxjs/operators';
import { AnnualVacationModel } from '@models/vacations/annual-vacation.model';
import { AnnualVacationFormModel } from '@models/vacations/annual-vacation-form.model';
import { AnnualVacationFormComponent } from 'app/components/vacation/annual-vacation/annual-vacation-form/annual-vacation-form.component';
import { FilterPersonalCards } from '@models/filters/filter-personal-card.model';

@Injectable({
    providedIn: 'root',
})
export class PersonalCardService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public getAll(filter: FilterPersonalCards = null): Observable<PersonalCardModel[]> {
    console.log(filter);
    return this.http.post<PersonalCardModel[]>(this.baseUrl + 'api/personal-cards/filter', filter);
  }

  public getById(id: string): Observable<PersonalCardModel> {
    return this.http.get<PersonalCardModel>(this.baseUrl + 'api/personal-cards/' + id).pipe(
      map(personalCard => {
        if (personalCard.photo) personalCard.photo = "data:image/jpg;base64," + personalCard.photo;
        personalCard.diplomas = personalCard.diplomas.map(_ => {
          const mappedDiploma = Object.assign(new DiplomaModel(), _);
          mappedDiploma.receiptDate = new Date(_.receiptDate);
          mappedDiploma.graduationDate = new Date(_.graduationDate);
          return mappedDiploma;
        });
        return personalCard;
      })
    );
  }

  public save(model: PersonalCardModel): Observable<any> {
    const body = Object.assign(new PersonalCardModel(), model);
    if (model.photo) body.photo = model.photo.split(',')[1];
    return this.http.post(this.baseUrl + 'api/personal-cards', body);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/personal-cards/' + id);
  }

  public canSaveDiploma(model: DiplomaModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/personal-cards/canSaveDiploma/', model);
  }
}
