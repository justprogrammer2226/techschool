using System;

namespace Techschool.BLL.Models.Vacations
{
    public class OtherVacationModel : VacationModel
    {
        public string TypeOfVacation { get; set; }
        public DateTime StartOfVacationDate { get; set; }
        public DateTime EndOfVacationDate { get; set; }
        public string OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }
        public string Notes { get; set; }
        public string OtherVacationFormId { get; set; }
    }
}
