import { AdditionalStudyVacationModel } from './additional-study-vacation.model';
import { AnnualVacationModel } from './annual-vacation.model';
import { OtherVacationModel } from './other-vacation.model';
import { SocialWithChildrenVacationModel } from './social-with-children-vacation.model';
import { SocialWithPregnancyOrLookVacationModel } from './social-with-pregnancy-or-look-vacation.model';
import { WithoutPayrollVacationModel } from './without-payroll-vacation.model';

export class WorkingYearModel {
  id: string;
  startOfWorkingYear: Date;
  endOfWorkingYear: Date;
  personalCardId: string;
  
  additionalStudyVacationAdditionalInfo: string;
  annualVacationDays: number;
  socialWithChildrenVacationChildAge: number;
  socialWithChildrenVacationDays: number;

  additionalStudyVacations: AdditionalStudyVacationModel[];
  annualVacations: AnnualVacationModel[];
  otherVacations: OtherVacationModel[];
  socialWithChildrenVacations: SocialWithChildrenVacationModel[];
  socialWithPregnancyOrLookVacations: SocialWithPregnancyOrLookVacationModel[];
  withoutPayrollVacations: WithoutPayrollVacationModel[];

  constructor (data: WorkingYearModel = null) {
    if (data) {
      this.id = data.id;
      this.personalCardId = data.personalCardId;
      this.startOfWorkingYear = new Date(data.startOfWorkingYear);
      this.endOfWorkingYear = new Date(data.endOfWorkingYear);
      this.additionalStudyVacationAdditionalInfo = data.additionalStudyVacationAdditionalInfo;
      this.annualVacationDays = data.annualVacationDays;
      this.socialWithChildrenVacationChildAge = data.socialWithChildrenVacationChildAge;
      this.socialWithChildrenVacationDays = data.socialWithChildrenVacationDays;
      this.additionalStudyVacations = data.additionalStudyVacations.map(_ => {
        return new AdditionalStudyVacationModel(_);
      });
      this.annualVacations = data.annualVacations.map(_ => {
        return new AnnualVacationModel(_);
      });
      this.otherVacations = data.otherVacations.map(_ => {
        return new OtherVacationModel(_);
      });
      this.socialWithChildrenVacations = data.socialWithChildrenVacations.map(_ => {
        return new SocialWithChildrenVacationModel(_);
      });
      this.socialWithPregnancyOrLookVacations = data.socialWithPregnancyOrLookVacations.map(_ => {
        return new SocialWithPregnancyOrLookVacationModel(_);
      });
      this.withoutPayrollVacations = data.withoutPayrollVacations.map(_ => {
        return new WithoutPayrollVacationModel(_);
      });
    }
  }
}
