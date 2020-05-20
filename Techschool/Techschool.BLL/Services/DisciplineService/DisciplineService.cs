using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Techschool.BLL.Models;
using Techschool.DAL;
using Techschool.DAL.Entities;

namespace Techschool.BLL.Services
{
    public class DisciplineService : IDisciplineService
    {
        private readonly TechschoolContext context;
        private readonly IModelMapper modelMapper;
        public DisciplineService(TechschoolContext context, IModelMapper modelMapper)
        {
            this.context = context;
            this.modelMapper = modelMapper;
        }

        public IEnumerable<SubjectModel> GetSubjects()
        {
            var subjects = context.Subjects.AsNoTracking()
                .Include(_ => _.CycleCommissionSubjects)
                .OrderBy(_ => _.Name)
                .Select(_ => modelMapper.MapTo<Subject, SubjectModel>(_))
                .ToList();
            subjects.ForEach(_ => _.CycleCommissions = _.CycleCommissions.OrderBy(cc => cc.Name).AsEnumerable());
            return subjects;
        }

        public SubjectModel GetSubjectById(string id)
        {
            var subject = context.Subjects.AsNoTracking()
                .Include(_ => _.CycleCommissionSubjects)
                .Where(_ => _.Id == id)
                .Select(_ => modelMapper.MapTo<Subject, SubjectModel>(_))
                .Single();
            return subject;
        }

        public SavingResult<SubjectModel> SaveSubject(SubjectModel model)
        {
            var subject = context.Subjects.AsNoTracking()
                .SingleOrDefault(_ => _.Id == model.Id);

            var subjectWithSameName = context.Subjects.AsNoTracking()
                .FirstOrDefault(_ => _.Name.ToLower() == model.Name.ToLower() && _.Id != model.Id);
            if (subjectWithSameName != null) return new SavingResult<SubjectModel>(isExist: true);

            if (subject == null)
            {
                subject = new Subject
                {
                    Name = model.Name
                };
                context.Subjects.Add(subject);
                context.SaveChanges();
                context.Entry(subject).State = EntityState.Detached;
            }
            else
            {
                subject = context.Subjects.Update(modelMapper.MapTo<SubjectModel, Subject>(model)).Entity;
                context.SaveChanges();
                context.Entry(subject).State = EntityState.Detached;
            }

            return new SavingResult<SubjectModel>(modelMapper.MapTo<Subject, SubjectModel>(subject));
        }

        public void DeleteSubjectById(string id)
        {
            var subject = context.Subjects.AsNoTracking()
                .SingleOrDefault(_ => _.Id == id);
            context.Subjects.Remove(subject);
            context.SaveChanges();
        }

        public IEnumerable<CycleCommissionModel> GetCycleCommissions()
        {
            var cycleCommissions = context.CycleCommissions.AsNoTracking()
                .Include(_ => _.CycleCommissionSubjects)
                .OrderBy(_ => _.Name)
                .Select(_ => modelMapper.MapTo<CycleCommission, CycleCommissionModel>(_))
                .ToList();
            cycleCommissions.ForEach(_ => _.Subjects = _.Subjects.OrderBy(cc => cc.Name).AsEnumerable());
            return cycleCommissions;
        }

        public CycleCommissionModel GetGetCycleCommissionById(string id)
        {
            var cycleCommission = context.CycleCommissions.AsNoTracking()
                .Include(_ => _.CycleCommissionSubjects)
                .Where(_ => _.Id == id)
                .Select(_ => modelMapper.MapTo<CycleCommission, CycleCommissionModel>(_))
                .Single();
            return cycleCommission;
        }

        public SavingResult<CycleCommissionModel> SaveCycleCommission(CycleCommissionModel model)
        {
            var cycleCommission = context.CycleCommissions.AsNoTracking()
                .SingleOrDefault(_ => _.Id == model.Id);

            var cycleCommissionWithSameName = context.CycleCommissions.AsNoTracking()
               .FirstOrDefault(_ => _.Name.ToLower() == model.Name.ToLower() && _.Id != model.Id);
            if (cycleCommissionWithSameName != null) return new SavingResult<CycleCommissionModel>(isExist: true);

            if (cycleCommission == null)
            {
                cycleCommission = new CycleCommission
                {
                    Name = model.Name
                };
                context.CycleCommissions.Add(cycleCommission);
                context.SaveChanges();
                context.Entry(cycleCommission).State = EntityState.Detached;
            }
            else
            {
                cycleCommission = context.CycleCommissions.Update(modelMapper.MapTo<CycleCommissionModel, CycleCommission>(model)).Entity;
                context.SaveChanges();
                context.Entry(cycleCommission).State = EntityState.Detached;
            }

            // Delets existring links
            var cycleCommissionsSubjects = context.CycleCommissionsSubjects.Where(_ => _.CycleCommissionId == cycleCommission.Id)
                .ToList();
            context.CycleCommissionsSubjects.RemoveRange(cycleCommissionsSubjects);
            context.SaveChanges();

            // Creating new cycleCommissionsSubjects
            foreach (var subject in model.Subjects)
            {
                if (subject.Id == null)
                {
                    var newSubject = context.Subjects.Add(modelMapper.MapTo<SubjectModel, Subject>(subject)).Entity;
                    context.SaveChanges();
                    context.Entry(newSubject).State = EntityState.Detached;
                    var newCycleCommisioSubject = new CycleCommissionSubject
                    {
                        CycleCommissionId = model.Id,
                        SubjectId = newSubject.Id
                    };
                    context.CycleCommissionsSubjects.Add(newCycleCommisioSubject);
                    context.SaveChanges();
                    context.Entry(newCycleCommisioSubject).State = EntityState.Detached;
                }
                else
                {
                    var newCycleCommisioSubject = new CycleCommissionSubject
                    {
                        CycleCommissionId = model.Id,
                        SubjectId = subject.Id
                    };
                    context.CycleCommissionsSubjects.Add(newCycleCommisioSubject);
                    context.SaveChanges();
                    context.Entry(newCycleCommisioSubject).State = EntityState.Detached;
                }
                context.SaveChanges();
            }

            return new SavingResult<CycleCommissionModel>(modelMapper.MapTo<CycleCommission, CycleCommissionModel>(cycleCommission));
        }

        public void DeleteCycleCommissionById(string id)
        {
            var cycleCommission = context.CycleCommissions.AsNoTracking()
                .SingleOrDefault(_ => _.Id == id);
            context.CycleCommissions.Remove(cycleCommission);
            context.SaveChanges();
        }

        public void AddSubjectToCycleCommission(string subjectId, string cycleCommissionId)
        {
            var newCycleCommisioSubject = new CycleCommissionSubject
            {
                CycleCommissionId = cycleCommissionId,
                SubjectId = subjectId
            };
            context.CycleCommissionsSubjects.Add(newCycleCommisioSubject);
            context.SaveChanges();
        }

        public void DeleteSubjectFromCycleCommission(string subjectId, string cycleCommissionId)
        {
            var cycleCommissionsSubject = context.CycleCommissionsSubjects.AsNoTracking()
                .SingleOrDefault(_ => _.SubjectId == subjectId && _.CycleCommissionId == cycleCommissionId);
            context.CycleCommissionsSubjects.Remove(cycleCommissionsSubject);
            context.SaveChanges();

            // Deletes subject if no one refers to it
            var subject = context.Subjects.Include(_ => _.CycleCommissionSubjects).SingleOrDefault(_ => _.Id == subjectId);
            if (!subject.CycleCommissionSubjects.Any())
            {
                context.Subjects.Remove(subject);
                context.SaveChanges();
            }
        }
    }
}
