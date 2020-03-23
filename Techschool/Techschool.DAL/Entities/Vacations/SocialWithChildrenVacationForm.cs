using System.Collections.Generic;

namespace Techschool.DAL.Entities.Vacations
{
    public class SocialWithChildrenVacationForm : VacationForm
    {
        public int ChildAge { get; set; }
        public int Days { get; set; }

        public IEnumerable<SocialWithChildrenVacation> SocialWithChildrenVacations { get; set; }
    }
}
