using System.Collections.Generic;

namespace Techschool.BLL.Models
{
    public class SubjectModel
    {
        public string Id { get; set; }
        public string Name { get; set; }

        public ICollection<CycleCommissionModel> CycleCommissions { get; set; }
    }
}
