import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { DisciplineService } from '@services/discipline.service';
import { SubjectModel } from '../../../models/subject.model';
import { Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { map, startWith } from 'rxjs/operators';

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

  constructor(private dialogRef: MatDialogRef<SelectSubjectModalComponent>, private dialog: MatDialog, private disciplineService: DisciplineService) { }

  public ngOnInit(): void {
    this.disciplineService.getSubjects().subscribe(response => {
      this.subjects = response;
      this.filteredOptions = this.myControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this.subjects.filter(option => option.name.toLowerCase().includes(value.toLowerCase())))
        );
    });
  }

  public select(subject: SubjectModel): void {
    this.dialogRef.close({
      selectedSubject: subject
    });
  }
}
