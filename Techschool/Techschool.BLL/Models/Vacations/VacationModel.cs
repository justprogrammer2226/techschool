using System;

namespace Techschool.BLL.Models.Vacations
{
    public class VacationModel
    {
        public string Id { get; set; }
        public DateTime StartOfVacationDate { get; set; }
        public DateTime EndOfVacationDate { get; set; }
        public string WorkingYearId { get; set; }
    }
}
