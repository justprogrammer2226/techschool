import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { FilterPersonalCards } from '@models/filters/filter-personal-card.model';
import { PersonalCardModel } from '@models/personal-card.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DiplomaModel } from './../models/diploma.model';
import { WorkingYearModel } from './../models/vacations/working-year.model';

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
        if (personalCard.birthday) personalCard.birthday = new Date(personalCard.birthday);
        if (personalCard.fireDate) personalCard.fireDate = new Date(personalCard.fireDate);
        if (personalCard.hireDate) personalCard.hireDate = new Date(personalCard.hireDate);
        if (personalCard.teachingWorkExperienceOnDate) personalCard.teachingWorkExperienceOnDate = new Date(personalCard.teachingWorkExperienceOnDate);
        if (personalCard.totalWorkExperienceOnDate) personalCard.totalWorkExperienceOnDate = new Date(personalCard.totalWorkExperienceOnDate);
        if (personalCard.photo) personalCard.photo = "data:image/jpg;base64," + personalCard.photo;
        personalCard.diplomas = personalCard.diplomas.map(_ => {
          const mappedDiploma = Object.assign(new DiplomaModel(), _);
          mappedDiploma.receiptDate = new Date(_.receiptDate);
          mappedDiploma.graduationDate = new Date(_.graduationDate);
          return mappedDiploma;
        });
        personalCard.workingYears = personalCard.workingYears.map(_ => {
          return new WorkingYearModel(_);
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
