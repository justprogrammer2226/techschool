import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { SubjectModel } from '@models/subject.model';
import { DisciplineService } from '@services/discipline.service';

@Component({
  templateUrl: './add-subject-modal.component.html',
  styleUrls: [
    './add-subject-modal.component.css'
  ]
})
export class AddSubjectModalComponent {

  public newSubjectName: string;

  constructor(private dialogRef: MatDialogRef<AddSubjectModalComponent>, private dialog: MatDialog, private disciplineService: DisciplineService) { }

  public save(): void {
    const newSubject = new SubjectModel();
    newSubject.name = this.newSubjectName;
    this.disciplineService.saveSubject(newSubject).subscribe(response => {
      this.dialogRef.close();
    });
  }
}
