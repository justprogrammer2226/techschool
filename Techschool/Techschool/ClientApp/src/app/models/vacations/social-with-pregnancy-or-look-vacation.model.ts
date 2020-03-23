import { VacationModel } from './vacation.model';

export class SocialWithPregnancyOrLookVacationModel extends VacationModel {
  typeOfVacation: string;
  startOfVacationDate: Date;
  endOfVacationDate: Date;
  orderNumber: string;
  orderDate: Date;
  socialWithPregnancyOrLookVacationFormId: string;
}

