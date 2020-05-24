import { VacationModel } from './vacation.model';

export class OtherVacationModel extends VacationModel {
  typeOfVacation: string;
  orderNumber: string;
  orderDate: Date;
  notes: string;

  constructor (data: OtherVacationModel = null) {
    super();
    if (data) {
      this.id = data.id;
      this.typeOfVacation = data.typeOfVacation;
      this.startOfVacationDate = new Date(data.startOfVacationDate);
      this.endOfVacationDate = new Date(data.endOfVacationDate);
      this.orderNumber = data.orderNumber;
      this.orderDate = new Date(data.orderDate);
      this.notes = data.notes;
      this.workingYearId = data.workingYearId;
    }
  }
}
