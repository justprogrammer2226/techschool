using System.Collections.Generic;

namespace Techschool.DAL.Entities.Vacations
{
    public class AdditionalStudyVacationForm : VacationForm
    {
        public string AdditionalInfo { get; set; }

        public IEnumerable<AdditionalStudyVacation> AdditionalStudyVacations { get; set; }
    }
}
