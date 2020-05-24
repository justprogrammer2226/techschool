import { CycleCommissionModel } from "@models/cycle-commission.model";
import { SubjectModel } from "@models/subject.model";
import { DiplomaModel } from "./diploma.model";
import { WorkingYearModel } from "./vacations/working-year.model";

export enum Sex
{
    Male,
    Female
}

export class PersonalCardModel {
  id: string;
  photo: string;
  name: string;
  surname: string;
  patronymic: string;
  birthday: Date;
  birthdayAddress: string;
  address: string;
  phoneNumber: string;
  email: string;
  sex: Sex;
  education: string;
  languages: string;
  academicDegree: string;
  isEmployee: boolean;
  isTeacher: boolean;
  employmentType: string;
  teacherQualification: string;
  teacherQualificationNote: string;
  totalWorkExperienceOnDate: Date;
  numberOfYearsOfTotalWorkExperience: string;
  numberOfMonthsOfTotalWorkExperience: string;
  teachingWorkExperienceOnDate: Date;
  numberOfYearsOfTeachingWorkExperience: string;
  numberOfMonthsOfTeachingWorkExperience: string;
  CycleCommissionId: string;
  cycleCommission: CycleCommissionModel;
  fireDate: Date;
  hireDate: Date;
  subjects: SubjectModel[];
  diplomas: DiplomaModel[];
  workingYears: WorkingYearModel[];
}
