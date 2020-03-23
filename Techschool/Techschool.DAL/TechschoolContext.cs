using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Techschool.DAL.Entities;
using Techschool.DAL.Entities.Vacations;

namespace Techschool.DAL
{
    public class TechschoolContext : IdentityDbContext<User>
    {
        public DbSet<RegistrationRequest> RegistrationRequests { get; set; }
        public DbSet<PersonalCard> PersonalCards { get; set; }
        public DbSet<EmploymentType> EmploymentTypes { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<CycleCommission> CycleCommissions { get; set; }
        public DbSet<CycleCommissionSubject> CycleCommissionsSubjects { get; set; }
        public DbSet<PersonalCardSubject> PersonalCardsSubjects { get; set; }
        public DbSet<TeacherQualification> TeacherQualifications { get; set; }
        public DbSet<Diploma> Diplomas { get; set; }
        public DbSet<AnnualVacation> AnnualVacations { get; set; }
        public DbSet<AnnualVacationForm> AnnualVacationForms { get; set; }
        public DbSet<WithoutPayrollVacation> WithoutPayrollVacations { get; set; }
        public DbSet<WithoutPayrollVacationForm> WithoutPayrollVacationForms { get; set; }
        public DbSet<AdditionalStudyVacation> AdditionalStudyVacations { get; set; }
        public DbSet<AdditionalStudyVacationForm> AdditionalStudyVacationForms { get; set; }
        public DbSet<SocialWithChildrenVacation> SocialWithChildrenVacations { get; set; }
        public DbSet<SocialWithChildrenVacationForm> SocialWithChildrenVacationForms { get; set; }
        public DbSet<SocialWithPregnancyOrLookVacation> SocialWithPregnancyOrLookVacations { get; set; }
        public DbSet<SocialWithPregnancyOrLookVacationForm> SocialWithPregnancyOrLookVacationForms { get; set; }
        public DbSet<OtherVacation> OtherVacations { get; set; }
        public DbSet<OtherVacationForm> OtherVacationForms { get; set; }

        public TechschoolContext(DbContextOptions<TechschoolContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<PersonalCard>()
                .HasIndex(_ => _.Email)
                .IsUnique();

            modelBuilder.Entity<CycleCommissionSubject>()
                .HasKey(_ => new { _.CycleCommissionId, _.SubjectId });

            modelBuilder.Entity<PersonalCardSubject>()
                .HasKey(_ => new { _.PersonalCardId, _.SubjectId });
        }
    }
}
