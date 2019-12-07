using System.Collections.Generic;

namespace Techschool.BLL.Models
{
    public class CycleCommissionModel
    {
        public string Id { get; set; }
        public string Name { get; set; }

        public ICollection<SubjectModel> Subjects { get; set; }
    }
}
