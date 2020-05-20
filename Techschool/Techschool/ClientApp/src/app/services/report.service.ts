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
export class ReportService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public getPersonalCardReport(id: string): Observable<any> {
    return this.http.get(this.baseUrl + 'api/reports/personal-cards/' + id, { responseType: 'blob' as 'json' });
  }
}
