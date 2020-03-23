using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace Techschool.DAL.Entities.Vacations
{
    public class Vacation
    {
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public string Id { get; set; }
    }
}
