using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using Techschool.BLL.Services;
using Techschool.DAL;
using Techschool.DAL.Entities;
using TemplateEngine.Docx;

namespace Techschool.Api
{
    [ApiController]
    [Route("api/reports")]
    public class ReportController : ControllerBase
    {
        private readonly IVacationService VacationService;
        private readonly IHostingEnvironment HostingEnvironment;
        private readonly TechschoolContext TechschoolContext;

        public ReportController(IVacationService vacationService, IHostingEnvironment hostingEnvironment, TechschoolContext techschoolContext)
        {
            VacationService = vacationService;
            HostingEnvironment = hostingEnvironment;
            TechschoolContext = techschoolContext;
        }

        [HttpGet]
        [Route("personal-cards/{personalCardId}")]
        public IActionResult GetAnnualVacationFormsByPersonalCardId(string personalCardId)
        {
            var templatesPath = HostingEnvironment.WebRootPath;

            var personalCard = TechschoolContext.PersonalCards.AsNoTracking()
                .Include(_ => _.Diplomas)
                .Single(_ => _.Id == personalCardId);

            System.IO.File.Delete(templatesPath + "/templates/personal_card_template_test.docx");
            System.IO.File.Copy(templatesPath + "/templates/personal_card_template.docx", templatesPath + "/templates/personal_card_template_test.docx");

            var education = personalCard.Diplomas.ToList()[0];

            var valuesToFill = new Content(new FieldContent("Patronymic", personalCard.Patronymic ?? ""),
                new FieldContent("Name", personalCard.Name ?? ""),
                new FieldContent("Surname", personalCard.Surname ?? ""),
                new FieldContent("Sex", personalCard.Sex == Sex.Female ? "Жіноча" : "Чоловіча"),
                new FieldContent("Birthday", personalCard.Birthday.ToShortDateString()),
                new FieldContent("BirthdayAddress", personalCard.BirthdayAddress ?? ""),
                new FieldContent("EducationTitle", personalCard.Education ?? ""),
                new FieldContent("Languages", personalCard.Languages ?? ""),
                new FieldContent("AcademicDegree", personalCard.AcademicDegree ?? ""),
                new ImageContent("Photo", personalCard.Photo ?? System.IO.File.ReadAllBytes(templatesPath + "/templates/no_picture.png")),
                GenerateTableContentByDiplomas(personalCard.Diplomas.ToList()));

            using (var outputDocument = new TemplateProcessor(templatesPath + "/templates/personal_card_template_test.docx").SetRemoveContentControls(true))
            {
                outputDocument.FillContent(valuesToFill);
                outputDocument.SaveChanges();
            }
            return PhysicalFile(templatesPath + "/templates/personal_card_template_test.docx", "application/vnd.openxmlformats-officedocument.wordprocessingml.document", "personal_card.docx");
        }

        private TableContent GenerateTableContentByDiplomas(List<Diploma> diplomas)
        {
            var tableContent = new TableContent("Education");
            foreach (var diploma in diplomas)
            {
                tableContent.AddRow(GenerateEducationRowByDiplomas(diploma).ToArray());
            }
            while (tableContent.Rows.Count < 16)
            {
                List<IContentItem> items = new List<IContentItem>();
                items.Add(new FieldContent("NameOfInsitution", ""));
                items.Add(new FieldContent("Qualification", ""));
                items.Add(new FieldContent("ReceiptDate", ""));
                items.Add(new FieldContent("GraduationDate", ""));
                items.Add(new FieldContent("Specialization", ""));
                tableContent.AddRow(items.ToArray());
            }
            return tableContent;
        }

        private List<IContentItem> GenerateEducationRowByDiplomas(Diploma diploma)
        {
            List<IContentItem> items = new List<IContentItem>();
            items.Add(new FieldContent("NameOfInsitution", diploma.NameOfTheInstitution ?? ""));
            items.Add(new FieldContent("Qualification", diploma.Faculty ?? ""));
            items.Add(new FieldContent("ReceiptDate", diploma.ReceiptDate.ToShortDateString()));
            items.Add(new FieldContent("GraduationDate", diploma.GraduationDate.ToShortDateString()));
            items.Add(new FieldContent("Specialization", diploma.Specialization ?? ""));
            return items;
        }
    }
}
