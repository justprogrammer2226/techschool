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
                .Select(_ => modelMapper.MapTo<Subject, SubjectModel>(_))
                .ToList();
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

        public void SaveSubject(SubjectModel model)
        {
            var subject = context.Subjects.AsNoTracking()
                .SingleOrDefault(_ => _.Id == model.Id);

            if (subject == null)
            {
                var newSubject = new Subject
                {
                    Name = model.Name
                };
                context.Subjects.Add(newSubject);
                context.SaveChanges();
                context.Entry(newSubject).State = EntityState.Detached;
            }
            else
            {
                foreach (var cycleCommission in model.CycleCommissions)
                {
                    var cycleCommissionSubjectEntity = context.CycleCommissionsSubjects.AsNoTracking()
                        .FirstOrDefault(_ => _.SubjectId == model.Id && _.CycleCommissionId == cycleCommission.Id);
                    if (cycleCommissionSubjectEntity == null)
                    {
                        var newCycleCommisioSubject = new CycleCommissionSubject
                        {
                            CycleCommissionId = cycleCommission.Id,
                            SubjectId = model.Id
                        };
                        context.CycleCommissionsSubjects.Add(newCycleCommisioSubject);
                        context.SaveChanges();
                        context.Entry(newCycleCommisioSubject).State = EntityState.Detached;
                    }
                }
            }
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
                .Select(_ => modelMapper.MapTo<CycleCommission, CycleCommissionModel>(_))
                .ToList();
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

        public void SaveCycleCommission(CycleCommissionModel model)
        {
            var cycleCommission = context.CycleCommissions.AsNoTracking()
                .SingleOrDefault(_ => _.Id == model.Id);

            if (cycleCommission == null)
            {
                var newCycleCommission = new CycleCommission
                {
                    Name = model.Name
                };
                context.CycleCommissions.Add(newCycleCommission);
                context.SaveChanges();
                context.Entry(newCycleCommission).State = EntityState.Detached;
            }
            else
            {
                foreach (var subject in model.Subjects)
                {
                    var cycleCommissionSubjectEntity = context.CycleCommissionsSubjects.AsNoTracking()
                        .FirstOrDefault(_ => _.SubjectId == subject.Id && _.CycleCommissionId == model.Id);
                    if (cycleCommissionSubjectEntity == null)
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
                }
            }
        }

        public void DeleteCycleCommissionById(string id)
        {
            var cycleCommission = context.CycleCommissions.AsNoTracking()
                .SingleOrDefault(_ => _.Id == id);
            context.CycleCommissions.Remove(cycleCommission);
            context.SaveChanges();
        }

        public void DeleteCycleCommissionSubject(string subjectId, string cycleCommissionId)
        {
            var cycleCommisionSubject = context.CycleCommissionsSubjects.AsNoTracking()
                .FirstOrDefault(_ => _.SubjectId == subjectId && _.CycleCommissionId == cycleCommissionId);
            context.CycleCommissionsSubjects.Remove(cycleCommisionSubject);
            context.SaveChanges();
        }
    }
}
