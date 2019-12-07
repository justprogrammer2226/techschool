using Microsoft.AspNetCore.Identity;

namespace Techschool.DAL.Entities
{
    public class User : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}
