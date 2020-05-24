using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Techschool.BLL.Models;
using Techschool.BLL.Models.Vacations;
using Techschool.DAL;
using Techschool.DAL.Entities;
using Techschool.DAL.Entities.Vacations;

namespace Techschool.BLL.Services
{
    public class VacationService : IVacationService
    {
        private readonly TechschoolContext context;
        private readonly UserManager<User> userManager;
        private readonly SignInManager<User> signInManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IModelMapper modelMapper;

        public VacationService(UserManager<User> userManager, SignInManager<User> signInManager, TechschoolContext context, RoleManager<IdentityRole> roleManager, IModelMapper modelMapper)
        {
            this.userManager = userManager;
            this.signInManager = signInManager;
            this.context = context;
            this.roleManager = roleManager;
            this.modelMapper = modelMapper;
        }

        public void SaveWorkingYear(WorkingYearModel model)
        {
            var workingYear = context.WorkingYears.AsNoTracking()
                .SingleOrDefault(_ => _.Id == model.Id);

            if (workingYear == null)
            {
                var newWorkingYear = modelMapper.MapTo<WorkingYearModel, WorkingYear>(model);
                context.WorkingYears.Add(newWorkingYear);
            }
            else
            {
                var newWorkingYear = modelMapper.MapTo<WorkingYearModel, WorkingYear>(model);
                context.WorkingYears.Update(newWorkingYear);
            }
            context.SaveChanges();
        }

        public void DeleteWorkingYear(string id)
        {
            var workingYears = context.WorkingYears.SingleOrDefault(_ => _.Id == id);
            context.WorkingYears.Remove(workingYears);
            context.SaveChanges();
        }

        #region Annual Vacation

        public void SaveAnnualVacation(AnnualVacationModel model)
        {
            var vacations = context.AnnualVacations.AsNoTracking()
                .SingleOrDefault(_ => _.Id == model.Id);

            if (vacations == null)
            {
                var newAnnualVacation = modelMapper.MapTo<AnnualVacationModel, AnnualVacation>(model);
                context.AnnualVacations.Add(newAnnualVacation);
            }
            else
            {
                var newAnnualVacation = modelMapper.MapTo<AnnualVacationModel, AnnualVacation>(model);
                context.AnnualVacations.Update(newAnnualVacation);
            }
            context.SaveChanges();
        }

        public void DeleteAnnualVacation(string id)
        {
            var vacation = context.AnnualVacations.SingleOrDefault(_ => _.Id == id);
            context.AnnualVacations.Remove(vacation);
            context.SaveChanges();
        }

        #endregion

        #region Without Payroll Vacation

        public void SaveWithoutPayrollVacation(WithoutPayrollVacationModel model)
        {
            var vacations = context.WithoutPayrollVacations.AsNoTracking()
                .SingleOrDefault(_ => _.Id == model.Id);

            if (vacations == null)
            {
                var newWithoutPayrollVacation = modelMapper.MapTo<WithoutPayrollVacationModel, WithoutPayrollVacation>(model);
                context.WithoutPayrollVacations.Add(newWithoutPayrollVacation);
            }
            else
            {
                var newWithoutPayrollVacation = modelMapper.MapTo<WithoutPayrollVacationModel, WithoutPayrollVacation>(model);
                context.WithoutPayrollVacations.Update(newWithoutPayrollVacation);
            }
            context.SaveChanges();
        }

        public void DeleteWithoutPayrollVacation(string id)
        {
            var vacation = context.WithoutPayrollVacations.SingleOrDefault(_ => _.Id == id);
            context.WithoutPayrollVacations.Remove(vacation);
            context.SaveChanges();
        }

        #endregion

        #region Additional Study Vacation

        public void SaveAdditionalStudyVacation(AdditionalStudyVacationModel model)
        {
            var vacations = context.AdditionalStudyVacations.AsNoTracking()
                .SingleOrDefault(_ => _.Id == model.Id);

            if (vacations == null)
            {
                var newAdditionalStudyVacation = modelMapper.MapTo<AdditionalStudyVacationModel, AdditionalStudyVacation>(model);
                context.AdditionalStudyVacations.Add(newAdditionalStudyVacation);
            }
            else
            {
                var newAdditionalStudyVacation = modelMapper.MapTo<AdditionalStudyVacationModel, AdditionalStudyVacation>(model);
                context.AdditionalStudyVacations.Update(newAdditionalStudyVacation);
            }
            context.SaveChanges();
        }

        public void DeleteAdditionalStudyVacation(string id)
        {
            var vacation = context.AdditionalStudyVacations.SingleOrDefault(_ => _.Id == id);
            context.AdditionalStudyVacations.Remove(vacation);
            context.SaveChanges();
        }

        #endregion

        #region Social With Children Vacation

        public void SaveSocialWithChildrenVacation(SocialWithChildrenVacationModel model)
        {
            var vacations = context.SocialWithChildrenVacations.AsNoTracking()
                .SingleOrDefault(_ => _.Id == model.Id);

            if (vacations == null)
            {
                var newSocialWithChildrenVacation = modelMapper.MapTo<SocialWithChildrenVacationModel, SocialWithChildrenVacation>(model);
                context.SocialWithChildrenVacations.Add(newSocialWithChildrenVacation);
            }
            else
            {
                var newSocialWithChildrenVacation = modelMapper.MapTo<SocialWithChildrenVacationModel, SocialWithChildrenVacation>(model);
                context.SocialWithChildrenVacations.Update(newSocialWithChildrenVacation);
            }
            context.SaveChanges();
        }

        public void DeleteSocialWithChildrenVacation(string id)
        {
            var vacation = context.SocialWithChildrenVacations.SingleOrDefault(_ => _.Id == id);
            context.SocialWithChildrenVacations.Remove(vacation);
            context.SaveChanges();
        }

        #endregion

        #region Social With Pregnancy Or Look Vacation

        public void SaveSocialWithPregnancyOrLookVacation(SocialWithPregnancyOrLookVacationModel model)
        {
            var vacations = context.SocialWithPregnancyOrLookVacations.AsNoTracking()
                .SingleOrDefault(_ => _.Id == model.Id);

            if (vacations == null)
            {
                var newSocialWithPregnancyOrLookVacation = modelMapper.MapTo<SocialWithPregnancyOrLookVacationModel, SocialWithPregnancyOrLookVacation>(model);
                context.SocialWithPregnancyOrLookVacations.Add(newSocialWithPregnancyOrLookVacation);
            }
            else
            {
                var newSocialWithPregnancyOrLookVacation = modelMapper.MapTo<SocialWithPregnancyOrLookVacationModel, SocialWithPregnancyOrLookVacation>(model);
                context.SocialWithPregnancyOrLookVacations.Update(newSocialWithPregnancyOrLookVacation);
            }
            context.SaveChanges();
        }

        public void DeleteSocialWithPregnancyOrLookVacation(string id)
        {
            var vacation = context.SocialWithPregnancyOrLookVacations.SingleOrDefault(_ => _.Id == id);
            context.SocialWithPregnancyOrLookVacations.Remove(vacation);
            context.SaveChanges();
        }
      
        #endregion

        #region Other Vacation

        public void SaveOtherVacation(OtherVacationModel model)
        {
            var vacations = context.OtherVacations.AsNoTracking()
                .SingleOrDefault(_ => _.Id == model.Id);

            if (vacations == null)
            {
                var newOtherVacation = modelMapper.MapTo<OtherVacationModel, OtherVacation>(model);
                context.OtherVacations.Add(newOtherVacation);
            }
            else
            {
                var newOtherVacation = modelMapper.MapTo<OtherVacationModel, OtherVacation>(model);
                context.OtherVacations.Update(newOtherVacation);
            }
            context.SaveChanges();
        }

        public void DeleteOtherVacation(string id)
        {
            var vacation = context.OtherVacations.SingleOrDefault(_ => _.Id == id);
            context.OtherVacations.Remove(vacation);
            context.SaveChanges();
        }

        #endregion
    }
}
