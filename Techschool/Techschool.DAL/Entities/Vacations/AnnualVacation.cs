using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Techschool.DAL.Entities.Vacations
{
    public class AnnualVacation
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
        public DateTime StartOfVacationDate { get; set; }
        public DateTime EndOfVacationDate { get; set; }
        public string OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }

        public string AnnualVacationFormId { get; set; }
        public AnnualVacationForm AnnualVacationForm { get; set; }
    }
}
