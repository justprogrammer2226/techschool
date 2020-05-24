using System;

namespace Techschool.DAL.Entities.Vacations
{
    public class WithoutPayrollVacation : Vacation
    {
        public string OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }
        public string Notes { get; set; }
    }
}
