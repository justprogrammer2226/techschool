import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AdditionalStudyVacationModel } from '@models/vacations/additional-study-vacation.model';
import { AnnualVacationModel } from '@models/vacations/annual-vacation.model';
import { OtherVacationModel } from '@models/vacations/other-vacation.model';
import { SocialWithChildrenVacationModel } from '@models/vacations/social-with-children-vacation.model';
import { SocialWithPregnancyOrLookVacationModel } from '@models/vacations/social-with-pregnancy-or-look-vacation.model';
import { WithoutPayrollVacationModel } from '@models/vacations/without-payroll-vacation.model';
import { Observable } from 'rxjs';
import { WorkingYearModel } from './../models/vacations/working-year.model';

@Injectable({
    providedIn: 'root',
})
export class VacationService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public saveWorkingYear(model: WorkingYearModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/vacations/working-years', model);
  }

  public deleteWorkingYear(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/vacations/working-years/' + id);
  }


  // Annual Vacation

  public saveAnnualVacation(model: AnnualVacationModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/vacations/annual-vacations', model);
  }

  public deleteAnnualVacation(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/vacations/annual-vacations/' + id);
  }


  // Without Payroll Vacation

  public saveWithoutPayrollVacation(model: WithoutPayrollVacationModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/vacations/without-payroll-vacations', model);
  }

  public deleteWithoutPayrollVacation(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/vacations/without-payroll-vacations/' + id);
  }


  // Additional Study Vacation

  public saveAdditionalStudyVacation(model: AdditionalStudyVacationModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/vacations/additional-study-vacations', model);
  }

  public deleteAdditionalStudyVacation(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/vacations/additional-study-vacations/' + id);
  }


  // Social With Children Vacation

  public saveSocialWithChildrenVacation(model: SocialWithChildrenVacationModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/vacations/social-with-children-vacations', model);
  }

  public deleteSocialWithChildrenVacation(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/vacations/social-with-children-vacations/' + id);
  }


  // Social With Pregnancy Or Look Vacation

  public saveSocialWithPregnancyOrLookVacation(model: SocialWithPregnancyOrLookVacationModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/vacations/social-with-pregnancy-or-look-vacations', model);
  }

  public deleteSocialWithPregnancyOrLookVacation(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/vacations/social-with-pregnancy-or-look-vacations/' + id);
  }


  // Other Vacation

  public saveOtherVacation(model: OtherVacationModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/vacations/other-vacations', model);
  }

  public deleteOtherVacation(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/vacations/other-vacations/' + id);
  }
}
