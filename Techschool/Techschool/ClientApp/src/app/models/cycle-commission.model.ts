import { SubjectModel } from "./subject.model";

export class CycleCommissionModel {
  id: string;
  name: string;
  subjects: SubjectModel[];
}
