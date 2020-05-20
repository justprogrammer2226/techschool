using System.Collections.Generic;

namespace Techschool.BLL.Models
{
    public class CycleCommissionModel
    {
        public string Id { get; set; }
        public string Name { get; set; }

        public IEnumerable<SubjectModel> Subjects { get; set; }
    }
}
