import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { LoginModel } from '../../models/login.model';
import { RegistrationRequestModel } from '../../models/registration-request.model';
import { AuthService } from '../../services/auth.service';
import { LoginFormModalComponent } from '../common/modals/login-form-modal/login-form-modal.component';
import { NotificationModalComponent } from '../common/modals/notification-modal/notification-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [
    './home.component.css'
  ]
})
export class HomeComponent implements OnInit {

  public loginModel: LoginModel = new LoginModel();
  public registerModel: RegistrationRequestModel = new RegistrationRequestModel();
  public requests: RegistrationRequestModel[] = [];
  public userName: string;
  public isAuthentificated: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog) { }

  public displayedColumns: string[] = ['firstName', 'lastName', 'email', 'role', 'approve'];
  public dataSource: RegistrationRequestModel[] = [];

  public ngOnInit(): void {
    this.isAuthentificated = this.authService.isAuthentificated();
    this.userName = this.authService.getLastName() + ' ' + this.authService.getFirstName();

    this.authService.getAllRequests().subscribe(response => {
      this.requests = response;
      this.dataSource = this.requests;
    });
  }

  public login(): void {
    this.authService.login(this.loginModel).subscribe(response => {
      localStorage.setItem('techschool-token', response.token);
    });
  }

  public register(): void {
    this.authService.createRequest(this.registerModel).subscribe();
  }

  public openLoginFormDialog(): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(NotificationModalComponent, {
        width: '300px',
        data: {
          title: 'Вхід неможливий',
          message: 'Ви вже авторизовані',
          isError: true
        }
      });
    } else {
      this.dialog.open(LoginFormModalComponent, {
        width: '400px'
      }).afterClosed().subscribe(data => {
        window.location.reload();
      });
    }
  }

  public logout() {
    localStorage.removeItem('techschool-token');
    window.location.reload();
  }

  public navigateToAddingPersonalCard() {
    if (!this.authService.isAuthentificated()) {
      this.dialog.open(NotificationModalComponent, {
        width: '300px',
        data: {
          title: 'Помилка',
          message: 'Ви не маєте прав на додання особистих карток',
          isError: true
        }
      });
    } else {
      this.router.navigate(['/personal-cards/details']);
    }
  }

  public openSideBarMenu() {
    document.getElementById('side-menu').style.width = '275px';
    const iconTexts = document.getElementsByClassName('icon-text') as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < iconTexts.length; i++) {
      iconTexts[i].style.opacity = '1';
    }
    const itemTexts = document.getElementsByClassName('item-text') as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < itemTexts.length; i++) {
      itemTexts[i].style.opacity = '1';
    }
  }

  public closeSideBarMenu() {
    document.getElementById('side-menu').style.width = '50px';
    const iconTexts = document.getElementsByClassName('icon-text') as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < iconTexts.length; i++) {
      iconTexts[i].style.opacity = '0';
    }
    const itemTexts = document.getElementsByClassName('item-text') as HTMLCollectionOf<HTMLElement>;
    for (let i = 0; i < itemTexts.length; i++) {
      itemTexts[i].style.opacity = '0';
    }
  }

}
