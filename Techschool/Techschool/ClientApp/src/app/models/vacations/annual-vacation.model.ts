import { VacationModel } from './vacation.model';

export class AnnualVacationModel extends VacationModel {
  startOfVacationDate: Date;
  endOfVacationDate: Date;
  orderNumber: string;
  orderDate: Date;
  annualVacationFormId: string;
}
