using Microsoft.AspNetCore.Identity;
using System;
using System.Linq;
using System.Threading.Tasks;
using Techschool.DAL.Entities;

namespace Techschool.DAL
{
    public static class DBSeeder
    {
        public static async Task Seed(RoleManager<IdentityRole> roleManager, UserManager<User> userManager, TechschoolContext context)
        {
            // Seeds roles
            string[] roles = new string[] { "Administrator", "Methodist" };
            foreach (string role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }
            }

            // Seeds admin user
            var user = new User
            {
                FirstName = "Admin",
                LastName = "Admin",
                UserName = "test@test.com",
                Email = "test@test.com"
            };

            var userExists = await userManager.FindByEmailAsync(user.Email);
            if (userExists == null)
            {
                var result = await userManager.CreateAsync(user, "test");
                if (result.Succeeded)
                {
                    var createdUser = await userManager.FindByEmailAsync(user.Email);
                    await userManager.AddToRoleAsync(createdUser, "Administrator");
                }
            }

            // Seeds employment types
            if (!context.EmploymentTypes.Any())
            {
                context.EmploymentTypes.AddRange(new[]
                {
                    new EmploymentType() { Name = "Сумісник"},
                    new EmploymentType() { Name = "Штатний"},
                    new EmploymentType() { Name = "Контракт"}
                });
                context.SaveChanges();
            }
        }
    }
}
