import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { NotificationModalComponent } from 'app/components/common/modals/notification-modal/notification-modal.component';

@Injectable({
    providedIn: 'root',
})
export class ModalService {
  constructor(
    private http: HttpClient,
    private dialog: MatDialog
  ) {

  }

  public showNotification(title: string, message: string): MatDialogRef<NotificationModalComponent> {
    return this.dialog.open(NotificationModalComponent, {
      width: '300px',
      data: {
        title: title,
        message: message,
      }
    });
  }

  public showError(title: string, message: string): MatDialogRef<NotificationModalComponent> {
    return this.dialog.open(NotificationModalComponent, {
      width: '300px',
      data: {
        title: title,
        message: message,
        isError: true
      }
    });
  }
}
