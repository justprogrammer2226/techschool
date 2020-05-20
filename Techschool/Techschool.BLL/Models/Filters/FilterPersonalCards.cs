using System;
using System.Collections.Generic;
using System.Text;

namespace Techschool.BLL.Models.Filters
{
    public class FilterPersonalCards
    {
        public string NameContains { get; set; }
        public string SurnameContains { get; set; }
        public string PatronymicContains { get; set; }
        public string EmploymentType { get; set; }
        public CycleCommissionModel CycleCommission { get; set; }
        public string TotalWorkExperience { get; set; }
        public MathOperators TotalWorkExperienceOperator { get; set; }
        public string TeachingWorkExperience { get; set; }
        public MathOperators TeachingWorkExperienceOperator { get; set; }
        public Order NameOrderBy { get; set; }
        public Order SurnameOrderBy { get; set; }
        public Order PatronymicOrderBy { get; set; }
    }

    public enum MathOperators
    {
        Equal,
        Less,
        LessOrEqual,
        Greater,
        GreaterOrEqual
    }

    public enum Order
    {
        Random,
        Asc,
        Desc,
    }
}
