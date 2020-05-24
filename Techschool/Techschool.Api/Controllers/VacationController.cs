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

        [HttpPost]
        [Route("working-years")]
        public IActionResult SaveWorkingYear(WorkingYearModel model)
        {
            try
            {
                VacationService.SaveWorkingYear(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete]
        [Route("working-years/{id}")]
        public IActionResult DeleteWorkingYear(string id)
        {
            try
            {
                VacationService.DeleteWorkingYear(id);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        #region Annual Vacation

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
