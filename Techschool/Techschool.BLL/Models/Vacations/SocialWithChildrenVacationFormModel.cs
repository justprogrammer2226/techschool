using System.Collections.Generic;

namespace Techschool.BLL.Models.Vacations
{
    public class SocialWithChildrenVacationFormModel : VacationFormModel
    {
        public int ChildAge { get; set; }
        public int Days { get; set; }
        public IEnumerable<SocialWithChildrenVacationModel> SocialWithChildrenVacations { get; set; }
    }
}
