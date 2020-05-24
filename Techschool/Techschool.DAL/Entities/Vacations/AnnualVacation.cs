using System;

namespace Techschool.DAL.Entities.Vacations
{
    public class AnnualVacation : Vacation
    {
        public string OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }
    }
}
