using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace Techschool.DAL.Entities
{
    public class PersonalCardSubject
    {
        public string PersonalCardId { get; set; }
        public PersonalCard PersonalCard { get; set; }

        public string SubjectId { get; set; }
        public Subject Subject { get; set; }
    }
}
