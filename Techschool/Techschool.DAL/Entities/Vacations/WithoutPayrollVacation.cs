using System;

namespace Techschool.DAL.Entities.Vacations
{
    public class WithoutPayrollVacation : Vacation
    {
        public DateTime StartOfVacationDate { get; set; }
        public DateTime EndOfVacationDate { get; set; }
        public string OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }
        public string Notes { get; set; }

        public string WithoutPayrollVacationFormId { get; set; }
        public WithoutPayrollVacationForm WithoutPayrollVacationForm { get; set; }
    }
}
