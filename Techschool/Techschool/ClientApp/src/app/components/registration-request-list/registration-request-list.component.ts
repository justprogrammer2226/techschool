import { Component, OnInit } from '@angular/core';
import { RegistrationRequestModel } from '@models/registration-request.model';
import { AuthService } from '@services/auth.service';
import { PersonalCardService } from '@services/personal-card.service';

@Component({
  templateUrl: './registration-request-list.component.html',
  styleUrls: [
    './registration-request-list.component.css'
  ]
})
export class RegistrationRequestListComponent implements OnInit {

  public registrationRequests: RegistrationRequestModel[] = [];
  public displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'approve', 'cancel'];

  constructor(private authService: AuthService, private personalCardService: PersonalCardService) { }

  public ngOnInit(): void {
    this.authService.getAllRequests().subscribe(response => {
      this.registrationRequests = response;
    });
  }

  public confirmRequest(request: RegistrationRequestModel): void {
    this.authService.confirmRequest(request.email).subscribe(response => {
      this.authService.getAllRequests().subscribe(response => {
        this.registrationRequests = response;
      });
    });
  }

  public cancelRequest(request: RegistrationRequestModel): void {
    this.authService.cancelRequest(request.email).subscribe(response => {
      this.authService.getAllRequests().subscribe(response => {
        this.registrationRequests = response;
      });
    });
  }
}
