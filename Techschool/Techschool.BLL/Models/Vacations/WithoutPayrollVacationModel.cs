using System;

namespace Techschool.BLL.Models.Vacations
{
    public class WithoutPayrollVacationModel : VacationModel
    {
        public string OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }
        public string Notes { get; set; }
    }
}
