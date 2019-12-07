import { Component, Inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from '../models/login.model';
import { Observable } from 'rxjs';
import { RegistrationRequestModel } from '../models/registration-request.model';
import * as jwt_decode from "jwt-decode";

@Injectable({
    providedIn: 'root',
})
export class AuthService {
  private baseUrl: string;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public isAuthentificated(): boolean {
    const token: string = localStorage.getItem('techschool-token');
    if (token) {
      return true;
    }
    return false;
  }

  public login(loginModel: LoginModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/auth/login', loginModel);
  }

  public createRequest(registrationRequest: RegistrationRequestModel): Observable<any> {
    return this.http.post(this.baseUrl + 'api/auth/create-request', registrationRequest);
  }

  public confirmRequest(email: string): Observable<any> {
    return this.http.post(this.baseUrl + 'api/auth/confirm-request/' + email, null);
  }

  public cancelRequest(email: string): Observable<any> {
    return this.http.post(this.baseUrl + 'api/auth/cancel-request/' + email, null);
  }

  public getAllRequests(): Observable<RegistrationRequestModel[]> {
    return this.http.get<RegistrationRequestModel[]>(this.baseUrl + 'api/auth/requests');
  }

  public hasRole(role: string): boolean {
    const roles = this.getRoles();
    if (roles && roles.find(_ => _ === role)) {
      return true;
    }
    return false;
  }

  public getRoles(): string[] {
    const payload: any = this.getPayload();
    if (payload) {
      return Array.isArray(payload.roles) ? payload.roles : [payload.roles];
    }
    return null;
  }

  public getUserId(): string[] {
    const payload: any = this.getPayload();
    if (payload) {
      return payload.userId;
    }
    return null;
  }

  public getFirstName(): string[] {
    const payload: any = this.getPayload();
    if (payload) {
      return payload.firstName;
    }
    return null;
  }

  public getLastName(): string[] {
    const payload: any = this.getPayload();
    if (payload) {
      return payload.lastName;
    }
    return null;
  }

  private getPayload(): any {
    const token: string = localStorage.getItem('techschool-token');
    if (token) {
      const payload: any = jwt_decode(token);
      return payload;
    }
    return null;
  }

  private base64Decode(base64str: string): string {
    return decodeURIComponent(atob(base64str).split('').map(function (c) {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
  }
}
