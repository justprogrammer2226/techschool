using System;

namespace Techschool.DAL.Entities.Vacations
{
    public class AdditionalStudyVacation : Vacation
    {
        public DateTime StartOfVacationDate { get; set; }
        public DateTime EndOfVacationDate { get; set; }
        public string OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }

        public string AdditionalStudyVacationFormId { get; set; }
        public AdditionalStudyVacationForm AdditionalStudyVacationForm { get; set; }
    }
}
