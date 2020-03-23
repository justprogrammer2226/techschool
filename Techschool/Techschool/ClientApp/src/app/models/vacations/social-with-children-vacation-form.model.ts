import { VacationFormModel } from './vacation-form.model';
import { SocialWithChildrenVacationModel } from './social-with-children-vacation.model';

export class SocialWithChildrenVacationFormModel extends VacationFormModel {
  childAge: number;
  days: number;
  socialWithChildrenVacations: SocialWithChildrenVacationModel[];
}
