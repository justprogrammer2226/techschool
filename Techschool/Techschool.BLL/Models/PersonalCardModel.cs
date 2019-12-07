using System;
using System.Collections.Generic;

namespace Techschool.BLL.Models
{
    public class PersonalCardModel
    {
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
        public string EmploymentType { get; set; }

        public CycleCommissionModel CycleCommission { get; set; }
        public ICollection<SubjectModel> Subjects { get; set; }
    }
}
