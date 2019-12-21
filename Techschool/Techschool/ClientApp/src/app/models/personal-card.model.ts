import { CycleCommissionModel } from "@models/cycle-commission.model";
import { SubjectModel } from "@models/subject.model";

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
  cycleCommission: CycleCommissionModel;
  subjects: SubjectModel[];
}
