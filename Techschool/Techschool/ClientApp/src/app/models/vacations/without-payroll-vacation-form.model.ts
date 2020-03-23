import { WithoutPayrollVacationModel } from './without-payroll-vacation.model';
import { VacationFormModel } from './vacation-form.model';

export class WithoutPayrollVacationFormModel extends VacationFormModel {
  withoutPayrollVacations: WithoutPayrollVacationModel[];
}
