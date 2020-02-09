import { AnnualVacationModel } from './annual-vacation.model';

export class AnnualVacationFormModel {
  id: string;
  title: string;
  startOfWorkingYear: Date;
  endOfWorkingYear: Date;
  days: number;
  annualVacations: AnnualVacationModel[];
  personalCardId: string;
}
