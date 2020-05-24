using System;
using System.Collections.Generic;
using Techschool.BLL.Models.Vacations;
using Techschool.DAL.Entities;

namespace Techschool.BLL.Models
{
    public class PersonalCardModel
    {
        public string Id { get; set; }
        public string Photo { get; set; }
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
        public string EmploymentType { get; set; }
        public string TeacherQualification { get; set; }
        public string TeacherQualificationNote { get; set; }
        public string CycleCommissionId { get; set; }
        public CycleCommissionModel CycleCommission { get; set; }
        public DateTime? HireDate { get; set; }
        public DateTime? FireDate { get; set; }

        public IEnumerable<SubjectModel> Subjects { get; set; }
        public IEnumerable<DiplomaModel> Diplomas { get; set; }
        public IEnumerable<WorkingYearModel> WorkingYears { get; set; }
    }
}
