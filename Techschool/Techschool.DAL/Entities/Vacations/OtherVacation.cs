using System;

namespace Techschool.DAL.Entities.Vacations
{
    public class OtherVacation : Vacation
    {
        public string TypeOfVacation { get; set; }
        public DateTime StartOfVacationDate { get; set; }
        public DateTime EndOfVacationDate { get; set; }
        public string OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }
        public string Notes { get; set; }

        public string OtherVacationFormId { get; set; }
        public OtherVacationForm OtherVacationForm { get; set; }
    }
}
