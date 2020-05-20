﻿using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Techschool.BLL.Models.Vacations
{
    public class AnnualVacationModel : VacationModel
    {
        public DateTime StartOfVacationDate { get; set; }
        public DateTime EndOfVacationDate { get; set; }
        public string OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }
        public string AnnualVacationFormId { get; set; }
    }
}