using System.Collections.Generic;
using Techschool.BLL.Models;

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
