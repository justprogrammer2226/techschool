using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Techschool.DAL.Entities.Vacations
{
    public class Vacation
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }

        public DateTime StartOfVacationDate { get; set; }
        public DateTime EndOfVacationDate { get; set; }

        public string WorkingYearId { get; set; }
        public WorkingYear WorkingYear { get; set; }
    }
}
