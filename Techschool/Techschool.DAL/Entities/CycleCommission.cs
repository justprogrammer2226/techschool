using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Techschool.DAL.Entities
{
    public class CycleCommission
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
        public string Name { get; set; }

        public ICollection<PersonalCard> PersonalCards { get; set; }
        public ICollection<CycleCommissionSubject> CycleCommissionSubjects { get; set; }
    }
}
