import { VacationModel } from './vacation.model';

export class WithoutPayrollVacationModel extends VacationModel {
  orderNumber: string;
  orderDate: Date;
  notes: string;

  constructor (data: WithoutPayrollVacationModel = null) {
    super();
    if (data) {
      this.id = data.id;
      this.startOfVacationDate = new Date(data.startOfVacationDate);
      this.endOfVacationDate = new Date(data.endOfVacationDate);
      this.orderNumber = data.orderNumber;
      this.orderDate = new Date(data.orderDate);
      this.notes = data.notes;
      this.workingYearId = data.workingYearId;
    }
  }
}
