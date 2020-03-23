using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Techschool.DAL.Entities.Vacations
{
    public class AnnualVacationForm : VacationForm
    {
        public DateTime StartOfWorkingYear { get; set; }
        public DateTime EndOfWorkingYear { get; set; }
        public int Days { get; set; }

        public IEnumerable<AnnualVacation> AnnualVacations { get; set; }
    }
}
