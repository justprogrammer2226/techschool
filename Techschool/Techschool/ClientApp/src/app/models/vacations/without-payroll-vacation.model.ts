import { VacationModel } from './vacation.model';

export class WithoutPayrollVacationModel extends VacationModel {
  startOfVacationDate: Date;
  endOfVacationDate: Date;
  orderNumber: string;
  orderDate: Date;
  notes: string;
  withoutPayrollVacationFormId: string;
}
