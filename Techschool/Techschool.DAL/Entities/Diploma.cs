using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Diagnostics.CodeAnalysis;

namespace Techschool.DAL.Entities
{
    public class Diploma
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
        public string NameOfTheInstitution { get; set; }
        public string Faculty { get; set; }
        public DateTime ReceiptDate { get; set; }
        public DateTime GraduationDate { get; set; }
        public string Specialization { get; set; }
        public string Number { get; set; }

        public string PersonalCardId { get; set; }
        public PersonalCard PersonalCard { get; set; }
    }
}
