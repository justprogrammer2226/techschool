using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Techschool.DAL.Entities.Vacations
{
    public sealed class WorkingYear
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }

        public DateTime StartOfWorkingYear { get; set; }
        public DateTime EndOfWorkingYear { get; set; }

        public string PersonalCardId { get; set; }
        public PersonalCard PersonalCard { get; set; }

        public string AdditionalStudyVacationAdditionalInfo { get; set; }
        public int AnnualVacationDays { get; set; }
        public int SocialWithChildrenVacationChildAge { get; set; }
        public int SocialWithChildrenVacationDays { get; set; }

        public IEnumerable<AdditionalStudyVacation> AdditionalStudyVacations { get; set; }
        public IEnumerable<AnnualVacation> AnnualVacations { get; set; }
        public IEnumerable<OtherVacation> OtherVacations { get; set; }
        public IEnumerable<SocialWithChildrenVacation> SocialWithChildrenVacations { get; set; }
        public IEnumerable<SocialWithPregnancyOrLookVacation> SocialWithPregnancyOrLookVacations { get; set; }
        public IEnumerable<WithoutPayrollVacation> WithoutPayrollVacations { get; set; }
    }
}
