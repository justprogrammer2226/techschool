using System;
using System.Collections.Generic;

namespace Techschool.BLL.Models.Vacations
{
    public class AnnualVacationFormModel : VacationFormModel
    {
        public DateTime StartOfWorkingYear { get; set; }
        public DateTime EndOfWorkingYear { get; set; }
        public int Days { get; set; }
        public IEnumerable<AnnualVacationModel> AnnualVacations { get; set; }
    }
}
