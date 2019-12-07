using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Techschool.BLL.Models;
using Techschool.DAL;
using Techschool.DAL.Entities;

namespace Techschool.BLL.Services
{
    public class AuthService : IAuthService
    {
        private readonly TechschoolContext context;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IModelMapper modelMapper;

        public AuthService(UserManager<User> userManager, SignInManager<User> signInManager, TechschoolContext context, RoleManager<IdentityRole> roleManager, IModelMapper modelMapper)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.context = context;
            this.roleManager = roleManager;
            this.modelMapper = modelMapper;
        }

        public IEnumerable<RegistrationRequestModel> GetAllRequests()
        {
            // We don't pass password!
            var requests = context.RegistrationRequests.AsNoTracking()
                .Include(_ =>_.Role)
                .Select(_ => modelMapper.MapTo<RegistrationRequest, RegistrationRequestModel>(_))
                .ToList();
            return requests;
        }

        public void CreateRequest(RegistrationRequestModel model)
        {
            var registrationRequest = modelMapper.MapTo<RegistrationRequestModel, RegistrationRequest>(model);
            context.RegistrationRequests.Add(registrationRequest);
            context.SaveChanges();
        }

        public void ConfirmRequest(string email)
        {
            RegistrationRequest registrationRequest = context.RegistrationRequests.Where(_ => _.Email == email).Include(_ => _.Role).Single();
            User user = new User
            {
                FirstName = registrationRequest.FirstName,
                LastName = registrationRequest.LastName,
                Email = registrationRequest.Email,
                UserName = registrationRequest.Email
            };

            var result = userManager.CreateAsync(user, registrationRequest.Password).Result;
            if (result.Succeeded)
            {
                context.RegistrationRequests.Remove(registrationRequest);
                var aspUser = userManager.FindByNameAsync(user.UserName).GetAwaiter().GetResult();
                userManager.AddToRolesAsync(aspUser, new[] { registrationRequest.Role.Name }).Result.ToString();
                // Send email in future
            }

            context.SaveChanges();
        }

        public void CancelRequest(string email)
        {
            RegistrationRequest registrationRequest = context.RegistrationRequests.Where(_ => _.Email == email).Include(_ => _.Role).Single();
            context.RegistrationRequests.Remove(registrationRequest);
            context.SaveChanges();
        }

        public async Task<string> Login(LoginModel model)
        {
            var user = await userManager.FindByEmailAsync(model.Email);
            if (user == null)
            {
                throw new Exception($"User with email {model.Email} does not exist.");
            }

            var result = await signInManager.CheckPasswordSignInAsync(user, model.Password, false);
            if (result.Succeeded)
            {
                return await GenerateJwtTokenAsync(user);
            }
            else
            {
                throw new Exception($"Incorrect password.");
            }
        }

        private async Task<string> GenerateJwtTokenAsync(User user)
        {
            var claims = new List<Claim>
            {
                new Claim("userId", user.Id),
                new Claim("firstName", user.FirstName),
                new Claim("lastName", user.LastName)
            };
            var roles = await userManager.GetRolesAsync(user);
            claims.AddRange(roles.Select(role => new Claim("roles", role)));
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                claims: claims,
                signingCredentials: signinCredentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
