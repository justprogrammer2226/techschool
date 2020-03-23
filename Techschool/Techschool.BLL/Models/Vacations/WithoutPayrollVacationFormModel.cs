using System.Collections.Generic;

namespace Techschool.BLL.Models.Vacations
{
    public class WithoutPayrollVacationFormModel : VacationFormModel
    {
        public IEnumerable<WithoutPayrollVacationModel> WithoutPayrollVacations { get; set; }
    }
}
