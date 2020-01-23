using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Techschool.BLL.Models.Vacations
{
    public class AnnualVacationModel
    {
        public string Id { get; set; }
        public DateTime StartVacationDate { get; set; }
        public DateTime EndVacationDate { get; set; }
        public string OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }
        public string PersonalCardId { get; set; }
    }
}
