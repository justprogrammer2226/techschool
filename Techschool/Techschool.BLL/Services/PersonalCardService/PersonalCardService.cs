using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Drawing;
using System.IO;
using System.Linq;
using System.Linq.Expressions;
using Techschool.BLL.Models;
using Techschool.BLL.Models.Filters;
using Techschool.BLL.Models.Vacations;
using Techschool.DAL;
using Techschool.DAL.Entities;
using Techschool.DAL.Entities.Vacations;

namespace Techschool.BLL.Services
{
    public static class Extensions
    {
        public static IOrderedQueryable<PersonalCard> CustomOrder(this IQueryable<PersonalCard> personalCards, Expression<Func<PersonalCard, string>> expression, Order order)
        {
            if (order == Order.Random)
            {
                return personalCards.OrderBy(_ => true);
            }
            else if (order == Order.Asc)
            {
                return personalCards.OrderBy(expression);
            }
            else if (order == Order.Desc)
            {
                return personalCards.OrderByDescending(expression);
            }
            else
            {
                throw new Exception();
            }
        }

        public static IOrderedQueryable<PersonalCard> ThenCustomOrder(this IOrderedQueryable<PersonalCard> personalCards, Expression<Func<PersonalCard, string>> expression, Order order)
        {
            if (order == Order.Random)
            {
                return personalCards.ThenBy(_ => true);
            }
            else if (order == Order.Asc)
            {
                return personalCards.ThenBy(expression);
            }
            else if (order == Order.Desc)
            {
                return personalCards.ThenByDescending(expression);
            }
            else
            {
                throw new Exception();
            }
        }
    }

    public class PersonalCardService : IPersonalCardService
    {
        private readonly TechschoolContext context;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IModelMapper modelMapper;

        public PersonalCardService(UserManager<User> userManager, SignInManager<User> signInManager, TechschoolContext context, RoleManager<IdentityRole> roleManager, IModelMapper modelMapper)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.context = context;
            this.roleManager = roleManager;
            this.modelMapper = modelMapper;
        }

        public IEnumerable<PersonalCardModel> GetAll(FilterPersonalCards filter)
        {
            var personalCards = context.PersonalCards.AsNoTracking()
                .Include(_ => _.CycleCommission)
                .Include(_ => _.EmploymentType)
                .AsQueryable();

            if (filter.NameContains != null)
            {
                personalCards = personalCards.Where(_ => _.Name.Contains(filter.NameContains));
            }

            if (filter.SurnameContains != null)
            {
                personalCards = personalCards.Where(_ => _.Surname.Contains(filter.SurnameContains));
            }

            if (filter.PatronymicContains != null)
            {
                personalCards = personalCards.Where(_ => _.Patronymic.Contains(filter.PatronymicContains));
            }

            if (filter.EmploymentType != null)
            {
                personalCards = personalCards.Where(_ => _.EmploymentType.Name == filter.EmploymentType);
            }

            if (filter.CycleCommission != null)
            {
                personalCards = personalCards.Where(_ => _.CycleCommission.Id == filter.CycleCommission.Id);
            }

            if (int.TryParse(filter.TotalWorkExperience, out int totalWorkExperience))
            {
                int currentYear = DateTime.UtcNow.Year;
                switch (filter.TotalWorkExperienceOperator)
                {
                    case MathOperators.Equal:
                        personalCards = personalCards.Where(_ => (_.NumberOfYearsOfTotalWorkExperience + currentYear - _.TotalWorkExperienceOnDate.Year) == totalWorkExperience);
                        break;
                    case MathOperators.Greater:
                        personalCards = personalCards.Where(_ => (_.NumberOfYearsOfTotalWorkExperience + currentYear - _.TotalWorkExperienceOnDate.Year) > totalWorkExperience);
                        break;
                    case MathOperators.GreaterOrEqual:
                        personalCards = personalCards.Where(_ => (_.NumberOfYearsOfTotalWorkExperience + currentYear - _.TotalWorkExperienceOnDate.Year) >= totalWorkExperience);
                        break;
                    case MathOperators.Less:
                        personalCards = personalCards.Where(_ => (_.NumberOfYearsOfTotalWorkExperience + currentYear - _.TotalWorkExperienceOnDate.Year) < totalWorkExperience);
                        break;
                    case MathOperators.LessOrEqual:
                        personalCards = personalCards.Where(_ => (_.NumberOfYearsOfTotalWorkExperience + currentYear - _.TotalWorkExperienceOnDate.Year) <= totalWorkExperience);
                        break;
                }
            }

            if (int.TryParse(filter.TeachingWorkExperience, out int teachingWorkExperience))
            {
                int currentYear = DateTime.UtcNow.Year;
                switch (filter.TeachingWorkExperienceOperator)
                {
                    case MathOperators.Equal:
                        personalCards = personalCards.Where(_ => (_.NumberOfYearsOfTeachingWorkExperience + currentYear - _.TeachingWorkExperienceOnDate.Year) == teachingWorkExperience);
                        break;
                    case MathOperators.Greater:
                        personalCards = personalCards.Where(_ => (_.NumberOfYearsOfTeachingWorkExperience + currentYear - _.TeachingWorkExperienceOnDate.Year) > teachingWorkExperience);
                        break;
                    case MathOperators.GreaterOrEqual:
                        personalCards = personalCards.Where(_ => (_.NumberOfYearsOfTeachingWorkExperience + currentYear - _.TeachingWorkExperienceOnDate.Year) >= teachingWorkExperience);
                        break;
                    case MathOperators.Less:
                        personalCards = personalCards.Where(_ => (_.NumberOfYearsOfTeachingWorkExperience + currentYear - _.TeachingWorkExperienceOnDate.Year) < teachingWorkExperience);
                        break;
                    case MathOperators.LessOrEqual:
                        personalCards = personalCards.Where(_ => (_.NumberOfYearsOfTeachingWorkExperience + currentYear - _.TeachingWorkExperienceOnDate.Year) <= teachingWorkExperience);
                        break;
                }
            }

            personalCards = personalCards.CustomOrder(_ => _.Name, filter.NameOrderBy)
                .ThenCustomOrder(_ => _.Surname, filter.SurnameOrderBy)
                .ThenCustomOrder(_ => _.Patronymic, filter.PatronymicOrderBy);

            return personalCards.ToList().Select(_ => modelMapper.MapTo<PersonalCard, PersonalCardModel>(_));
        }

        public PersonalCardModel GetById(string id)
        {
            var personalCardEntity = context.PersonalCards.AsNoTracking()
                .Include(_ => _.EmploymentType)
                .Include(_ => _.CycleCommission)
                .Single(_ => _.Id == id);
            var personalCard = modelMapper.MapTo<PersonalCard, PersonalCardModel>(personalCardEntity);
            personalCard.Diplomas = personalCard.Diplomas.OrderBy(_ => _.ReceiptDate).ToList();
            return personalCard;
        }

        public void Save(PersonalCardModel model)
        {
            var personalCard = context.PersonalCards.AsNoTracking()
                .SingleOrDefault(_ => _.Id == model.Id);

            if (personalCard == null)
            {
                var newPersonalCard = modelMapper.MapTo<PersonalCardModel, PersonalCard>(model);
                newPersonalCard.CycleCommission = null;
                var entryEntity = context.PersonalCards.Add(newPersonalCard);
                model.Id = entryEntity.Entity.Id;
            }
            else
            {
                var newPersonalCard = modelMapper.MapTo<PersonalCardModel, PersonalCard>(model);
                var existingDiplomas = context.Diplomas.AsNoTracking().Where(_ => _.PersonalCardId == newPersonalCard.Id).ToList();
                var missedDiplomas = existingDiplomas.Select(_ => _.Id)
                    .Except(newPersonalCard.Diplomas.Select(_ => _.Id));
                context.Diplomas.RemoveRange(context.Diplomas.Where(_ => missedDiplomas.Any(missed => missed == _.Id)));
                newPersonalCard.CycleCommission = null;
                context.PersonalCards.Update(newPersonalCard);
            }
            context.SaveChanges();

            // Subjects
            var personalCardsSubjects = model.Subjects.Select(_ => new PersonalCardSubject() { PersonalCardId = model.Id, SubjectId = _.Id });
            foreach (var personalCardSubject in personalCardsSubjects)
            {
                var personalCardSubjectEntity = context.PersonalCardsSubjects.AsNoTracking()
                    .FirstOrDefault(_ => _.SubjectId == personalCardSubject.SubjectId && _.PersonalCardId == personalCardSubject.PersonalCardId);
                if (personalCardSubjectEntity == null)
                {
                    context.PersonalCardsSubjects.Add(personalCardSubject);
                    context.SaveChanges();
                }
            }

            context.SaveChanges();
        }

        public void Delete(string id)
        {
            var personalCard = context.PersonalCards.AsNoTracking()
                .Include(_ => _.Diplomas)
                .SingleOrDefault(_ => _.Id == id);
            context.Diplomas.RemoveRange(personalCard.Diplomas);
            context.PersonalCards.Remove(personalCard);
            context.SaveChanges();
        }

        public DiplomaSavingResult CanSaveDiploma(DiplomaModel model)
        {
            if (context.Diplomas.AsNoTracking().Any(_ => _.Number.ToLower() == model.Number.ToLower()))
            {
                return new DiplomaSavingResult(isSameNumberExist: true);
            }
            return new DiplomaSavingResult();
        }
    }
}
