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
            disciplines.SaveSubject(model);
            return Ok();
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
            disciplines.SaveCycleCommission(model);
            return Ok();
        }

        [HttpDelete]
        [Route("cycle-commissions/{id}")]
        public IActionResult DeleteCycleCommission(string id)
        {
            disciplines.DeleteCycleCommissionById(id);
            return Ok();
        }

        [HttpDelete]
        [Route("cycle-commission-subject/{subjectId}/{cycleCommissionId}")]
        public IActionResult DeleteCycleCommissionSubject(string subjectId, string cycleCommissionId)
        {
            disciplines.DeleteCycleCommissionSubject(subjectId, cycleCommissionId);
            return Ok();
        }
    }
}
