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
    }
}
