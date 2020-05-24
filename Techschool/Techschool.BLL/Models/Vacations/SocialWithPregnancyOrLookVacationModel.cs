using System;

namespace Techschool.BLL.Models.Vacations
{
    public class SocialWithPregnancyOrLookVacationModel : VacationModel
    {
        public string TypeOfVacation { get; set; }
        public string OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }
    }
}
