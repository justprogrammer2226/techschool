import { AdditionalStudyVacationModel } from './additional-study-vacation.model';
import { VacationFormModel } from './vacation-form.model';

export class AdditionalStudyVacationFormModel extends VacationFormModel {
  additionalInfo: string;
  additionalStudyVacations: AdditionalStudyVacationModel[];
}
