import { VacationModel } from './vacation.model';

export class SocialWithChildrenVacationModel extends VacationModel {
  orderNumber: string;
  orderDate: Date;

  constructor (data: SocialWithChildrenVacationModel = null) {
    super();
    if (data) {
      this.id = data.id;
      this.startOfVacationDate = new Date(data.startOfVacationDate);
      this.endOfVacationDate = new Date(data.endOfVacationDate);
      this.orderNumber = data.orderNumber;
      this.orderDate = new Date(data.orderDate);
      this.workingYearId = data.workingYearId;
    }
  }
}
