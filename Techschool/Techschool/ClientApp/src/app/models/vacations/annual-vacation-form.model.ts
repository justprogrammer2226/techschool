import { AnnualVacationModel } from './annual-vacation.model';
import { VacationFormModel } from './vacation-form.model';

export class AnnualVacationFormModel extends VacationFormModel {
  startOfWorkingYear: Date;
  endOfWorkingYear: Date;
  days: number;
  annualVacations: AnnualVacationModel[];
}
