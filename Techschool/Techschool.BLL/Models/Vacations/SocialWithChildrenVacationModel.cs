﻿using System;

namespace Techschool.BLL.Models.Vacations
{
    public class SocialWithChildrenVacationModel : VacationModel
    {
        public DateTime StartOfVacationDate { get; set; }
        public DateTime EndOfVacationDate { get; set; }
        public string OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }
        public string SocialWithChildrenVacationFormId { get; set; }
    }
}
