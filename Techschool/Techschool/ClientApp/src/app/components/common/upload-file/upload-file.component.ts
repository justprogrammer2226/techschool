import { Component, ViewChild, ElementRef, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MatDialog } from '@angular/material';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: [
    './upload-file.component.css'
  ]
})
export class UploadFileComponent {

  @Input() accept: string = 'image/*';
  @Output() fileLoaded: EventEmitter<string> = new EventEmitter();
  @ViewChild('inputFileId', {static: false}) el: ElementRef;
  public fileName: string;

  constructor() {
  }

  public openLoadFileWindow(): void {
    this.el.nativeElement.click();
  }

  public fileChangeEvent(fileInput: any): void {
    if (fileInput.target.files.length != 0) {
      this.fileName = fileInput.target.files[0].name;
    } else {
      this.fileName = null;
    }
    if (fileInput.target.files && fileInput.target.files[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(fileInput.target.files[0]);
      reader.onload = () => {
        this.fileLoaded.emit(reader.result.toString());
      };
    }
  }
}
