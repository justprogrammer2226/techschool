import { CycleCommissionModel } from '@models/cycle-commission.model';

export enum MathOperators {
  Equal,
  Less,
  LessOrEqual,
  Greater,
  GreaterOrEqual
}

export enum Order {
  Random,
  Asc,
  Desc,
}

export class FilterPersonalCards {
  nameContains: string;
  surnameContains: string;
  patronymicContains: string;
  employmentType: string;
  cycleCommission: CycleCommissionModel;
  totalWorkExperience: string;
  totalWorkExperienceOperator: MathOperators;
  teachingWorkExperience: string;
  teachingWorkExperienceOperator: MathOperators;
  nameOrderBy: Order = Order.Random;
  surnameOrderBy: Order = Order.Random;
  patronymicOrderBy: Order = Order.Random;
}
