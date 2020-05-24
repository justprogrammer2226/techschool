using System;

namespace Techschool.BLL.Models.Vacations
{
    public class AdditionalStudyVacationModel : VacationModel
    {
        public string OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }
    }
}
