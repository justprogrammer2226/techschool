import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  templateUrl: './notification-modal.component.html',
  styleUrls: [
    './notification-modal.component.css'
  ]
})
export class NotificationModalComponent {

  public title: string;
  public message: string;
  public isError: boolean;

  constructor(private dialogRef: MatDialogRef<NotificationModalComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.title = data.title ? data.title : 'No title';
    this.message = data.message ? data.message : 'No message';
    this.isError = data.isError ? data.isError : false;
  }

  public close(): void {
    this.dialogRef.close();
  }
}
