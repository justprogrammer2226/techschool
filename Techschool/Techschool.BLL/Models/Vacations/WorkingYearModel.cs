using System;
using System.Collections.Generic;

namespace Techschool.BLL.Models.Vacations
{
    public sealed class WorkingYearModel
    {
        public string Id { get; set; }

        public DateTime StartOfWorkingYear { get; set; }
        public DateTime EndOfWorkingYear { get; set; }

        public string PersonalCardId { get; set; }

        public string AdditionalStudyVacationAdditionalInfo { get; set; }
        public int AnnualVacationDays { get; set; }
        public int SocialWithChildrenVacationChildAge { get; set; }
        public int SocialWithChildrenVacationDays { get; set; }

        public IEnumerable<AdditionalStudyVacationModel> AdditionalStudyVacations { get; set; }
        public IEnumerable<AnnualVacationModel> AnnualVacations { get; set; }
        public IEnumerable<OtherVacationModel> OtherVacations { get; set; }
        public IEnumerable<SocialWithChildrenVacationModel> SocialWithChildrenVacations { get; set; }
        public IEnumerable<SocialWithPregnancyOrLookVacationModel> SocialWithPregnancyOrLookVacations { get; set; }
        public IEnumerable<WithoutPayrollVacationModel> WithoutPayrollVacations { get; set; }
    }
}
