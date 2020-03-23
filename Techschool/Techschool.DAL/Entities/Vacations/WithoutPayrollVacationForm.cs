using System.Collections.Generic;

namespace Techschool.DAL.Entities.Vacations
{
    public class WithoutPayrollVacationForm : VacationForm
    {
        public IEnumerable<WithoutPayrollVacation> WithoutPayrollVacations { get; set; }
    }
}
