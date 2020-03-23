using System.ComponentModel.DataAnnotations.Schema;

namespace Techschool.DAL.Entities.Vacations
{
    public class VacationForm
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
        public string Title { get; set; }

        public string PersonalCardId { get; set; }
        public PersonalCard PersonalCard { get; set; }
    }
}
