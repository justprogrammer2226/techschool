import { VacationModel } from './vacation.model';

export class OtherVacationModel extends VacationModel {
  typeOfVacation: string;
  startOfVacationDate: Date;
  endOfVacationDate: Date;
  orderNumber: string;
  orderDate: Date;
  notes: string;
  otherVacationFormId: string;
}
