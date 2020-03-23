using System;

namespace Techschool.DAL.Entities.Vacations
{
    public class SocialWithPregnancyOrLookVacation : Vacation
    {
        public string TypeOfVacation { get; set; }
        public DateTime StartOfVacationDate { get; set; }
        public DateTime EndOfVacationDate { get; set; }
        public string OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }

        public string SocialWithPregnancyOrLookVacationFormId { get; set; }
        public SocialWithPregnancyOrLookVacationForm SocialWithPregnancyOrLookVacationForm { get; set; }
    }
}
