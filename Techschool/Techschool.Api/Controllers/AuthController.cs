using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using Techschool.BLL.Models;
using Techschool.BLL.Services;

namespace Techschool.Api
{
    [ApiController]
    [Route("api/auth")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService authService;

        public AuthController(IAuthService authService)
        {
            this.authService = authService;
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(LoginModel model)
        {
            try
            {
                string token = await authService.Login(model);
                return Ok(new { Token = token });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("create-request")]
        public IActionResult CreateRequest(RegistrationRequestModel model)
        {
            try
            {
                authService.CreateRequest(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Authorize(Roles = "Administrator")]
        [Route("confirm-request/{email}")]
        public IActionResult ConfirmRequest(string email)
        {
            try
            {
                authService.ConfirmRequest(email);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Authorize(Roles = "Administrator")]
        [Route("cancel-request/{email}")]
        public IActionResult CancelRequest(string email)
        {
            try
            {
                authService.CancelRequest(email);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Authorize(Roles = "Administrator")]
        [Route("requests")]
        public IActionResult Requests()
        {
            try
            {
                var model = authService.GetAllRequests();
                return Ok(model);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
