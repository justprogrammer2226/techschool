using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Techschool.BLL.Models;
using Techschool.BLL.Services;
using Techschool.DAL;
using Techschool.DAL.Entities;

namespace Techschool.Api
{
    [ApiController]
    [Route("api/admin")]
    public class AdminController : ControllerBase
    {
        private readonly IAuthService AuthService;
        private readonly TechschoolContext Context;
        private static RoleManager<IdentityRole> RoleManager;
        private static UserManager<User> UserManager;

        public AdminController(IAuthService authService, TechschoolContext context, RoleManager<IdentityRole> roleManager, UserManager<User> userManager)
        {
            AuthService = authService;
            Context = context;
            RoleManager = roleManager;
            UserManager = userManager;
        }

        [HttpGet]
        [Route("seed")]
        public async Task<IActionResult> Seed()
        {
            try
            {
                RemoveData();
                await SeedData();

                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        private readonly List<string> Specializations = new List<string>
        { 
            "Економіка", "Менеджмент", "Прикладна математика", "Інженерія програмного забезпечення",
            "Комп'ютерні науки", "Комп'ютерна інженерія", "Кібербезпека", "Електроніка"
        };

        private readonly Dictionary<string, List<string>> CycleCommissionsWithSubjectsDict = new Dictionary<string, List<string>>
        {
            {
                "Природничих дисциплін", new List<string>
                { 
                    "Фізика", "Хімія", "Біологія", "Екологія", 
                    "Географія", "Регіональна економика" 
                }
            },
            {
                "Фізичного виховання та захисту Вітчизни", new List<string>
                { 
                    "Фізична культура", "Фізичне виховання", "Захист Вітчизни", "Безпека життєдіяльності" 
                }
            },
            {
                "Іноземних мов", new List<string> 
                { 
                    "Іноземна мова" 
                }
            },
            {
                "Контроль якості металів та зварних з'єднань", new List<string>
                { 
                    "Методи неруйнівного контролю якості металів та зварних з'єднань",
                    "Ультразвукова дефектоскопія", "Контроль іонізованим випромінюванням",
                    "Фізико-механічні випробування зварних з'єднань", "Вступ до спеціальності",
                    "Металознавство та термічна обробка металів і зварних з'єднань",
                    "Експлуатація дефектоскопіч не апаратури", "Спектральний аналіз",
                    "Об'єкти підвищеної небезпеки", "Основи метрології", "Основи охорони праці",
                    "Введення в контроль якості зварювання", "Основи дефектології зварних з'єднань",
                }
            },
            {
                "Суспільних дисциплін", new List<string> 
                {
                    "Історія України", "Всесвітня історія", "Громадянська освіта", "Мистецтво",
                    "Етика і психологія", "Соціологія", "Основи філософських знань",
                    "Економічна теорія", "Правознавство", "Політологія"
                }
            },
            {
                "Філологічних дисциплін", new List<string>
                { 
                    "Українська мова", "Українська література", "Зарубіжна література",
                    "Українська мова (за професійним спрямуванням)"
                }
            },
            {
                "Математичних дисциплін", new List<string> 
                {
                    "Математика", "Вища математика", "Дискретна математика", "Математичний аналіз",
                    "Теорія ймовірності", "Диференціальні рівняння", "Чисельні методи",
                    "Математична логіка", "Лінійна алгебра та аналітична геометрія"
                }
            },
            {
                "Фінансово економічних дисциплін", new List<string> 
                {
                    "Основи менеджменту та маркетингу", "Економіка і організація виробництва",
                    "Економіка та планування виробництва", "Бухгалтерський облік",
                    "Економіка підприємства", "Фінанси підприємств", "Фінанси",
                    "Казначейська справа", "Страхування і страхові послуги",
                    "Банківські операції", "Податкова система",
                    "Основи менеджменту та маркетингу", "Фінансове право"
                }
            },
            {
                "Зварювальне виробництво", new List<string>
                {
                    "Контроль якості зварювання", "Введення в зварювання",
                    "Матеріало-знавство та термічна обробка металів і зварних з’єднань",
                    "Газотермічна обробка металів", "Зварні конструкції"
                }
            },
            {
                "Інформаційних технологій", new List<string> 
                {
                    "Інформатика", "Технології", "Архітектура комп'ютера",
                    "Операційні системи", "Алгоритми та структури даних",
                    "Бази даних", "Інструментальні засоби візуального програмування",
                    "Основи програмної інженерії", "Людино машинний інтерфейс",
                    "Розробка веб-застосуваннь", "Програмні методи захисту інформації"
                }
            },
            {
                "Комп'ютерні системи і мережі", new List<string> 
                {
                    "Офісне програмне забезпечення", "Компютерна графіка і анімація",
                    "Інженерна та комп'ютерна графіка", "Комп'ютерна логіка", "Операційні системи",
                    "Комп'ютерна схемотехніка", "Програмування та алгоритмічні мови", "Архітектура комп'ютерів",
                    "Мікропроцесорні системи", "Алгоритми і методи обчислень", "Архітектура комп'ютерів",
                    "Комп’ютерні системи та мережі", "Введення до компютерної інженерії"
                }
            },
            {
                "Електрорадіотехнічних дисциплін", new List<string>
                { 
                    "Інженерна графіка", "Електротехніка з основами електроніки",
                    "Технічна механіка", "Електротехніка", "Електрорадіовимірювання",
                    "Основи радіоелектроніки", "Електрорадіовимірювання",
                    "Комп’ютерна електроніка", "Теорія електричних та магнітних кіл",
                    "Технології" 
                }
            }
        };

        public void RemoveData()
        {
            Context.CycleCommissions.RemoveRange(Context.CycleCommissions);
            Context.Subjects.RemoveRange(Context.Subjects);
            Context.Roles.RemoveRange(Context.Roles);
            Context.Users.RemoveRange(Context.Users);
            Context.Diplomas.RemoveRange(Context.Diplomas);
            Context.PersonalCards.RemoveRange(Context.PersonalCards);
            Context.EmploymentTypes.RemoveRange(Context.EmploymentTypes);
            Context.SaveChanges();
        }

        public async Task SeedData()
        {
            await SeedRoles();
            await SeedUsers();
            await SeedEmploymentTypes();
            await SeedDisciplines();
            await SeedPersonalCards();
        }

        private async Task SeedRoles()
        {
            string[] roles = new string[] { "Administrator", "Methodist" };
            foreach (string role in roles)
            {
                if (!await RoleManager.RoleExistsAsync(role))
                {
                    await RoleManager.CreateAsync(new IdentityRole(role));
                }
            }
        }

        private async Task SeedUsers()
        {
            var user = new User
            {
                FirstName = "Admin",
                LastName = "Admin",
                UserName = "test@test.com",
                Email = "test@test.com"
            };

            var userExists = await UserManager.FindByEmailAsync(user.Email);
            if (userExists == null)
            {
                var result = await UserManager.CreateAsync(user, "test");
                if (result.Succeeded)
                {
                    var createdUser = await UserManager.FindByEmailAsync(user.Email);
                    await UserManager.AddToRoleAsync(createdUser, "Administrator");
                }
            }
        }

        private async Task SeedEmploymentTypes()
        {
            if (!Context.EmploymentTypes.Any())
            {
                await Context.EmploymentTypes.AddRangeAsync(new[]
                {
                    new EmploymentType() { Id = "095c8a7e-a9cc-474c-85f7-fed864254f51", Name = "Сумісник" },
                    new EmploymentType() { Id = "4da69bfa-3c07-4520-a21f-ab47d36be36f", Name = "Штатний" },
                    new EmploymentType() { Id = "3861a99d-d1aa-4a1d-88e3-c705a82848c9", Name = "Контракт" }
                });
                await Context.SaveChangesAsync();
            }
        }

        private async Task SeedDisciplines()
        {
            foreach (var cycleCommissionWithSubjects in CycleCommissionsWithSubjectsDict)
            {
                var cycleCommission = new CycleCommission
                {
                    Name = cycleCommissionWithSubjects.Key
                };
                var cycleCommissionEntry = await Context.CycleCommissions.AddAsync(cycleCommission);
                await Context.SaveChangesAsync();

                foreach (var subjectName in cycleCommissionWithSubjects.Value)
                {
                    var subject = new Subject
                    {
                        Name = subjectName
                    };
                    await Context.Subjects.AddAsync(subject);
                    await Context.SaveChangesAsync();
                    Context.Entry(subject).State = EntityState.Detached;

                    var cycleCommissionSubject = new CycleCommissionSubject();
                    cycleCommissionSubject.CycleCommissionId = cycleCommissionEntry.Entity.Id;
                    cycleCommissionSubject.SubjectId = subject.Id;
                    await Context.CycleCommissionsSubjects.AddAsync(cycleCommissionSubject);
                    await Context.SaveChangesAsync();
                    Context.Entry(cycleCommissionSubject).State = EntityState.Detached;
                }
                Context.Entry(cycleCommission).State = EntityState.Detached;
                await Context.SaveChangesAsync();
            }
        }

        private async Task SeedPersonalCards()
        {
            await CreatePersonalCard("Орест", "Бирюков", "Леонидович", "ул. Гулі Корольової, 14", "0688700411", "oneclick1337@gmail.com");
            await CreatePersonalCard("Влад", "Шестаков", "Максимович", "ул. Пушкіна, 12", "0688700422", "oneclick12345@gmail.com");
            await CreatePersonalCard("Влад", "Маслов", "Михайлович", "ул. Дмитра Яворницького, 3", "0688700433", "mymail1337@gmail.com");
            await CreatePersonalCard("Эрик", "Нестеров", "Ярославович", "ул. Косіора, 4", "0688700444", "mymail1234@gmail.com");
            await CreatePersonalCard("Игнат", "Павлив", "Львович", "ул. Богдана Хмельницького, 6", "0688700455", "nika322@gmail.com");
            await CreatePersonalCard("Михаил", "Антонов", "Сергійович", "ул. Батумська, 1", "0688700466", "nika228@gmail.com");
            await CreatePersonalCard("Оливер", "Фролов", "Максимович", "ул. Володимира Великого, 24", "0688700477", "kashtanchik4321@gmail.com");
            await CreatePersonalCard("Дмитрий", "Назаров", "Богданович", "ул. Шевченка, 5", "0688700488", "kashtanchik1234@gmail.com");

            await CreatePersonalCard("Алла", "Русакова", "Петрівна", "ул. Гулі Корольової, 11", "0978700411", "oneclick7331@gmail.com");
            await CreatePersonalCard("Раиса", "Колесник", "Вікторівна", "ул. Пушкіна, 10", "0978700422", "oneclick54321@gmail.com");
            await CreatePersonalCard("Любовь", "Антонова", "Данилівна", "ул. Дмитра Яворницького, 5", "0978700433", "mymail7331@gmail.com");
            await CreatePersonalCard("Дина", "Яценюк", "Романова", "ул. Косіора, 11", "0978700444", "mymail4321@gmail.com");
            await CreatePersonalCard("Майя", "Чабаненко", "Михайлівна", "ул. Богдана Хмельницького, 3", "0978700455", "nika223@gmail.com");
            await CreatePersonalCard("Гелла", "Степанова", "Сергіївна", "ул. Батумська, 5", "0978700466", "nika822@gmail.com");
            await CreatePersonalCard("Анжелика", "Осипова", "Миколаївна", "ул. Володимира Великого, 6", "0978700477", "kashtanchik12345@gmail.com");
            await CreatePersonalCard("Тамара", "Кузьмина", "Сергіївна", "ул. Шевченка, 3", "0978700488", "kashtanchik43215@gmail.com");

            await CreatePersonalCard("Зоя", "Кириллова", "Олександрівна", "ул. Гулі Корольової, 1", "0668700411", "vlad.mozg7331@gmail.com");
            await CreatePersonalCard("Тамара", "Василенко", "Романівна", "ул. Пушкіна, 3", "0668700422", "vlad.mozg54321@gmail.com");
            await CreatePersonalCard("Діана", "Чабаненко", "Максимівна", "ул. Дмитра Яворницького, 10", "0668700433", "dan.teach7331@gmail.com");
            await CreatePersonalCard("Поліна", "Чабаненко", "Леонідівна", "ул. Косіора, 5", "0668700444", "dan.teach4321@gmail.com");
            await CreatePersonalCard("Ніна", "Чабаненко", "Миколаївна", "ул. Богдана Хмельницького, 25", "0668700455", "nika.chorna23@gmail.com");
            await CreatePersonalCard("Влад", "Яценюк", "Сергійович", "ул. Батумська, 17", "0668700466", "nika.chorna822@gmail.com");
            await CreatePersonalCard("Микита", "Марк", "Богданович", "ул. Володимира Великого, 15", "0668700477", "kash.chaban12345@gmail.com");
            await CreatePersonalCard("Влад", "Чабаненко", "Михайлович", "ул. Шевченка, 10", "0668700488", "kash.chaban43215@gmail.com");
        }

        private async Task CreatePersonalCard(string name, string surname, string patronymic, string address, string phone, string email)
        {
            var rnd = new Random();
            var personalCard = new PersonalCard();
            personalCard.Name = name;
            personalCard.Surname = surname;
            personalCard.Patronymic = patronymic;
            personalCard.Address = address;
            personalCard.PhoneNumber = phone;
            personalCard.Email = email;
            personalCard.Birthday = DateTime.UtcNow.AddYears(-18 - rnd.Next(20));
            //public byte[] Photo { get; set; } - RND
            personalCard.IsEmployee = rnd.Next(0, 2) > 0;
            personalCard.IsTeacher = personalCard.IsEmployee ? rnd.Next(0, 2) > 0 : true;
            personalCard.TotalWorkExperienceOnDate = DateTime.UtcNow.AddYears(-rnd.Next(3));
            personalCard.NumberOfYearsOfTotalWorkExperience = rnd.Next(0, 5);
            personalCard.NumberOfMonthsOfTotalWorkExperience = rnd.Next(0, 12);
            if (personalCard.IsTeacher)
            {
                personalCard.TeachingWorkExperienceOnDate = DateTime.UtcNow.AddYears(-rnd.Next(3));
                personalCard.NumberOfYearsOfTeachingWorkExperience = rnd.Next(0, 5);
                personalCard.NumberOfMonthsOfTeachingWorkExperience = rnd.Next(0, 12);
                personalCard.CycleCommissionId = (await GetRandomCycleCommission()).Id;
            }
            int employmentType = rnd.Next(3);
            personalCard.EmploymentTypeId = employmentType == 0 ? "095c8a7e-a9cc-474c-85f7-fed864254f51" : employmentType == 1 ? "4da69bfa-3c07-4520-a21f-ab47d36be36f" : "3861a99d-d1aa-4a1d-88e3-c705a82848c9";
            // We dont seed Teacher Qualification here
            Context.PersonalCards.Add(personalCard);
            await Context.SaveChangesAsync();
            var subjects = await GetRandomSubjects();
            personalCard.PersonalCardSubjects = new List<PersonalCardSubject>();
            foreach (var subject in subjects)
            {
                var personalCardSubject = new PersonalCardSubject();
                personalCardSubject.PersonalCardId = personalCard.Id;
                personalCardSubject.SubjectId = subject.Id;
                Context.PersonalCardsSubjects.Add(personalCardSubject);
            }
            int numberOfDiplomas = rnd.Next(1, 4);
            personalCard.Diplomas = new List<Diploma>();
            for (int i = 0; i < numberOfDiplomas; i++)
            {
                var diploma = new Diploma();
                diploma.PersonalCardId = personalCard.Id;
                diploma.NameOfTheInstitution = "ДТЗЕ";
                diploma.Faculty = "РПЗ";
                diploma.GraduationDate = DateTime.UtcNow.AddYears(-rnd.Next(1, 10));
                diploma.ReceiptDate = diploma.GraduationDate.AddYears(-4);
                diploma.Specialization = Specializations[rnd.Next(Specializations.Count)];
                diploma.Number = rnd.Next(100_000, 1_000_000).ToString();
                Context.Diplomas.Add(diploma);
            }
            await Context.SaveChangesAsync();
        }

        private async Task<CycleCommission> GetRandomCycleCommission()
        {
            int skip = new Random().Next(Context.CycleCommissions.Count());
            return await Context.CycleCommissions.AsNoTracking()
                .OrderBy(_ => _.Id)
                .Skip(skip)
                .Take(1)
                .FirstAsync();
        }

        private async Task<IEnumerable<Subject>> GetRandomSubjects()
        {
            int skip = new Random().Next(Context.Subjects.Count());
            return await Context.Subjects.AsNoTracking()
                .OrderBy(_ => _.Id)
                .Skip(skip)
                .Take(new Random().Next(1, 5))
                .ToListAsync();
        }
    }
}
