using System.Collections.Generic;
using Techschool.BLL.Models;
using Techschool.BLL.Models.Filters;
using Techschool.BLL.Models.Vacations;

namespace Techschool.BLL.Services
{
    public interface IPersonalCardService
    {
        IEnumerable<PersonalCardModel> GetAll(FilterPersonalCards filter);
        PersonalCardModel GetById(string id);
        void Save(PersonalCardModel model);
        void Delete(string id);

        DiplomaSavingResult CanSaveDiploma(DiplomaModel model);
    }
}
