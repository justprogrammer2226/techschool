using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Techschool.DAL.Entities
{
    public class PersonalCard
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Patronymic { get; set; }
        public DateTime Birthday { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Photo { get; set; }
        public bool IsEmployee { get; set; }
        public bool IsTeacher { get; set; }

        public string EmploymentTypeId { get; set; }
        public EmploymentType EmploymentType { get; set; }

        public string CycleCommissionId { get; set; }
        public CycleCommission CycleCommission { get; set; }

        public ICollection<PersonalCardSubject> PersonalCardSubjects { get; set; }

    }
}
