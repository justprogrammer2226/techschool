using System.Collections.Generic;

namespace Techschool.BLL.Models.Vacations
{
    public class OtherVacationFormModel : VacationFormModel
    {
        public IEnumerable<OtherVacationModel> OtherVacations { get; set; }
    }
}
