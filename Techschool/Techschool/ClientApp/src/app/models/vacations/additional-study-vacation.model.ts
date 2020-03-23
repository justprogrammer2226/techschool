import { VacationModel } from './vacation.model';

export class AdditionalStudyVacationModel extends VacationModel {
  startOfVacationDate: Date;
  endOfVacationDate: Date;
  orderNumber: string;
  orderDate: Date;
  additionalStudyVacationFormId: string;
}
