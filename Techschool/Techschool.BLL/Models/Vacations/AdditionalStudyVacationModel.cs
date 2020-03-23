using System;

namespace Techschool.BLL.Models.Vacations
{
    public class AdditionalStudyVacationModel : VacationModel
    {
        public DateTime StartOfVacationDate { get; set; }
        public DateTime EndOfVacationDate { get; set; }
        public string OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }
        public string AdditionalStudyVacationFormId { get; set; }
    }
}
