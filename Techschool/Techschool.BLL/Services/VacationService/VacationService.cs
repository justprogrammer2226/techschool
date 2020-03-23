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

        public IEnumerable<AnnualVacationFormModel> GetAnnualVacationFormsByPersonalCardId(string id)
        {
            var forms = context.AnnualVacationForms.AsNoTracking()
                .Where(_ => _.PersonalCardId == id)
                .Include(_ => _.AnnualVacations)
                .Select(_ => modelMapper.MapTo<AnnualVacationForm, AnnualVacationFormModel>(_))
                .ToList();
            return forms;
        }

        public AnnualVacationFormModel GetAnnualVacationForm(string personalCardId, string formId)
        {
            var form = context.AnnualVacationForms.AsNoTracking()
                .Where(_ => _.PersonalCardId == personalCardId && _.Id == formId)
                .Include(_ => _.AnnualVacations)
                .Select(_ => modelMapper.MapTo<AnnualVacationForm, AnnualVacationFormModel>(_))
                .SingleOrDefault();
            return form;
        }

        public void SaveAnnualVacationForm(AnnualVacationFormModel model)
        {
            var form = context.AnnualVacationForms.AsNoTracking()
                .SingleOrDefault(_ => _.Id == model.Id);

            if (form == null)
            {
                var newAnnualVacationForm = modelMapper.MapTo<AnnualVacationFormModel, AnnualVacationForm>(model);
                context.AnnualVacationForms.Add(newAnnualVacationForm);
            }
            else
            {
                var newAnnualVacationForm = modelMapper.MapTo<AnnualVacationFormModel, AnnualVacationForm>(model);
                context.AnnualVacationForms.Update(newAnnualVacationForm);
            }
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

        public IEnumerable<WithoutPayrollVacationFormModel> GetWithoutPayrollVacationFormsByPersonalCardId(string id)
        {
            var forms = context.WithoutPayrollVacationForms.AsNoTracking()
                .Where(_ => _.PersonalCardId == id)
                .Include(_ => _.WithoutPayrollVacations)
                .Select(_ => modelMapper.MapTo<WithoutPayrollVacationForm, WithoutPayrollVacationFormModel>(_))
                .ToList();
            return forms;
        }

        public WithoutPayrollVacationFormModel GetWithoutPayrollVacationForm(string personalCardId, string formId)
        {
            var form = context.WithoutPayrollVacationForms.AsNoTracking()
                .Where(_ => _.PersonalCardId == personalCardId && _.Id == formId)
                .Include(_ => _.WithoutPayrollVacations)
                .Select(_ => modelMapper.MapTo<WithoutPayrollVacationForm, WithoutPayrollVacationFormModel>(_))
                .SingleOrDefault();
            return form;
        }

        public void SaveWithoutPayrollVacationForm(WithoutPayrollVacationFormModel model)
        {
            var form = context.WithoutPayrollVacationForms.AsNoTracking()
                .SingleOrDefault(_ => _.Id == model.Id);

            if (form == null)
            {
                var newWithoutPayrollVacationForm = modelMapper.MapTo<WithoutPayrollVacationFormModel, WithoutPayrollVacationForm>(model);
                context.WithoutPayrollVacationForms.Add(newWithoutPayrollVacationForm);
            }
            else
            {
                var newWithoutPayrollVacationForm = modelMapper.MapTo<WithoutPayrollVacationFormModel, WithoutPayrollVacationForm>(model);
                context.WithoutPayrollVacationForms.Update(newWithoutPayrollVacationForm);
            }
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

        public IEnumerable<AdditionalStudyVacationFormModel> GetAdditionalStudyVacationFormsByPersonalCardId(string id)
        {
            var forms = context.AdditionalStudyVacationForms.AsNoTracking()
                .Where(_ => _.PersonalCardId == id)
                .Include(_ => _.AdditionalStudyVacations)
                .Select(_ => modelMapper.MapTo<AdditionalStudyVacationForm, AdditionalStudyVacationFormModel>(_))
                .ToList();
            return forms;
        }

        public AdditionalStudyVacationFormModel GetAdditionalStudyVacationForm(string personalCardId, string formId)
        {
            var form = context.AdditionalStudyVacationForms.AsNoTracking()
                .Where(_ => _.PersonalCardId == personalCardId && _.Id == formId)
                .Include(_ => _.AdditionalStudyVacations)
                .Select(_ => modelMapper.MapTo<AdditionalStudyVacationForm, AdditionalStudyVacationFormModel>(_))
                .SingleOrDefault();
            return form;
        }

        public void SaveAdditionalStudyVacationForm(AdditionalStudyVacationFormModel model)
        {
            var form = context.AdditionalStudyVacationForms.AsNoTracking()
                .SingleOrDefault(_ => _.Id == model.Id);

            if (form == null)
            {
                var newAdditionalStudyVacationForm = modelMapper.MapTo<AdditionalStudyVacationFormModel, AdditionalStudyVacationForm>(model);
                context.AdditionalStudyVacationForms.Add(newAdditionalStudyVacationForm);
            }
            else
            {
                var newAdditionalStudyVacationForm = modelMapper.MapTo<AdditionalStudyVacationFormModel, AdditionalStudyVacationForm>(model);
                context.AdditionalStudyVacationForms.Update(newAdditionalStudyVacationForm);
            }
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

        public IEnumerable<SocialWithChildrenVacationFormModel> GetSocialWithChildrenVacationFormsByPersonalCardId(string id)
        {
            var forms = context.SocialWithChildrenVacationForms.AsNoTracking()
                .Where(_ => _.PersonalCardId == id)
                .Include(_ => _.SocialWithChildrenVacations)
                .Select(_ => modelMapper.MapTo<SocialWithChildrenVacationForm, SocialWithChildrenVacationFormModel>(_))
                .ToList();
            return forms;
        }

        public SocialWithChildrenVacationFormModel GetSocialWithChildrenVacationForm(string personalCardId, string formId)
        {
            var form = context.SocialWithChildrenVacationForms.AsNoTracking()
                .Where(_ => _.PersonalCardId == personalCardId && _.Id == formId)
                .Include(_ => _.SocialWithChildrenVacations)
                .Select(_ => modelMapper.MapTo<SocialWithChildrenVacationForm, SocialWithChildrenVacationFormModel>(_))
                .SingleOrDefault();
            return form;
        }

        public void SaveSocialWithChildrenVacationForm(SocialWithChildrenVacationFormModel model)
        {
            var form = context.SocialWithChildrenVacationForms.AsNoTracking()
                .SingleOrDefault(_ => _.Id == model.Id);

            if (form == null)
            {
                var newSocialWithChildrenVacationForm = modelMapper.MapTo<SocialWithChildrenVacationFormModel, SocialWithChildrenVacationForm>(model);
                context.SocialWithChildrenVacationForms.Add(newSocialWithChildrenVacationForm);
            }
            else
            {
                var newSocialWithChildrenVacationForm = modelMapper.MapTo<SocialWithChildrenVacationFormModel, SocialWithChildrenVacationForm>(model);
                context.SocialWithChildrenVacationForms.Update(newSocialWithChildrenVacationForm);
            }
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

        public IEnumerable<SocialWithPregnancyOrLookVacationFormModel> GetSocialWithPregnancyOrLookVacationFormsByPersonalCardId(string id)
        {
            var forms = context.SocialWithPregnancyOrLookVacationForms.AsNoTracking()
                .Where(_ => _.PersonalCardId == id)
                .Include(_ => _.SocialWithPregnancyOrLookVacations)
                .Select(_ => modelMapper.MapTo<SocialWithPregnancyOrLookVacationForm, SocialWithPregnancyOrLookVacationFormModel>(_))
                .ToList();
            return forms;
        }

        public SocialWithPregnancyOrLookVacationFormModel GetSocialWithPregnancyOrLookVacationForm(string personalCardId, string formId)
        {
            var form = context.SocialWithPregnancyOrLookVacationForms.AsNoTracking()
                .Where(_ => _.PersonalCardId == personalCardId && _.Id == formId)
                .Include(_ => _.SocialWithPregnancyOrLookVacations)
                .Select(_ => modelMapper.MapTo<SocialWithPregnancyOrLookVacationForm, SocialWithPregnancyOrLookVacationFormModel>(_))
                .SingleOrDefault();
            return form;
        }

        public void SaveSocialWithPregnancyOrLookVacationForm(SocialWithPregnancyOrLookVacationFormModel model)
        {
            var form = context.SocialWithPregnancyOrLookVacationForms.AsNoTracking()
                .SingleOrDefault(_ => _.Id == model.Id);

            if (form == null)
            {
                var newSocialWithPregnancyOrLookVacationForm = modelMapper.MapTo<SocialWithPregnancyOrLookVacationFormModel, SocialWithPregnancyOrLookVacationForm>(model);
                context.SocialWithPregnancyOrLookVacationForms.Add(newSocialWithPregnancyOrLookVacationForm);
            }
            else
            {
                var newSocialWithPregnancyOrLookVacationForm = modelMapper.MapTo<SocialWithPregnancyOrLookVacationFormModel, SocialWithPregnancyOrLookVacationForm>(model);
                context.SocialWithPregnancyOrLookVacationForms.Update(newSocialWithPregnancyOrLookVacationForm);
            }
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

        public IEnumerable<OtherVacationFormModel> GetOtherVacationFormsByPersonalCardId(string id)
        {
            var forms = context.OtherVacationForms.AsNoTracking()
                .Where(_ => _.PersonalCardId == id)
                .Include(_ => _.OtherVacations)
                .Select(_ => modelMapper.MapTo<OtherVacationForm, OtherVacationFormModel>(_))
                .ToList();
            return forms;
        }

        public OtherVacationFormModel GetOtherVacationForm(string personalCardId, string formId)
        {
            var form = context.OtherVacationForms.AsNoTracking()
                .Where(_ => _.PersonalCardId == personalCardId && _.Id == formId)
                .Include(_ => _.OtherVacations)
                .Select(_ => modelMapper.MapTo<OtherVacationForm, OtherVacationFormModel>(_))
                .SingleOrDefault();
            return form;
        }

        public void SaveOtherVacationForm(OtherVacationFormModel model)
        {
            var form = context.OtherVacationForms.AsNoTracking()
                .SingleOrDefault(_ => _.Id == model.Id);

            if (form == null)
            {
                var newOtherVacationForm = modelMapper.MapTo<OtherVacationFormModel, OtherVacationForm>(model);
                context.OtherVacationForms.Add(newOtherVacationForm);
            }
            else
            {
                var newOtherVacationForm = modelMapper.MapTo<OtherVacationFormModel, OtherVacationForm>(model);
                context.OtherVacationForms.Update(newOtherVacationForm);
            }
            context.SaveChanges();
        }

        #endregion
    }
}
