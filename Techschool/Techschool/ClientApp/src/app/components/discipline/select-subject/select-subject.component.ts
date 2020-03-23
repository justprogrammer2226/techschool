import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DisciplineService } from '@services/discipline.service';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { SubjectModel } from '../../../models/subject.model';

@Component({
  selector: 'app-select-subject',
  templateUrl: './select-subject.component.html',
  styleUrls: [
    './select-subject.component.css'
  ]
})
export class SelectSubjectComponent implements OnInit {

  private subjects: SubjectModel[] = [];

  public myControl = new FormControl();
  public filteredOptions: Observable<SubjectModel[]>;

  @Output() selectSubject = new EventEmitter<SubjectModel>();

  constructor(
    private disciplineService: DisciplineService,
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
              return option.name.toLowerCase().includes(value.toLowerCase());
            });
          })
        );
    });
  }

  public select(subject: SubjectModel): void {
    this.selectSubject.emit(subject);
  }
}
