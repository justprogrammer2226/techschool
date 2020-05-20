using System.Collections.Generic;
using Techschool.BLL.Models;

namespace Techschool.BLL.Services
{
    public interface IDisciplineService
    {
        IEnumerable<SubjectModel> GetSubjects();
        SubjectModel GetSubjectById(string id);
        SavingResult<SubjectModel> SaveSubject(SubjectModel model);
        void DeleteSubjectById(string id);

        IEnumerable<CycleCommissionModel> GetCycleCommissions();
        CycleCommissionModel GetGetCycleCommissionById(string id);
        SavingResult<CycleCommissionModel> SaveCycleCommission(CycleCommissionModel model);
        void DeleteCycleCommissionById(string id);

        void AddSubjectToCycleCommission(string subjectId, string cycleCommissionId);
        void DeleteSubjectFromCycleCommission(string subjectId, string cycleCommissionId);
    }
}
