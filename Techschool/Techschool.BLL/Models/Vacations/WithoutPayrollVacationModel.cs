using System;

namespace Techschool.BLL.Models.Vacations
{
    public class WithoutPayrollVacationModel : VacationModel
    {
        public DateTime StartOfVacationDate { get; set; }
        public DateTime EndOfVacationDate { get; set; }
        public string OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }
        public string Notes { get; set; }
        public string WithoutPayrollVacationFormId { get; set; }
    }
}
