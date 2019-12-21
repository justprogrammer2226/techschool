using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using System.Linq;
using System.Threading.Tasks;
using Techschool.DAL.Entities;

namespace Techschool.DAL
{
    public static class DBSeeder
    {
        private static RoleManager<IdentityRole> RoleManager;
        private static UserManager<User> UserManager;
        private static TechschoolContext Context;

        public static async Task Seed(RoleManager<IdentityRole> roleManager, UserManager<User> userManager, TechschoolContext context)
        {
            RoleManager = roleManager;
            UserManager = userManager;
            Context = context;
            await SeedRoles();
            await SeedUsers();
            await SeedEmploymentTypes();
            await SeedTeacherQualifications();

            // TODO: Seed disciplines
            // await SeedDisciplines();
        }

        private static async Task SeedRoles()
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

        private static async Task SeedUsers()
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

        private static async Task SeedEmploymentTypes()
        {
            if (!Context.EmploymentTypes.Any())
            {
                await Context.EmploymentTypes.AddRangeAsync(new[]
                {
                    new EmploymentType() { Name = "Сумісник"},
                    new EmploymentType() { Name = "Штатний"},
                    new EmploymentType() { Name = "Контракт"}
                });
                await Context.SaveChangesAsync();
            }
        }

        private static async Task SeedTeacherQualifications()
        {
            if (!Context.TeacherQualifications.Any())
            {
                await Context.TeacherQualifications.AddRangeAsync(new[]
                {
                    new TeacherQualification() { Name = "Спеціаліст"},
                    new TeacherQualification() { Name = "2 категорія"},
                    new TeacherQualification() { Name = "1 категорія"},
                    new TeacherQualification() { Name = "Вища"},
                    new TeacherQualification() { Name = "Викладач-методист"}
                });
                await Context.SaveChangesAsync();
            }
        }

        //private static async Task SeedDisciplines()
        //{
        //    if (!Context.CycleCommissions.Any() && !Context.Subjects.Any() && !Context.CycleCommissionsSubjects.Any())
        //    {
        //        EntityEntry<CycleCommission> addedCycleCommission = null;
        //        EntityEntry<Subject> addedSubject = null;
        //        EntityEntry<CycleCommissionSubject> cycleCommissionSubject = null;

        //        addedCycleCommission = await Context.CycleCommissions.AddAsync(new CycleCommission() { Name = "Інформаційних технологій" });
        //        addedSubject = await Context.Subjects.AddAsync(new Subject() { Name = "Системне програмування" });
        //        await Context.CycleCommissionsSubjects.AddAsync(new CycleCommissionSubject() { CycleCommissionId = addedCycleCommission.Entity.Id, SubjectId = addedSubject.Entity.Id}) ;
        //        addedSubject = await Context.Subjects.AddAsync(new Subject() { Name = "Алгоритми та структури даних" });
        //        await Context.CycleCommissionsSubjects.AddAsync(new CycleCommissionSubject() { CycleCommissionId = addedCycleCommission.Entity.Id, SubjectId = addedSubject.Entity.Id });
        //        addedSubject = await Context.Subjects.AddAsync(new Subject() { Name = "Проектний практикум" });
        //        await Context.CycleCommissionsSubjects.AddAsync(new CycleCommissionSubject() { CycleCommissionId = addedCycleCommission.Entity.Id, SubjectId = addedSubject.Entity.Id });
        //        addedSubject = await Context.Subjects.AddAsync(new Subject() { Name = "Основи програмування мовою C/C++" });
        //        await Context.CycleCommissionsSubjects.AddAsync(new CycleCommissionSubject() { CycleCommissionId = addedCycleCommission.Entity.Id, SubjectId = addedSubject.Entity.Id });
        //        addedSubject = await Context.Subjects.AddAsync(new Subject() { Name = "Алгоритми і методи обчислень" });
        //        await Context.CycleCommissionsSubjects.AddAsync(new CycleCommissionSubject() { CycleCommissionId = addedCycleCommission.Entity.Id, SubjectId = addedSubject.Entity.Id });
        //        addedSubject = await Context.Subjects.AddAsync(new Subject() { Name = "Керівництво дипломним проектом" });
        //        await Context.CycleCommissionsSubjects.AddAsync(new CycleCommissionSubject() { CycleCommissionId = addedCycleCommission.Entity.Id, SubjectId = addedSubject.Entity.Id });
        //        addedSubject = await Context.Subjects.AddAsync(new Subject() { Name = "Керівництво практикою" });
        //        await Context.CycleCommissionsSubjects.AddAsync(new CycleCommissionSubject() { CycleCommissionId = addedCycleCommission.Entity.Id, SubjectId = addedSubject.Entity.Id });
        //        addedSubject = await Context.Subjects.AddAsync(new Subject() { Name = "ДЕК" });
        //        await Context.CycleCommissionsSubjects.AddAsync(new CycleCommissionSubject() { CycleCommissionId = addedCycleCommission.Entity.Id, SubjectId = addedSubject.Entity.Id });
        //        addedSubject = await Context.Subjects.AddAsync(new Subject() { Name = "Об'єктно-орієнтоване програмування" });
        //        await Context.CycleCommissionsSubjects.AddAsync(new CycleCommissionSubject() { CycleCommissionId = addedCycleCommission.Entity.Id, SubjectId = addedSubject.Entity.Id });
        //        addedSubject = await Context.Subjects.AddAsync(new Subject() { Name = "Інструментальні засоби візувального програмування" });
        //        await Context.CycleCommissionsSubjects.AddAsync(new CycleCommissionSubject() { CycleCommissionId = addedCycleCommission.Entity.Id, SubjectId = addedSubject.Entity.Id });
        //        addedSubject = await Context.Subjects.AddAsync(new Subject() { Name = "Навчальна практика з об'єктно-орієнтованого програмування" });
        //        await Context.CycleCommissionsSubjects.AddAsync(new CycleCommissionSubject() { CycleCommissionId = addedCycleCommission.Entity.Id, SubjectId = addedSubject.Entity.Id });
        //        addedSubject = await Context.Subjects.AddAsync(new Subject() { Name = "Інформатика" });
        //        await Context.CycleCommissionsSubjects.AddAsync(new CycleCommissionSubject() { CycleCommissionId = addedCycleCommission.Entity.Id, SubjectId = addedSubject.Entity.Id });
        //        addedSubject = await Context.Subjects.AddAsync(new Subject() { Name = "Бази даних" });
        //        await Context.CycleCommissionsSubjects.AddAsync(new CycleCommissionSubject() { CycleCommissionId = addedCycleCommission.Entity.Id, SubjectId = addedSubject.Entity.Id });
        //        addedSubject = await Context.Subjects.AddAsync(new Subject() { Name = "Основи програмної інженерії" });
        //        await Context.CycleCommissionsSubjects.AddAsync(new CycleCommissionSubject() { CycleCommissionId = addedCycleCommission.Entity.Id, SubjectId = addedSubject.Entity.Id });
        //        addedSubject = await Context.Subjects.AddAsync(new Subject() { Name = "Людинно-машинний інтерфейс" });
        //        await Context.CycleCommissionsSubjects.AddAsync(new CycleCommissionSubject() { CycleCommissionId = addedCycleCommission.Entity.Id, SubjectId = addedSubject.Entity.Id });
        //        addedSubject = await Context.Subjects.AddAsync(new Subject() { Name = "Навчальна практика для здобуття професії за фахом з баз даних" });
        //        await Context.CycleCommissionsSubjects.AddAsync(new CycleCommissionSubject() { CycleCommissionId = addedCycleCommission.Entity.Id, SubjectId = addedSubject.Entity.Id });
        //        addedSubject = await Context.Subjects.AddAsync(new Subject() { Name = "Керівництво дипломним проектом" });
        //        await Context.CycleCommissionsSubjects.AddAsync(new CycleCommissionSubject() { CycleCommissionId = addedCycleCommission.Entity.Id, SubjectId = addedSubject.Entity.Id });
        //        addedSubject = await Context.Subjects.AddAsync(new Subject() { Name = "Керівництво практикою" });
        //        await Context.CycleCommissionsSubjects.AddAsync(new CycleCommissionSubject() { CycleCommissionId = addedCycleCommission.Entity.Id, SubjectId = addedSubject.Entity.Id });
        //        addedSubject = await Context.Subjects.AddAsync(new Subject() { Name = "Програмні методи захисту інформації" });
        //        await Context.CycleCommissionsSubjects.AddAsync(new CycleCommissionSubject() { CycleCommissionId = addedCycleCommission.Entity.Id, SubjectId = addedSubject.Entity.Id });
        //        addedSubject = await Context.Subjects.AddAsync(new Subject() { Name = "Розробка веб-застосувань" });
        //        await Context.CycleCommissionsSubjects.AddAsync(new CycleCommissionSubject() { CycleCommissionId = addedCycleCommission.Entity.Id, SubjectId = addedSubject.Entity.Id });
        //        addedSubject = await Context.Subjects.AddAsync(new Subject() { Name = "Розробка застосувань клієнт-серверної архітектури" });
        //        await Context.CycleCommissionsSubjects.AddAsync(new CycleCommissionSubject() { CycleCommissionId = addedCycleCommission.Entity.Id, SubjectId = addedSubject.Entity.Id });
        //        addedSubject = await Context.Subjects.AddAsync(new Subject() { Name = "Керівництво дипломним проектом" });
        //        await Context.CycleCommissionsSubjects.AddAsync(new CycleCommissionSubject() { CycleCommissionId = addedCycleCommission.Entity.Id, SubjectId = addedSubject.Entity.Id });
        //        addedSubject = await Context.Subjects.AddAsync(new Subject() { Name = "Прикладне програмне забезпечення" });
        //        await Context.CycleCommissionsSubjects.AddAsync(new CycleCommissionSubject() { CycleCommissionId = addedCycleCommission.Entity.Id, SubjectId = addedSubject.Entity.Id });
        //        addedSubject = await Context.Subjects.AddAsync(new Subject() { Name = "Офісне програмне забезпечення" });
        //        await Context.CycleCommissionsSubjects.AddAsync(new CycleCommissionSubject() { CycleCommissionId = addedCycleCommission.Entity.Id, SubjectId = addedSubject.Entity.Id });
        //        addedSubject = await Context.Subjects.AddAsync(new Subject() { Name = "Інформатика та обчислювальна техніка" });
        //        await Context.CycleCommissionsSubjects.AddAsync(new CycleCommissionSubject() { CycleCommissionId = addedCycleCommission.Entity.Id, SubjectId = addedSubject.Entity.Id });

        //        await Context.CycleCommissions.AddRangeAsync(new[]
        //        {
        //            new CycleCommission() { Name = "Інформаційних технологій"},
        //            new CycleCommission() { Name = "Компьютерні системи і мережі"},
        //            new CycleCommission() { Name = "Іноземних мов"},
        //            new CycleCommission() { Name = "Фінансово-економічних дисциплін"},
        //            new CycleCommission() { Name = "Суспільних дисциплін"},
        //            new CycleCommission() { Name = "Математичних дисциплін"},
        //            new CycleCommission() { Name = "Електрорадіотехнічних дисциплін"},
        //            new CycleCommission() { Name = "Фізичного виховання та Захисту Вітчизни"},
        //            new CycleCommission() { Name = "Філологічних дисциплін"},
        //            new CycleCommission() { Name = "Природничих дисциплін"},
        //            new CycleCommission() { Name = "Зварювальне виробництво"},
        //            new CycleCommission() { Name = "Контроль якості металів і зварних з'єднань"}
        //            new CycleCommission() { Name = "Зварювальне виробництво"},
        //            new CycleCommission() { Name = "Зварювальне виробництво"},
        //            new CycleCommission() { Name = "Зварювальне виробництво"},
        //            new CycleCommission() { Name = "Зварювальне виробництво"},
        //            new CycleCommission() { Name = "Зварювальне виробництво"},
        //            new CycleCommission() { Name = "Зварювальне виробництво"},
        //            new CycleCommission() { Name = "Зварювальне виробництво"},

        //        });

        //        await Context.Subjects.AddRangeAsync(new[] {
        //            new Subject() { Name = "Системне програмування" },
        //            new Subject() { Name = "Алгоритми та структури даних" },
        //            new Subject() { Name = "Проектний практикум" },
        //            new Subject() { Name = "Основи програмування мовою C/C++" },
        //            new Subject() { Name = "Алгоритми і методи обчислень" },
        //            new Subject() { Name = "Керівництво дипломним проектом" },
        //            new Subject() { Name = "Програмування та алгоритмічні мови" },
        //            new Subject() { Name = "Надійність, діагностика та експлуатація комп'ютерних мереж та систем" },
        //            new Subject() { Name = "ДЕК" },
        //            new Subject() { Name = "Керівництво практикою" }
        //        });

        //        await Context.SaveChangesAsync();
        //    }
        //}
    }
}
