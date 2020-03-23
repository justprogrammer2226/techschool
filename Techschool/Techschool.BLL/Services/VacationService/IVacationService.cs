using System.Collections.Generic;
using Techschool.BLL.Models.Vacations;

namespace Techschool.BLL.Services
{
    public interface IVacationService
    {
        IEnumerable<AnnualVacationFormModel> GetAnnualVacationFormsByPersonalCardId(string id);
        AnnualVacationFormModel GetAnnualVacationForm(string personalCardId, string formId);
        void SaveAnnualVacationForm(AnnualVacationFormModel model);
        void SaveAnnualVacation(AnnualVacationModel model);
        void DeleteAnnualVacation(string id);

        IEnumerable<WithoutPayrollVacationFormModel> GetWithoutPayrollVacationFormsByPersonalCardId(string id);
        WithoutPayrollVacationFormModel GetWithoutPayrollVacationForm(string personalCardId, string formId);
        void SaveWithoutPayrollVacationForm(WithoutPayrollVacationFormModel model);
        void SaveWithoutPayrollVacation(WithoutPayrollVacationModel model);
        void DeleteWithoutPayrollVacation(string id);

        IEnumerable<AdditionalStudyVacationFormModel> GetAdditionalStudyVacationFormsByPersonalCardId(string id);
        AdditionalStudyVacationFormModel GetAdditionalStudyVacationForm(string personalCardId, string formId);
        void SaveAdditionalStudyVacationForm(AdditionalStudyVacationFormModel model);
        void SaveAdditionalStudyVacation(AdditionalStudyVacationModel model);
        void DeleteAdditionalStudyVacation(string id);

        IEnumerable<SocialWithChildrenVacationFormModel> GetSocialWithChildrenVacationFormsByPersonalCardId(string id);
        SocialWithChildrenVacationFormModel GetSocialWithChildrenVacationForm(string personalCardId, string formId);
        void SaveSocialWithChildrenVacationForm(SocialWithChildrenVacationFormModel model);
        void SaveSocialWithChildrenVacation(SocialWithChildrenVacationModel model);
        void DeleteSocialWithChildrenVacation(string id);

        IEnumerable<SocialWithPregnancyOrLookVacationFormModel> GetSocialWithPregnancyOrLookVacationFormsByPersonalCardId(string id);
        SocialWithPregnancyOrLookVacationFormModel GetSocialWithPregnancyOrLookVacationForm(string personalCardId, string formId);
        void SaveSocialWithPregnancyOrLookVacationForm(SocialWithPregnancyOrLookVacationFormModel model);
        void SaveSocialWithPregnancyOrLookVacation(SocialWithPregnancyOrLookVacationModel model);
        void DeleteSocialWithPregnancyOrLookVacation(string id);

        IEnumerable<OtherVacationFormModel> GetOtherVacationFormsByPersonalCardId(string id);
        OtherVacationFormModel GetOtherVacationForm(string personalCardId, string formId);
        void SaveOtherVacationForm(OtherVacationFormModel model);
        void SaveOtherVacation(OtherVacationModel model);
        void DeleteOtherVacation(string id);
    }
}
