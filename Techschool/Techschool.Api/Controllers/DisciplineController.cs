using Microsoft.AspNetCore.Mvc;
using System;
using Techschool.BLL.Models;
using Techschool.BLL.Services;

namespace Techschool.Api.Controllers
{
    [ApiController]
    [Route("api/disciplines")]
    public class DisciplineController : ControllerBase
    {
        private readonly IDisciplineService disciplines;

        public DisciplineController(IDisciplineService disciplines)
        {
            this.disciplines = disciplines;
        }

        [HttpGet]
        [Route("subjects")]
        public IActionResult GetSubjects()
        {
            var subjects = disciplines.GetSubjects();
            return Ok(subjects);
        }

        [HttpGet]
        [Route("subjects/{id}")]
        public IActionResult GetSubjectById(string id)
        {
            var subject = disciplines.GetSubjectById(id);
            return Ok(subject);
        }

        [HttpPost]
        [Route("subjects")]
        public IActionResult SaveSubject(SubjectModel model)
        {
            var result = disciplines.SaveSubject(model);
            if (result.Successed)
            {
                return Ok(result.Saved);
            }
            else
            {
                if (result.IsExist) return BadRequest("Предмет з такою назвою вже існує.");
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("subjects/{id}")]
        public IActionResult DeleteSubject(string id)
        {
            disciplines.DeleteSubjectById(id);
            return Ok();
        }

        [HttpGet]
        [Route("cycle-commissions")]
        public IActionResult GetCycleCommissions()
        {
            var cycleCommissions = disciplines.GetCycleCommissions();
            return Ok(cycleCommissions);
        }

        [HttpGet]
        [Route("cycle-commissions/{id}")]
        public IActionResult GetCycleCommissionById(string id)
        {
            var cycleCommission = disciplines.GetGetCycleCommissionById(id);
            return Ok(cycleCommission);
        }

        [HttpPost]
        [Route("cycle-commissions")]
        public IActionResult SaveCycleCommission(CycleCommissionModel model)
        {
            var result = disciplines.SaveCycleCommission(model);
            if (result.Successed)
            {
                return Ok(result.Saved);
            }
            else
            {
                if (result.IsExist) return BadRequest("ЦК з такою назвою вже існує.");
                return BadRequest();
            }
        }

        [HttpDelete]
        [Route("cycle-commissions/{id}")]
        public IActionResult DeleteCycleCommission(string id)
        {
            try
            {
                disciplines.DeleteCycleCommissionById(id);
                return Ok();
            }
            catch
            {
                return BadRequest();
            }
        }

        [HttpPost]
        [Route("subject-to-cycle-commissions/{subjectId}/{cycleCommissionId}")]
        public IActionResult AddSubjectToCycleCommission(string subjectId, string cycleCommissionId)
        {
            disciplines.AddSubjectToCycleCommission(subjectId, cycleCommissionId);
            return Ok();
        }

        [HttpDelete]
        [Route("subject-from-cycle-commissions/{subjectId}/{cycleCommissionId}")]
        public IActionResult DeleteSubjectFromCycleCommission(string subjectId, string cycleCommissionId)
        {
            disciplines.DeleteSubjectFromCycleCommission(subjectId, cycleCommissionId);
            return Ok();
        }
    }
}
