using Microsoft.AspNetCore.Mvc;
using System;
using Techschool.BLL.Models;
using Techschool.BLL.Services;

namespace Techschool.Api
{
    [ApiController]
    [Route("api/personal-cards")]
    public class PersonalCardController : ControllerBase
    {
        private readonly IPersonalCardService personalCardService;

        public PersonalCardController(IPersonalCardService personalCardService)
        {
            this.personalCardService = personalCardService;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            try
            {
                var personalCards = personalCardService.GetAll();
                return Ok(personalCards);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("{id}")]
        public IActionResult GetById(string id)
        {
            try
            {
                var personalCard = personalCardService.GetById(id);
                return Ok(personalCard);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        public IActionResult Save(PersonalCardModel model)
        {
            try
            {
                personalCardService.Save(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public IActionResult Delete(string id)
        {
            try
            {
                personalCardService.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
