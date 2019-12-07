import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { CycleCommissionModel } from '@models/cycle-commission.model';
import { SubjectModel } from '@models/subject.model';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class DisciplineService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public getSubjects(): Observable<SubjectModel[]> {
    return this.http.get<SubjectModel[]>(this.baseUrl + 'api/disciplines/subjects');
  }

  public getSubjectById(id: string): Observable<SubjectModel> {
    return this.http.get<SubjectModel>(this.baseUrl + 'api/disciplines/subjects/' + id);
  }

  public saveSubject(model: SubjectModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/disciplines/subjects', model);
  }

  public deleteSubject(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/disciplines/subjects/' + id);
  }

  public getCycleCommissions(): Observable<CycleCommissionModel[]> {
    return this.http.get<CycleCommissionModel[]>(this.baseUrl + 'api/disciplines/cycle-commissions');
  }

  public getCycleCommissionById(id: string): Observable<CycleCommissionModel> {
    return this.http.get<CycleCommissionModel>(this.baseUrl + 'api/disciplines/cycle-commissions/' + id);
  }

  public saveCycleCommission(model: CycleCommissionModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/disciplines/cycle-commissions', model);
  }

  public deleteCycleCommission(id: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/disciplines/cycle-commissions/' + id);
  }

  public deleteCycleCommissionSubject(subjectId: string, cycleCommissionId: string): Observable<any> {
    return this.http.delete(this.baseUrl + 'api/disciplines/cycle-commission-subject/' + subjectId + '/' + cycleCommissionId)
  }
}
