import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { PersonalCardModel } from '@models/personal-card.model';
import { map } from 'rxjs/operators';
import { AnnualVacationModel } from '@models/vacations/annual-vacation.model';
import { AnnualVacationFormModel } from '@models/vacations/annual-vacation-form.model';
import { AnnualVacationFormComponent } from 'app/components/personal-card/vacation/annual-vacation-form/annual-vacation-form.component';

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
    // return this.http.get<AnnualVacationModel[]>(this.baseUrl + 'api/personal-cards/annual-vacations/' + id).pipe(
    //   map((model: AnnualVacationModel[]) => {
    //     const mappedModel: AnnualVacationModel[] = [];
    //     model.forEach(_ => {
    //       const mapped = Object.assign(new AnnualVacationModel(), _);
    //       mapped.startOfVacationDate = new Date(_.startOfVacationDate);
    //       mapped.endOfVacationDate = new Date(_.endOfVacationDate);
    //       mapped.orderDate = new Date(_.orderDate);
    //       mappedModel.push(mapped);
    //     });
    //     return mappedModel;
    //   })
    // );
    const vacation = new AnnualVacationModel();
    vacation.orderNumber = '123';
    vacation.startOfVacationDate = new Date();
    vacation.endOfVacationDate = new Date();
    vacation.orderDate = new Date();
    return of([
      vacation
    ]);
  }

  public getAnnualVacationFormsByPersonalCardId(id: string): Observable<AnnualVacationFormModel[]> {
    return this.http.get<AnnualVacationFormModel[]>(this.baseUrl + 'api/personal-cards/annual-vacation-forms/' + id).pipe(
      map((model: AnnualVacationFormModel[]) => {
        const mappedModel: AnnualVacationFormModel[] = model.map(form => {
          const mappedForm = Object.assign(new AnnualVacationFormModel(), form);
          mappedForm.startOfWorkingYear = new Date(form.startOfWorkingYear);
          mappedForm.endOfWorkingYear = new Date(form.endOfWorkingYear);
          mappedForm.annualVacations = mappedForm.annualVacations.map(_ => {
            const mapped = Object.assign(new AnnualVacationModel(), _);
            mapped.startOfVacationDate = new Date(_.startOfVacationDate);
            mapped.endOfVacationDate = new Date(_.endOfVacationDate);
            mapped.orderDate = new Date(_.orderDate);
            return mapped;
          });
          return mappedForm;
        });
        return mappedModel;
      })
    );
  }

  public getAnnualVacationForm(personalCardId: string, formId: string): Observable<AnnualVacationFormModel> {
    return this.http.get<AnnualVacationFormModel>(this.baseUrl + 'api/personal-cards/annual-vacation-forms/' + personalCardId + '/' + formId).pipe(
      map((model: AnnualVacationFormModel) => {
        const mappedModel: AnnualVacationFormModel = Object.assign(new AnnualVacationFormModel(), model);
        mappedModel.startOfWorkingYear = new Date(model.startOfWorkingYear);
        mappedModel.endOfWorkingYear = new Date(model.endOfWorkingYear);
        mappedModel.annualVacations = mappedModel.annualVacations.map(_ => {
          const mapped = Object.assign(new AnnualVacationModel(), _);
          mapped.startOfVacationDate = new Date(_.startOfVacationDate);
          mapped.endOfVacationDate = new Date(_.endOfVacationDate);
          mapped.orderDate = new Date(_.orderDate);
          return mapped;
        });
        return mappedModel;
      })
    );
  }

  public saveAnnualVacationForm(model: AnnualVacationFormModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/personal-cards/annual-vacation-forms', model);
  }

  public saveAnnualVacation(model: AnnualVacationModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/personal-cards/annual-vacations', model);
  }

  public deleteAnnualVacation(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/personal-cards/annual-vacations/' + id);
  }
}
