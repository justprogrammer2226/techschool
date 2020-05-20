using Microsoft.AspNetCore.Mvc;
using System;
using Techschool.BLL.Models;
using Techschool.BLL.Models.Filters;
using Techschool.BLL.Services;

namespace Techschool.Api
{
    [ApiController]
    [Route("api/personal-cards")]
    public class PersonalCardController : ControllerBase
    {
        private readonly IPersonalCardService PersonalCardService;

        public PersonalCardController(IPersonalCardService personalCardService)
        {
            PersonalCardService = personalCardService;
        }

        [HttpPost("filter")]
        public IActionResult GetAll(FilterPersonalCards filter)
        {
            try
            {
                var personalCards = PersonalCardService.GetAll(filter);
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
                var personalCard = PersonalCardService.GetById(id);
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
                PersonalCardService.Save(model);
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
                PersonalCardService.Delete(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("canSaveDiploma")]
        public IActionResult HasDiplomaExistingNumber(DiplomaModel model)
        {
            var result = PersonalCardService.CanSaveDiploma(model);
            if (result.Successed)
            {
                return Ok(result);
            }
            else
            {
                return BadRequest(result);
            }
        }
    }
}
