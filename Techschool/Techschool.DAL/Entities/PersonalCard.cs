﻿using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using Techschool.DAL.Entities.Vacations;

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
        public byte[] Photo { get; set; }
        public bool IsEmployee { get; set; }
        public bool IsTeacher { get; set; }
        public DateTime TotalWorkExperienceOnDate { get; set; }
        public string NumberOfYearsOfTotalWorkExperience { get; set; }
        public string NumberOfMonthsOfTotalWorkExperience { get; set; }
        public DateTime TeachingWorkExperienceOnDate { get; set; }
        public string NumberOfYearsOfTeachingWorkExperience { get; set; }
        public string NumberOfMonthsOfTeachingWorkExperience { get; set; }

        public string EmploymentTypeId { get; set; }
        public EmploymentType EmploymentType { get; set; }

        public string CycleCommissionId { get; set; }
        public CycleCommission CycleCommission { get; set; }

        public string TeacherQualification { get; set; }
        public string TeacherQualificationNote { get; set; }

        public ICollection<PersonalCardSubject> PersonalCardSubjects { get; set; }
        public ICollection<Diploma> Diplomas { get; set; }
        public ICollection<AdditionalStudyVacationForm> AdditionalStudyVacationForms { get; set; }
        public ICollection<AnnualVacationForm> AnnualVacationForms { get; set; }
        public ICollection<OtherVacationForm> OtherVacationForms { get; set; }
        public ICollection<SocialWithChildrenVacationForm> SocialWithChildrenVacationForms { get; set; }
        public ICollection<SocialWithPregnancyOrLookVacationForm> SocialWithPregnancyOrLookVacationForms { get; set; }
        public ICollection<WithoutPayrollVacationForm> WithoutPayrollVacationForms { get; set; }
    }
}
