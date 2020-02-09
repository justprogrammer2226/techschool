using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Techschool.BLL.Models.Vacations
{
    public class AnnualVacationFormModel
    {
        public string Id { get; set; }
        public string Title { get; set; }
        public DateTime StartOfWorkingYear { get; set; }
        public DateTime EndOfWorkingYear { get; set; }
        public int Days { get; set; }
        public string PersonalCardId { get; set; }
        public IEnumerable<AnnualVacationModel> AnnualVacations { get; set; }
    }
}
