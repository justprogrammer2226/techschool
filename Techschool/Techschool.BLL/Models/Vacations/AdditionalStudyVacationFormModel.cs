using System.Collections.Generic;

namespace Techschool.BLL.Models.Vacations
{
    public class AdditionalStudyVacationFormModel : VacationFormModel
    {
        public string AdditionalInfo { get; set; }
        public IEnumerable<AdditionalStudyVacationModel> AdditionalStudyVacations { get; set; }
    }
}
