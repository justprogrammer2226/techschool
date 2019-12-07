using System;
using System.Collections.Generic;
using System.Text;

namespace Techschool.BLL.Models
{
    public class RegistrationRequestModel
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
    }
}
