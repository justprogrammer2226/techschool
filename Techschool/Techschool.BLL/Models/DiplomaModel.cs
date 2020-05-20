using System;

namespace Techschool.BLL.Models
{
    public class DiplomaModel
    {
        public string Id { get; set; }
        public string NameOfTheInstitution { get; set; }
        public string Faculty { get; set; }
        public DateTime ReceiptDate { get; set; }
        public DateTime GraduationDate { get; set; }
        public string Specialization { get; set; }
        public string Number { get; set; }

        public string PersonalCardId { get; set; }
        public PersonalCardModel PersonalCard { get; set; }
    }
}
