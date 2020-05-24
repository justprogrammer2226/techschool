using System.Collections.Generic;
using Techschool.BLL.Models.Vacations;

namespace Techschool.BLL.Services
{
    public interface IVacationService
    {
        void SaveWorkingYear(WorkingYearModel model);
        void DeleteWorkingYear(string id);

        void SaveAnnualVacation(AnnualVacationModel model);
        void DeleteAnnualVacation(string id);

        void SaveWithoutPayrollVacation(WithoutPayrollVacationModel model);
        void DeleteWithoutPayrollVacation(string id);

        void SaveAdditionalStudyVacation(AdditionalStudyVacationModel model);
        void DeleteAdditionalStudyVacation(string id);

        void SaveSocialWithChildrenVacation(SocialWithChildrenVacationModel model);
        void DeleteSocialWithChildrenVacation(string id);

        void SaveSocialWithPregnancyOrLookVacation(SocialWithPregnancyOrLookVacationModel model);
        void DeleteSocialWithPregnancyOrLookVacation(string id);

        void SaveOtherVacation(OtherVacationModel model);
        void DeleteOtherVacation(string id);
    }
}
