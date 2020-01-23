using AutoMapper;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using Techschool.BLL.Models;
using Techschool.BLL.Models.Vacations;
using Techschool.DAL;
using Techschool.DAL.Entities;
using Techschool.DAL.Entities.Vacations;

namespace Techschool.BLL.Services
{
    public class ModelMapper : IModelMapper
    {
        private readonly IMapper mapper;
        private readonly TechschoolContext context;
        public ModelMapper(TechschoolContext context)
        {
            this.context = context;

            var config = new MapperConfiguration(cfg =>
            {
                CreateMap(cfg);
            });

            mapper = config.CreateMapper();
        }

        public OUT MapTo<IN, OUT>(IN input)
        {
            return mapper.Map<OUT>(input);
        }

        private void CreateMap(IMapperConfigurationExpression cfg)
        {
            cfg.CreateMap<RegistrationRequest, RegistrationRequestModel>()
                .ForMember(destMember => destMember.Role, memberOptions => memberOptions.MapFrom(src => src.Role.Name.ToString()))
                .ForMember(destMember => destMember.Password, memberOptions => memberOptions.Ignore());
            cfg.CreateMap<RegistrationRequestModel, RegistrationRequest>()
                .ForMember(destMember => destMember.RoleId, memberOptions => memberOptions.MapFrom(src => context.Roles.SingleOrDefault(_ => _.Name == src.Role).Id))
                .ForMember(destMember => destMember.Role, memberOptions => memberOptions.Ignore());

            cfg.CreateMap<PersonalCard, PersonalCardModel>()
                .ForMember(destMember => destMember.EmploymentType, memberOptions => memberOptions.MapFrom(src => src.EmploymentType.Name.ToString()))
                .ForMember(destMember => destMember.TeacherQualification, memberOptions => memberOptions.MapFrom(src => src.TeacherQualification.Name.ToString()))
                .ForMember(destMember => destMember.TeacherQualificationNote, memberOptions => memberOptions.MapFrom(src => src.TeacherQualification.Note))
                .ForMember(destMember => destMember.Subjects, memberOptions => memberOptions.MapFrom(_ => GetSubjectModelsByPersonalCardId(_.Id)))
                .ForMember(destMember => destMember.Diplomas, memberOptions => memberOptions.MapFrom(_ => GetDiplomasByPersonalCardId(_.Id)));
            cfg.CreateMap<PersonalCardModel, PersonalCard>()
                .ForMember(destMember => destMember.EmploymentTypeId, memberOptions => memberOptions.MapFrom(src => context.EmploymentTypes.SingleOrDefault(_ => _.Name == src.EmploymentType).Id))
                .ForMember(destMember => destMember.EmploymentType, memberOptions => memberOptions.Ignore())
                .ForMember(destMember => destMember.TeacherQualificationId, memberOptions => memberOptions.MapFrom(src => context.TeacherQualifications.SingleOrDefault(_ => _.Name == src.TeacherQualification).Id))
                .ForMember(destMember => destMember.TeacherQualification, memberOptions => memberOptions.Ignore());

            cfg.CreateMap<CycleCommission, CycleCommissionModel>()
                .ForMember(destMember => destMember.Subjects, memberOptions => memberOptions.MapFrom(_ => GetSubjectModelsByCycleComissionId(_.Id)));
            cfg.CreateMap<CycleCommissionModel, CycleCommission>();

            cfg.CreateMap<Subject, SubjectModel>()
                .ForMember(destMember => destMember.CycleCommissions, memberOptions => memberOptions.MapFrom(_ => GetCycleCommissionModelsBySubjectId(_.Id)));
            cfg.CreateMap<SubjectModel, Subject>();

            cfg.CreateMap<Diploma, DiplomaModel>();
            cfg.CreateMap<DiplomaModel, Diploma>();

            cfg.CreateMap<AnnualVacation, AnnualVacationModel>();
            cfg.CreateMap<AnnualVacationModel, AnnualVacation>();
        }

        private IEnumerable<SubjectModel> GetSubjectModelsByCycleComissionId(string id)
        {
            var subjects = context.CycleCommissionsSubjects.Where(_ => _.CycleCommissionId == id)
                .Select(_ => _.Subject)
                .ToList();
            return subjects.Select(_ => new SubjectModel() { Id = _.Id, Name = _.Name});
        }

        private IEnumerable<CycleCommissionModel> GetCycleCommissionModelsBySubjectId(string id)
        {
            var subjects = context.CycleCommissionsSubjects.Where(_ => _.SubjectId == id)
                .Select(_ => _.CycleCommission)
                .ToList();
            return subjects.Select(_ => new CycleCommissionModel() { Id = _.Id, Name = _.Name });
        }

        private IEnumerable<SubjectModel> GetSubjectModelsByPersonalCardId(string id)
        {
            var subjects = context.PersonalCardsSubjects.Where(_ => _.PersonalCardId == id)
                .Select(_ => _.Subject)
                .ToList();
            return subjects.Select(_ => new SubjectModel() { Id = _.Id, Name = _.Name });
        }

        private IEnumerable<DiplomaModel> GetDiplomasByPersonalCardId(string id)
        {
            var diplomaEntities = context.PersonalCards.AsNoTracking()
                .Include(_ => _.Diplomas)
                .FirstOrDefault(_ => _.Id == id).Diplomas;

            var diplomas = diplomaEntities.Select(_ =>  new DiplomaModel()
                {
                    Id = _.Id,
                    Number = _.Number,
                    GraduationDate = _.GraduationDate,
                    Qualification = _.Qualification,
                    Specialization = _.Specialization
                })
                .ToList();

            return diplomas;
        }
    }
}
