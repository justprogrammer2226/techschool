import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PersonalCardModel } from '@models/personal-card.model';
import { map } from 'rxjs/operators';
import { AnnualVacationModel } from '@models/vacations/annual-vacation.model';
import { AnnualVacationFormModel } from '@models/vacations/annual-vacation-form.model';
import { AnnualVacationFormComponent } from 'app/components/vacation/annual-vacation/annual-vacation-form/annual-vacation-form.component';

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
}
