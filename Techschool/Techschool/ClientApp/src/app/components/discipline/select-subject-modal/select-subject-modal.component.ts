import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DisciplineService } from '@services/discipline.service';
import { SubjectModel } from '../../../models/subject.model';

@Component({
  templateUrl: './select-subject-modal.component.html',
  styleUrls: [
    './select-subject-modal.component.css'
  ]
})
export class SelectSubjectModalComponent {

  public selectedSubject: SubjectModel;
  public subjects: SubjectModel[] = [];

  constructor(private dialogRef: MatDialogRef<SelectSubjectModalComponent>, private dialog: MatDialog, private disciplineService: DisciplineService) {
    this.disciplineService.getSubjects().subscribe(response => {
      this.subjects = response;
    });
  }

  public select(): void {
    this.dialogRef.close({
      selectedSubject: this.selectedSubject
    });
  }

}
