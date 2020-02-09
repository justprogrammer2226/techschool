import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DisciplineService } from '@services/discipline.service';
import { SubjectModel } from '../../../models/subject.model';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';
import { AuthService } from '@services/auth.service';
import { AddEditSubjectModalComponent } from '../add-edit-subject-modal/add-edit-subject-modal.component';
import { ModalService } from '@services/modal.service';

@Component({
  templateUrl: './select-subject-modal.component.html',
  styleUrls: [
    './select-subject-modal.component.css'
  ]
})
export class SelectSubjectModalComponent implements OnInit {

  private subjects: SubjectModel[] = [];

  public myControl = new FormControl();
  public filteredOptions: Observable<SubjectModel[]>;

  constructor(
    private dialogRef: MatDialogRef<SelectSubjectModalComponent>,
    private dialog: MatDialog,
    private modalService: ModalService,
    private disciplineService: DisciplineService,
    private authService: AuthService
  ) { }

  public ngOnInit(): void {
    this.refreshSubjects();
  }

  private refreshSubjects(): void {
    this.disciplineService.getSubjects().subscribe(response => {
      this.subjects = response;
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => {
            return this.subjects.filter(option => {
              console.log(option);
              return option.name.toLowerCase().includes(value.toLowerCase());
            });
          })
        );
    });
  }

  public select(subject: SubjectModel): void {
    this.dialogRef.close({
      selectedSubject: subject
    });
  }

  public openAddSubjectModal(): void {
    if (this.authService.isAuthentificated()) {
      this.dialog.open(AddEditSubjectModalComponent, {
        width: '400px'
      }).afterClosed().subscribe(response => {
        this.dialogRef.close({
          selectedSubject: response.subject
        });
      });
    } else {
      this.modalService.showError('Помилка', 'Ви не маєте прав на додання предмету');
    }
  }
}
