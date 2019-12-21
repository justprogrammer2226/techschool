using System;

namespace Techschool.BLL.Models
{
    public class DiplomaModel
    {
        public string Id { get; set; }
        public string Number { get; set; }
        public DateTime GraduationDate { get; set; }
        public string Qualification { get; set; }
        public string Specialization { get; set; }
        public string PersonalCardId { get; set; }
        public PersonalCardModel PersonalCard { get; set; }
    }
}
