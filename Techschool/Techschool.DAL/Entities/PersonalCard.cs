using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Techschool.DAL.Entities.Vacations;

namespace Techschool.DAL.Entities
{
    public enum Sex
    {
        Male,
        Female
    }

    public class PersonalCard
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
        public byte[] Photo { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Patronymic { get; set; }
        public DateTime Birthday { get; set; }
        public string BirthdayAddress { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public Sex Sex { get; set; }
        public string Education { get; set; }
        public string Languages { get; set; }
        public string AcademicDegree { get; set; }
        public bool IsEmployee { get; set; }
        public bool IsTeacher { get; set; }
        public DateTime TotalWorkExperienceOnDate { get; set; }
        public int NumberOfYearsOfTotalWorkExperience { get; set; }
        public int NumberOfMonthsOfTotalWorkExperience { get; set; }
        public DateTime TeachingWorkExperienceOnDate { get; set; }
        public int NumberOfYearsOfTeachingWorkExperience { get; set; }
        public int NumberOfMonthsOfTeachingWorkExperience { get; set; }

        public string EmploymentTypeId { get; set; }
        public EmploymentType EmploymentType { get; set; }

        public string CycleCommissionId { get; set; }
        public CycleCommission CycleCommission { get; set; }

        public string TeacherQualification { get; set; }
        public string TeacherQualificationNote { get; set; }

        public DateTime? HireDate { get; set; }
        public DateTime? FireDate { get; set; }

        public IEnumerable<PersonalCardSubject> PersonalCardSubjects { get; set; }
        public IEnumerable<Diploma> Diplomas { get; set; }
        public IEnumerable<WorkingYear> WorkingYears { get; set; }
    }
}
