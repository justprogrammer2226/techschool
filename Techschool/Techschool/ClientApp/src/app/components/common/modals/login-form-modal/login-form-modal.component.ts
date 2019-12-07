import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
import { AuthService } from '../../../../services/auth.service';
import { LoginModel } from '../../../../models/login.model';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';
import { RegistrationFormModalComponent } from '../registration-form-modal/registration-form-modal.component';

@Component({
  templateUrl: './login-form-modal.component.html',
  styleUrls: [
    './login-form-modal.component.css'
  ]
})
export class LoginFormModalComponent {

  public formGroup: FormGroup;

  constructor(private authService: AuthService, private dialogRef: MatDialogRef<LoginFormModalComponent>, private formBuilder: FormBuilder, private dialog: MatDialog) {
    this.formGroup = this.formBuilder.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]],
      'password': ['', Validators.required],
    });
  }

  public getError(controlElementName): string {
    switch (controlElementName) {
      case 'email':
        if (this.formGroup.get('email').hasError('required')) {
          return 'Електронна пошта обов\'язкова';
        } else if (this.formGroup.get('email').hasError('email')) {
          return 'Некорректна електронна пошта';
        } else {
          return 'Невідома помилка';
        }
        break;
      case 'password':
        if (this.formGroup.get('password').hasError('required')) {
          return 'Пароль обов\'язковий';
        } else {
          return 'Невідома помилка';
        }
        break;
      default:
        return 'Невідомий елемент для отримання помилки';
    }
  }

  public login(formValue: any): void {
    const loginModel: LoginModel = {
      email: formValue.email,
      password: formValue.password
    };
    this.authService.login(loginModel).subscribe(response => {
      localStorage.setItem('techschool-token', response.token);
      this.dialogRef.close();
    }, error => {
        let message: string;
        if ('User with email ' + loginModel.email + ' does not exist.' === error.error) {
          message = 'Користувача з такою поштою неіснує.';
        } else {
          message = 'Невідома помилка.';
        }

        this.dialog.open(NotificationModalComponent, {
          width: '300px',
          data: {
            title: 'Помилка',
            message: message,
            isError: true
          }
        });
    });
  }

  public openRegistrationFormDialog(): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(NotificationModalComponent, {
        width: '300px',
        data: {
          title: 'Реєстрація неможлива',
          message: 'Ви вже авторизовані',
          isError: true
        }
      });
    } else {
      this.dialog.open(RegistrationFormModalComponent, {
        width: '400px'
      });
    }
  }
}
