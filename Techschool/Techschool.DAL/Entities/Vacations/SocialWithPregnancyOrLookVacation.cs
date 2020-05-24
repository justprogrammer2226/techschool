using System;

namespace Techschool.DAL.Entities.Vacations
{
    public class SocialWithPregnancyOrLookVacation : Vacation
    {
        public string TypeOfVacation { get; set; }
        public string OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }
    }
}
