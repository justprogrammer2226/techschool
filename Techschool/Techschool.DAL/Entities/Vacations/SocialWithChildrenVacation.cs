using System;

namespace Techschool.DAL.Entities.Vacations
{
    public class SocialWithChildrenVacation : Vacation
    {
        public DateTime StartOfVacationDate { get; set; }
        public DateTime EndOfVacationDate { get; set; }
        public string OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }

        public string SocialWithChildrenVacationFormId { get; set; }
        public SocialWithChildrenVacationForm SocialWithChildrenVacationForm { get; set; }
    }
}
