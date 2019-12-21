import { CycleCommissionModel } from "@models/cycle-commission.model";
import { SubjectModel } from "@models/subject.model";
import { DiplomaModel } from "./diploma.model";

export class PersonalCardModel {
  id: string;
  name: string;
  surname: string;
  patronymic: string;
  birthday: Date;
  address: string;
  phoneNumber: string;
  email: string;
  photo: string;
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
  cycleCommission: CycleCommissionModel;
  subjects: SubjectModel[];
  diplomas: DiplomaModel[];
}
