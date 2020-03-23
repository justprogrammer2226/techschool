using System.Collections.Generic;

namespace Techschool.DAL.Entities.Vacations
{
    public class OtherVacationForm : VacationForm
    {
        public IEnumerable<OtherVacation> OtherVacations { get; set; }
    }
}
