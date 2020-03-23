using System;
using System.Collections.Generic;

namespace Techschool.BLL.Models.Vacations
{
    public class SocialWithPregnancyOrLookVacationFormModel : VacationFormModel
    {
        public IEnumerable<SocialWithPregnancyOrLookVacationModel> SocialWithPregnancyOrLookVacations { get; set; }
    }
}
