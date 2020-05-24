import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
