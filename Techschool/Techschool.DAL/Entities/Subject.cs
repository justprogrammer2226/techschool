using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Techschool.DAL.Entities
{
    public class Subject
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
        public string Name { get; set; }

        public ICollection<CycleCommissionSubject> CycleCommissionSubjects { get; set; }
        public ICollection<PersonalCardSubject> PersonalCardsSubject { get; set; }
    }
}
