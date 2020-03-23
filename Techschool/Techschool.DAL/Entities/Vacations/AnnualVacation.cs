using System;

namespace Techschool.DAL.Entities.Vacations
{
    public class AnnualVacation : Vacation
    {
        public DateTime StartOfVacationDate { get; set; }
        public DateTime EndOfVacationDate { get; set; }
        public string OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }

        public string AnnualVacationFormId { get; set; }
        public AnnualVacationForm AnnualVacationForm { get; set; }
    }
}
