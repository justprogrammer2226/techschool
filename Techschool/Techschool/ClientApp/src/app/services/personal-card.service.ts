import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PersonalCardModel } from '@models/personal-card.model';
import { AnnualVacationModel } from '@models/annual-vacation.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class PersonalCardService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public getAll(): Observable<PersonalCardModel[]> {
    return this.http.get<PersonalCardModel[]>(this.baseUrl + 'api/personal-cards');
  }

  public getById(id: string): Observable<PersonalCardModel> {
    return this.http.get<PersonalCardModel>(this.baseUrl + 'api/personal-cards/' + id);
  }

  public save(model: PersonalCardModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/personal-cards', model);
  }

  public delete(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/personal-cards/' + id);
  }

  public getAnnualVacationsByPersonalCardId(id: string): Observable<AnnualVacationModel[]> {
    return this.http.get<AnnualVacationModel[]>(this.baseUrl + 'api/personal-cards/annual-vacations/' + id).pipe(
      map((model: AnnualVacationModel[]) => {
        const mappedModel: AnnualVacationModel[] = [];
        model.forEach(_ => {
          const mapped = Object.assign(new AnnualVacationModel(), _);
          mapped.startVacationDate = new Date(_.startVacationDate);
          mapped.endVacationDate = new Date(_.endVacationDate);
          mapped.orderDate = new Date(_.orderDate);
          mappedModel.push(mapped);
        });
        return mappedModel;
      })
    );
  }

  public saveAnnualVacation(model: AnnualVacationModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/personal-cards/annual-vacations', model);
  }

  public deleteAnnualVacation(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/personal-cards/annual-vacations/' + id);
  }
}
