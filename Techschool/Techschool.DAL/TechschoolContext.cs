using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Techschool.DAL.Entities;

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
