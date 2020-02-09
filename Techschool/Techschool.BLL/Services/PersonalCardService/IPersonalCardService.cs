using System.Collections.Generic;
using Techschool.BLL.Models;
using Techschool.BLL.Models.Vacations;

namespace Techschool.BLL.Services
{
    public interface IPersonalCardService
    {
        IEnumerable<PersonalCardModel> GetAll();
        PersonalCardModel GetById(string id);
        void Save(PersonalCardModel model);
        void Delete(string id);

        IEnumerable<AnnualVacationModel> GetAnnualVacationsByPersonalCardId(string id);
        IEnumerable<AnnualVacationFormModel> GetAnnualVacationFormsByPersonalCardId(string id);
        AnnualVacationFormModel GetAnnualVacationForm(string personalCardId, string formId);
        void SaveAnnualVacationForm(AnnualVacationFormModel model);

        void SaveAnnualVacation(AnnualVacationModel model);
        void DeleteAnnualVacation(string id);
    }
}
