import { OtherVacationFormModel } from './../models/vacations/other-vacation-form.model';
import { SocialWithPregnancyOrLookVacationFormModel } from './../models/vacations/social-with-pregnancy-or-look-vacation-form.model';
import { SocialWithChildrenVacationFormModel } from './../models/vacations/social-with-children-vacation-form.model';
import { AdditionalStudyVacationFormModel } from './../models/vacations/additional-study-vacation-form.model';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { AnnualVacationFormModel } from '@models/vacations/annual-vacation-form.model';
import { AnnualVacationModel } from '@models/vacations/annual-vacation.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WithoutPayrollVacationFormModel } from '@models/vacations/without-payroll-vacation-form.model';
import { WithoutPayrollVacationModel } from '@models/vacations/without-payroll-vacation.model';
import { AdditionalStudyVacationModel } from '@models/vacations/additional-study-vacation.model';
import { SocialWithChildrenVacationModel } from '@models/vacations/social-with-children-vacation.model';
import { SocialWithPregnancyOrLookVacationModel } from '@models/vacations/social-with-pregnancy-or-look-vacation.model';
import { OtherVacationModel } from '@models/vacations/other-vacation.model';

@Injectable({
    providedIn: 'root',
})
export class VacationService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }


  // Annual Vacation

  public getAnnualVacationFormsByPersonalCardId(id: string): Observable<AnnualVacationFormModel[]> {
    return this.http.get<AnnualVacationFormModel[]>(this.baseUrl + 'api/vacations/annual-vacation-forms/' + id).pipe(
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
    return this.http.get<AnnualVacationFormModel>(this.baseUrl + 'api/vacations/annual-vacation-forms/' + personalCardId + '/' + formId).pipe(
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
    return this.http.post(this.baseUrl + 'api/vacations/annual-vacation-forms', model);
  }

  public saveAnnualVacation(model: AnnualVacationModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/vacations/annual-vacations', model);
  }

  public deleteAnnualVacation(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/vacations/annual-vacations/' + id);
  }


  // Without Payroll Vacation

  public getWithoutPayrollVacationFormsByPersonalCardId(id: string): Observable<WithoutPayrollVacationFormModel[]> {
    return this.http.get<WithoutPayrollVacationFormModel[]>(this.baseUrl + 'api/vacations/without-payroll-vacation-forms/' + id).pipe(
      map((model: WithoutPayrollVacationFormModel[]) => {
        const mappedModel: WithoutPayrollVacationFormModel[] = model.map(form => {
          const mappedForm = Object.assign(new WithoutPayrollVacationFormModel(), form);
          mappedForm.withoutPayrollVacations = mappedForm.withoutPayrollVacations.map(_ => {
            const mapped = Object.assign(new WithoutPayrollVacationModel(), _);
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

  public getWithoutPayrollVacationForm(personalCardId: string, formId: string): Observable<WithoutPayrollVacationFormModel> {
    return this.http.get<WithoutPayrollVacationFormModel>(this.baseUrl + 'api/vacations/without-payroll-vacation-forms/' + personalCardId + '/' + formId).pipe(
      map((model: WithoutPayrollVacationFormModel) => {
        const mappedModel: WithoutPayrollVacationFormModel = Object.assign(new WithoutPayrollVacationFormModel(), model);
        mappedModel.withoutPayrollVacations = mappedModel.withoutPayrollVacations.map(_ => {
          const mapped = Object.assign(new WithoutPayrollVacationModel(), _);
          mapped.startOfVacationDate = new Date(_.startOfVacationDate);
          mapped.endOfVacationDate = new Date(_.endOfVacationDate);
          mapped.orderDate = new Date(_.orderDate);
          return mapped;
        });
        return mappedModel;
      })
    );
  }

  public saveWithoutPayrollVacationForm(model: WithoutPayrollVacationFormModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/vacations/without-payroll-vacation-forms', model);
  }

  public saveWithoutPayrollVacation(model: WithoutPayrollVacationModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/vacations/without-payroll-vacations', model);
  }

  public deleteWithoutPayrollVacation(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/vacations/without-payroll-vacations/' + id);
  }


  // Additional Study Vacation

  public getAdditionalStudyVacationFormsByPersonalCardId(id: string): Observable<AdditionalStudyVacationFormModel[]> {
    return this.http.get<AdditionalStudyVacationFormModel[]>(this.baseUrl + 'api/vacations/additional-study-vacation-forms/' + id).pipe(
      map((model: AdditionalStudyVacationFormModel[]) => {
        const mappedModel: AdditionalStudyVacationFormModel[] = model.map(form => {
          const mappedForm = Object.assign(new AdditionalStudyVacationFormModel(), form);
          mappedForm.additionalStudyVacations = mappedForm.additionalStudyVacations.map(_ => {
            const mapped = Object.assign(new AdditionalStudyVacationModel(), _);
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

  public getAdditionalStudyVacationForm(personalCardId: string, formId: string): Observable<AdditionalStudyVacationFormModel> {
    return this.http.get<AdditionalStudyVacationFormModel>(this.baseUrl + 'api/vacations/additional-study-vacation-forms/' + personalCardId + '/' + formId).pipe(
      map((model: AdditionalStudyVacationFormModel) => {
        const mappedModel: AdditionalStudyVacationFormModel = Object.assign(new AdditionalStudyVacationFormModel(), model);
        mappedModel.additionalStudyVacations = mappedModel.additionalStudyVacations.map(_ => {
          const mapped = Object.assign(new AdditionalStudyVacationModel(), _);
          mapped.startOfVacationDate = new Date(_.startOfVacationDate);
          mapped.endOfVacationDate = new Date(_.endOfVacationDate);
          mapped.orderDate = new Date(_.orderDate);
          return mapped;
        });
        return mappedModel;
      })
    );
  }

  public saveAdditionalStudyVacationForm(model: AdditionalStudyVacationFormModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/vacations/additional-study-vacation-forms', model);
  }

  public saveAdditionalStudyVacation(model: AdditionalStudyVacationModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/vacations/additional-study-vacations', model);
  }

  public deleteAdditionalStudyVacation(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/vacations/additional-study-vacations/' + id);
  }


  // Social With Children Vacation

  public getSocialWithChildrenVacationFormsByPersonalCardId(id: string): Observable<SocialWithChildrenVacationFormModel[]> {
    return this.http.get<SocialWithChildrenVacationFormModel[]>(this.baseUrl + 'api/vacations/social-with-children-vacation-forms/' + id).pipe(
      map((model: SocialWithChildrenVacationFormModel[]) => {
        const mappedModel: SocialWithChildrenVacationFormModel[] = model.map(form => {
          const mappedForm = Object.assign(new SocialWithChildrenVacationFormModel(), form);
          mappedForm.socialWithChildrenVacations = mappedForm.socialWithChildrenVacations.map(_ => {
            const mapped = Object.assign(new SocialWithChildrenVacationModel(), _);
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

  public getSocialWithChildrenVacationForm(personalCardId: string, formId: string): Observable<SocialWithChildrenVacationFormModel> {
    return this.http.get<SocialWithChildrenVacationFormModel>(this.baseUrl + 'api/vacations/social-with-children-vacation-forms/' + personalCardId + '/' + formId).pipe(
      map((model: SocialWithChildrenVacationFormModel) => {
        const mappedModel: SocialWithChildrenVacationFormModel = Object.assign(new SocialWithChildrenVacationFormModel(), model);
        mappedModel.socialWithChildrenVacations = mappedModel.socialWithChildrenVacations.map(_ => {
          const mapped = Object.assign(new SocialWithChildrenVacationModel(), _);
          mapped.startOfVacationDate = new Date(_.startOfVacationDate);
          mapped.endOfVacationDate = new Date(_.endOfVacationDate);
          mapped.orderDate = new Date(_.orderDate);
          return mapped;
        });
        return mappedModel;
      })
    );
  }

  public saveSocialWithChildrenVacationForm(model: SocialWithChildrenVacationFormModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/vacations/social-with-children-vacation-forms', model);
  }

  public saveSocialWithChildrenVacation(model: SocialWithChildrenVacationModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/vacations/social-with-children-vacations', model);
  }

  public deleteSocialWithChildrenVacation(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/vacations/social-with-children-vacations/' + id);
  }


  // Social With Pregnancy Or Look Vacation

  public getSocialWithPregnancyOrLookVacationFormsByPersonalCardId(id: string): Observable<SocialWithPregnancyOrLookVacationFormModel[]> {
    return this.http.get<SocialWithPregnancyOrLookVacationFormModel[]>(this.baseUrl + 'api/vacations/social-with-pregnancy-or-look-vacation-forms/' + id).pipe(
      map((model: SocialWithPregnancyOrLookVacationFormModel[]) => {
        const mappedModel: SocialWithPregnancyOrLookVacationFormModel[] = model.map(form => {
          const mappedForm = Object.assign(new SocialWithPregnancyOrLookVacationFormModel(), form);
          mappedForm.socialWithPregnancyOrLookVacations = mappedForm.socialWithPregnancyOrLookVacations.map(_ => {
            const mapped = Object.assign(new SocialWithPregnancyOrLookVacationModel(), _);
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

  public getSocialWithPregnancyOrLookVacationForm(personalCardId: string, formId: string): Observable<SocialWithPregnancyOrLookVacationFormModel> {
    return this.http.get<SocialWithPregnancyOrLookVacationFormModel>(this.baseUrl + 'api/vacations/social-with-pregnancy-or-look-vacation-forms/' + personalCardId + '/' + formId).pipe(
      map((model: SocialWithPregnancyOrLookVacationFormModel) => {
        const mappedModel: SocialWithPregnancyOrLookVacationFormModel = Object.assign(new SocialWithPregnancyOrLookVacationFormModel(), model);
        mappedModel.socialWithPregnancyOrLookVacations = mappedModel.socialWithPregnancyOrLookVacations.map(_ => {
          const mapped = Object.assign(new SocialWithPregnancyOrLookVacationModel(), _);
          mapped.startOfVacationDate = new Date(_.startOfVacationDate);
          mapped.endOfVacationDate = new Date(_.endOfVacationDate);
          mapped.orderDate = new Date(_.orderDate);
          return mapped;
        });
        return mappedModel;
      })
    );
  }

  public saveSocialWithPregnancyOrLookVacationForm(model: SocialWithPregnancyOrLookVacationFormModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/vacations/social-with-pregnancy-or-look-vacation-forms', model);
  }

  public saveSocialWithPregnancyOrLookVacation(model: SocialWithPregnancyOrLookVacationModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/vacations/social-with-pregnancy-or-look-vacations', model);
  }

  public deleteSocialWithPregnancyOrLookVacation(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/vacations/social-with-pregnancy-or-look-vacations/' + id);
  }


  // Other Vacation

  public getOtherVacationFormsByPersonalCardId(id: string): Observable<OtherVacationFormModel[]> {
    return this.http.get<OtherVacationFormModel[]>(this.baseUrl + 'api/vacations/other-vacation-forms/' + id).pipe(
      map((model: OtherVacationFormModel[]) => {
        const mappedModel: OtherVacationFormModel[] = model.map(form => {
          const mappedForm = Object.assign(new OtherVacationFormModel(), form);
          mappedForm.otherVacations = mappedForm.otherVacations.map(_ => {
            const mapped = Object.assign(new OtherVacationModel(), _);
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

  public getOtherVacationForm(personalCardId: string, formId: string): Observable<OtherVacationFormModel> {
    return this.http.get<OtherVacationFormModel>(this.baseUrl + 'api/vacations/other-vacation-forms/' + personalCardId + '/' + formId).pipe(
      map((model: OtherVacationFormModel) => {
        const mappedModel: OtherVacationFormModel = Object.assign(new OtherVacationFormModel(), model);
        mappedModel.otherVacations = mappedModel.otherVacations.map(_ => {
        const mapped = Object.assign(new OtherVacationModel(), _);
          mapped.startOfVacationDate = new Date(_.startOfVacationDate);
          mapped.endOfVacationDate = new Date(_.endOfVacationDate);
          mapped.orderDate = new Date(_.orderDate);
          return mapped;
        });
        return mappedModel;
      })
    );
  }

  public saveOtherVacationForm(model: OtherVacationFormModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/vacations/other-vacation-forms', model);
  }

  public saveOtherVacation(model: OtherVacationModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/vacations/other-vacations', model);
  }

  public deleteOtherVacation(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/vacations/other-vacations/' + id);
  }
}
