using System.Collections.Generic;
using System.Threading.Tasks;
using Techschool.BLL.Models;

namespace Techschool.BLL.Services
{
    public interface IAuthService
    {
        IEnumerable<RegistrationRequestModel> GetAllRequests();
        void CreateRequest(RegistrationRequestModel model);
        void ConfirmRequest(string email);
        void CancelRequest(string email);
        Task<string> Login(LoginModel model);
    }
}
