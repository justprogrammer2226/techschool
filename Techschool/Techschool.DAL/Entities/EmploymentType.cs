using System.ComponentModel.DataAnnotations.Schema;

namespace Techschool.DAL.Entities
{
    public class EmploymentType
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
        public string Name { get; set; }
    }
}
