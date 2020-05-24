using System;

namespace Techschool.DAL.Entities.Vacations
{
    public class SocialWithChildrenVacation : Vacation
    {
        public string OrderNumber { get; set; }
        public DateTime OrderDate { get; set; }
    }
}
