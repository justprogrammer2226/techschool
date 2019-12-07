using System.Collections.Generic;
using Techschool.BLL.Models;

namespace Techschool.BLL.Services
{
    public interface IDisciplineService
    {
        IEnumerable<SubjectModel> GetSubjects();
        SubjectModel GetSubjectById(string id);
        void SaveSubject(SubjectModel model);
        void DeleteSubjectById(string id);

        IEnumerable<CycleCommissionModel> GetCycleCommissions();
        CycleCommissionModel GetGetCycleCommissionById(string id);
        void SaveCycleCommission(CycleCommissionModel model);
        void DeleteCycleCommissionById(string id);

        void DeleteCycleCommissionSubject(string subjectId, string cycleCommissionId);
    }
}
