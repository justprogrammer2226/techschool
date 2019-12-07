namespace Techschool.DAL.Entities
{
    public class CycleCommissionSubject
    {
        public string CycleCommissionId { get; set; }
        public CycleCommission CycleCommission { get; set; }

        public string SubjectId { get; set; }
        public Subject Subject { get; set; }
    }
}
