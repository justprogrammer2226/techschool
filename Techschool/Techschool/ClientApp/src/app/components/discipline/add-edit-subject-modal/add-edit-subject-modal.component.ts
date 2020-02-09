import { Component, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { SubjectModel } from '@models/subject.model';
import { DisciplineService } from '@services/discipline.service';

@Component({
  templateUrl: './add-edit-subject-modal.component.html',
  styleUrls: [
    './add-edit-subject-modal.component.css'
  ]
})
export class AddEditSubjectModalComponent {

  public subject: SubjectModel = new SubjectModel();
  public isAdd: boolean = false;

  constructor(
    private dialogRef: MatDialogRef<AddEditSubjectModalComponent>,
    private dialog: MatDialog,
    private disciplineService: DisciplineService,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    if (data && data.subjectId) {
      this.disciplineService.getSubjectById(data.subjectId).subscribe(response => {
        this.subject = response;
      });
    } else {
      this.isAdd = true;
    }
  }

  public save(): void {
    this.disciplineService.saveSubject(this.subject).subscribe(response => {
      this.dialogRef.close({ subject: response });
    });
  }
}
