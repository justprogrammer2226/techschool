using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Techschool.DAL.Entities.Vacations
{
    public class AnnualVacationForm
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
        public string Title { get; set; }
        public DateTime StartOfWorkingYear { get; set; }
        public DateTime EndOfWorkingYear { get; set; }
        public int Days { get; set; }

        public string PersonalCardId { get; set; }
        public PersonalCard PersonalCard { get; set; }

        public IEnumerable<AnnualVacation> AnnualVacations { get; set; }
    }
}
