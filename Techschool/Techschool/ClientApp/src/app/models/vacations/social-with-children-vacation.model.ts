import { VacationModel } from './vacation.model';

export class SocialWithChildrenVacationModel extends VacationModel {
  startOfVacationDate: Date;
  endOfVacationDate: Date;
  orderNumber: string;
  orderDate: Date;
  socialWithChildrenVacationFormId: string;
}
