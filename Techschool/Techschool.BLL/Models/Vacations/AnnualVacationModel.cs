using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Techschool.BLL.Models.Vacations
{
    public class AnnualVacationModel : VacationModel
    {
        public string OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }
    }
}
