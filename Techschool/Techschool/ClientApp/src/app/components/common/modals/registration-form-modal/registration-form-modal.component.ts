import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';
import { AuthService } from '../../../../services/auth.service';
import { LoginModel } from '../../../../models/login.model';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';
import { RegistrationRequestModel } from '../../../../models/registration-request.model';

@Component({
  templateUrl: './registration-form-modal.component.html',
  styleUrls: [
    './registration-form-modal.component.css'
  ]
})
export class RegistrationFormModalComponent {

  public formGroup: FormGroup;

  constructor(private authService: AuthService, private dialogRef: MatDialogRef<RegistrationFormModalComponent>, private formBuilder: FormBuilder, private dialog: MatDialog) {
    this.formGroup = this.formBuilder.group({
      'firstname': ['', Validators.required],
      'lastname': ['', Validators.required],
      'role': ['', Validators.required],
      'email': ['', [
        Validators.required,
        Validators.email
      ]],
      'password': ['', Validators.required],
    });
  }

  public getError(controlElementName): string {
    switch (controlElementName) {
      case 'firstname':
        if (this.formGroup.get('firstname').hasError('required')) {
          return 'Ім\'я обов\'язковий';
        } else {
          return 'Невідома помилка';
        }
        break;
      case 'lastname':
        if (this.formGroup.get('lastname').hasError('required')) {
          return 'Прізвище обов\'язковий';
        } else {
          return 'Невідома помилка';
        }
        break;
      case 'role':
        if (this.formGroup.get('role').hasError('required')) {
          return 'Вибір ролі обов\'язковий';
        } else {
          return 'Невідома помилка';
        }
        break;
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

  public register(formValue: any): void {
    const registrationRequestModel: RegistrationRequestModel = {
      firstName: formValue.firstname,
      lastName: formValue.lastname,
      role: formValue.role,
      email: formValue.email,
      password: formValue.password
    };
    this.authService.createRequest(registrationRequestModel).subscribe(response => {
      this.dialog.open(NotificationModalComponent, {
        width: '300px',
        data: {
          title: 'Реєстрація',
          message: 'Ваш запит на реєстрації передано адміністратору. Чекайте на підтвердження.'
        }
      });
      this.dialogRef.close();
    }, error => {
        this.dialog.open(NotificationModalComponent, {
          width: '300px',
          data: {
            title: 'Помилка',
            message: 'Невідома помилка при реєстрації',
            isError: true
          }
        });
    });
  }
}
