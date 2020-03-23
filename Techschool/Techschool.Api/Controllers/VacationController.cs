using Microsoft.AspNetCore.Mvc;
using System;
using Techschool.BLL.Models;
using Techschool.BLL.Models.Vacations;
using Techschool.BLL.Services;

namespace Techschool.Api
{
    [ApiController]
    [Route("api/vacations")]
    public class VacationController : ControllerBase
    {
        private readonly IVacationService VacationService;

        public VacationController(IVacationService vacationService)
        {
            VacationService = vacationService;
        }

        #region Annual Vacation

        [HttpGet]
        [Route("annual-vacation-forms/{personalCardId}")]
        public IActionResult GetAnnualVacationFormsByPersonalCardId(string personalCardId)
        {
            try
            {
                var forms = VacationService.GetAnnualVacationFormsByPersonalCardId(personalCardId);
                return Ok(forms);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("annual-vacation-forms/{personalCardId}/{formId}")]
        public IActionResult GetAnnualVacationForm(string personalCardId, string formId)
        {
            try
            {
                var form = VacationService.GetAnnualVacationForm(personalCardId, formId);
                return Ok(form);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("annual-vacation-forms")]
        public IActionResult SaveAnnualVacationForm(AnnualVacationFormModel model)
        {
            try
            {
                VacationService.SaveAnnualVacationForm(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("annual-vacations")]
        public IActionResult SaveAnnualVacation(AnnualVacationModel model)
        {
            try
            {
                VacationService.SaveAnnualVacation(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("annual-vacations/{id}")]
        public IActionResult DeleteAnnualVacation(string id)
        {
            try
            {
                VacationService.DeleteAnnualVacation(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion

        #region Without Payroll Vacation

        [HttpGet]
        [Route("without-payroll-vacation-forms/{personalCardId}")]
        public IActionResult GetWithoutPayrollVacationFormsByPersonalCardId(string personalCardId)
        {
            try
            {
                var forms = VacationService.GetWithoutPayrollVacationFormsByPersonalCardId(personalCardId);
                return Ok(forms);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("without-payroll-vacation-forms/{personalCardId}/{formId}")]
        public IActionResult GetWithoutPayrollVacationForm(string personalCardId, string formId)
        {
            try
            {
                var form = VacationService.GetWithoutPayrollVacationForm(personalCardId, formId);
                return Ok(form);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("without-payroll-vacation-forms")]
        public IActionResult SaveWithoutPayrollVacationForm(WithoutPayrollVacationFormModel model)
        {
            try
            {
                VacationService.SaveWithoutPayrollVacationForm(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("without-payroll-vacations")]
        public IActionResult SaveWithoutPayrollVacation(WithoutPayrollVacationModel model)
        {
            try
            {
                VacationService.SaveWithoutPayrollVacation(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("without-payroll-vacations/{id}")]
        public IActionResult DeleteWithoutPayrollVacation(string id)
        {
            try
            {
                VacationService.DeleteWithoutPayrollVacation(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion

        #region Additional Study Vacation

        [HttpGet]
        [Route("additional-study-vacation-forms/{personalCardId}")]
        public IActionResult GetAdditionalStudyVacationFormsByPersonalCardId(string personalCardId)
        {
            try
            {
                var forms = VacationService.GetAdditionalStudyVacationFormsByPersonalCardId(personalCardId);
                return Ok(forms);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("additional-study-vacation-forms/{personalCardId}/{formId}")]
        public IActionResult GetAdditionalStudyVacationForm(string personalCardId, string formId)
        {
            try
            {
                var form = VacationService.GetAdditionalStudyVacationForm(personalCardId, formId);
                return Ok(form);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("additional-study-vacation-forms")]
        public IActionResult SaveAdditionalStudyVacationForm(AdditionalStudyVacationFormModel model)
        {
            try
            {
                VacationService.SaveAdditionalStudyVacationForm(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("additional-study-vacations")]
        public IActionResult SaveAdditionalStudyVacation(AdditionalStudyVacationModel model)
        {
            try
            {
                VacationService.SaveAdditionalStudyVacation(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("additional-study-vacations/{id}")]
        public IActionResult DeleteAdditionalStudyVacation(string id)
        {
            try
            {
                VacationService.DeleteAdditionalStudyVacation(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion

        #region Social With Children Vacation

        [HttpGet]
        [Route("social-with-children-vacation-forms/{personalCardId}")]
        public IActionResult GetSocialWithChildrenVacationFormsByPersonalCardId(string personalCardId)
        {
            try
            {
                var forms = VacationService.GetSocialWithChildrenVacationFormsByPersonalCardId(personalCardId);
                return Ok(forms);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("social-with-children-vacation-forms/{personalCardId}/{formId}")]
        public IActionResult GetSocialWithChildrenVacationForm(string personalCardId, string formId)
        {
            try
            {
                var form = VacationService.GetSocialWithChildrenVacationForm(personalCardId, formId);
                return Ok(form);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("social-with-children-vacation-forms")]
        public IActionResult SaveSocialWithChildrenVacationForm(SocialWithChildrenVacationFormModel model)
        {
            try
            {
                VacationService.SaveSocialWithChildrenVacationForm(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("social-with-children-vacations")]
        public IActionResult SaveSocialWithChildrenVacation(SocialWithChildrenVacationModel model)
        {
            try
            {
                VacationService.SaveSocialWithChildrenVacation(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("social-with-children-vacations/{id}")]
        public IActionResult DeleteSocialWithChildrenVacation(string id)
        {
            try
            {
                VacationService.DeleteSocialWithChildrenVacation(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion

        #region Social With Pregnancy Or Look Vacation

        [HttpGet]
        [Route("social-with-pregnancy-or-look-vacation-forms/{personalCardId}")]
        public IActionResult GetSocialWithPregnancyOrLookVacationFormsByPersonalCardId(string personalCardId)
        {
            try
            {
                var forms = VacationService.GetSocialWithPregnancyOrLookVacationFormsByPersonalCardId(personalCardId);
                return Ok(forms);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("social-with-pregnancy-or-look-vacation-forms/{personalCardId}/{formId}")]
        public IActionResult GetSocialWithPregnancyOrLookVacationForm(string personalCardId, string formId)
        {
            try
            {
                var form = VacationService.GetSocialWithPregnancyOrLookVacationForm(personalCardId, formId);
                return Ok(form);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("social-with-pregnancy-or-look-vacation-forms")]
        public IActionResult SaveSocialWithPregnancyOrLookVacationForm(SocialWithPregnancyOrLookVacationFormModel model)
        {
            try
            {
                VacationService.SaveSocialWithPregnancyOrLookVacationForm(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("social-with-pregnancy-or-look-vacations")]
        public IActionResult SaveSocialWithPregnancyOrLookVacation(SocialWithPregnancyOrLookVacationModel model)
        {
            try
            {
                VacationService.SaveSocialWithPregnancyOrLookVacation(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("social-with-pregnancy-or-look-vacations/{id}")]
        public IActionResult DeleteSocialWithPregnancyOrLookVacation(string id)
        {
            try
            {
                VacationService.DeleteSocialWithPregnancyOrLookVacation(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion

        #region Other Vacation

        [HttpGet]
        [Route("other-vacation-forms/{personalCardId}")]
        public IActionResult GetOtherVacationFormsByPersonalCardId(string personalCardId)
        {
            try
            {
                var forms = VacationService.GetOtherVacationFormsByPersonalCardId(personalCardId);
                return Ok(forms);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpGet]
        [Route("other-vacation-forms/{personalCardId}/{formId}")]
        public IActionResult GetOtherVacationForm(string personalCardId, string formId)
        {
            try
            {
                var form = VacationService.GetOtherVacationForm(personalCardId, formId);
                return Ok(form);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("other-vacation-forms")]
        public IActionResult SaveOtherVacationForm(OtherVacationFormModel model)
        {
            try
            {
                VacationService.SaveOtherVacationForm(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("other-vacations")]
        public IActionResult SaveOtherVacation(OtherVacationModel model)
        {
            try
            {
                VacationService.SaveOtherVacation(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("other-vacations/{id}")]
        public IActionResult DeleteOtherVacation(string id)
        {
            try
            {
                VacationService.DeleteOtherVacation(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #endregion

    }
}
