using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Techschool.BLL.Models;
using Techschool.DAL;
using Techschool.DAL.Entities;

namespace Techschool.BLL.Services
{
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

        public IEnumerable<PersonalCardModel> GetAll()
        {
            var personalCards = context.PersonalCards.AsNoTracking()
                .Include(_ => _.EmploymentType)
                .Select(_ => modelMapper.MapTo<PersonalCard, PersonalCardModel>(_))
                .ToList();
            return personalCards;
        }

        public PersonalCardModel GetById(string id)
        {
            var personalCardEntity = context.PersonalCards.AsNoTracking()
                .Include(_ => _.EmploymentType)
                .Include(_ => _.TeacherQualification)
                .Include(_ => _.CycleCommission)
                .Single(_ => _.Id == id);
            var personalCard = modelMapper.MapTo<PersonalCard, PersonalCardModel>(personalCardEntity);
            return personalCard;
        }

        public void Save(PersonalCardModel model)
        {
            var personalCard = context.PersonalCards.AsNoTracking()
                .SingleOrDefault(_ => _.Id == model.Id);

            if (personalCard == null)
            {
                var newPersonalCardModel = modelMapper.MapTo<PersonalCardModel, PersonalCard>(model);
                var entryEntity = context.PersonalCards.Add(newPersonalCardModel);
                model.Id = entryEntity.Entity.Id;
            }
            else
            {
                var newPersonalCard = modelMapper.MapTo<PersonalCardModel, PersonalCard>(model);
                var missedDiplomas = context.Diplomas.Where(_ => _.PersonalCardId == newPersonalCard.Id).ToList()
                    .Except(newPersonalCard.Diplomas);
                context.Diplomas.RemoveRange(missedDiplomas);
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
            var personalCard = context.PersonalCards.SingleOrDefault(_ => _.Id == id);
            context.PersonalCards.Remove(personalCard);
        }
    }
}
