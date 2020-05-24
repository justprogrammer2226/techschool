using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
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
        public DbSet<Diploma> Diplomas { get; set; }
        public DbSet<AnnualVacation> AnnualVacations { get; set; }
        public DbSet<WithoutPayrollVacation> WithoutPayrollVacations { get; set; }
        public DbSet<AdditionalStudyVacation> AdditionalStudyVacations { get; set; }
        public DbSet<SocialWithChildrenVacation> SocialWithChildrenVacations { get; set; }
        public DbSet<SocialWithPregnancyOrLookVacation> SocialWithPregnancyOrLookVacations { get; set; }
        public DbSet<OtherVacation> OtherVacations { get; set; }
        public DbSet<WorkingYear> WorkingYears { get; set; }

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

            modelBuilder.Entity<WorkingYear>()
                .HasOne(_ => _.PersonalCard)
                .WithMany(_ => _.WorkingYears)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<AdditionalStudyVacation>()
                .HasOne(_ => _.WorkingYear)
                .WithMany(_ => _.AdditionalStudyVacations)
                .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<AnnualVacation>()
               .HasOne(_ => _.WorkingYear)
               .WithMany(_ => _.AnnualVacations)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<OtherVacation>()
               .HasOne(_ => _.WorkingYear)
               .WithMany(_ => _.OtherVacations)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<SocialWithChildrenVacation>()
               .HasOne(_ => _.WorkingYear)
               .WithMany(_ => _.SocialWithChildrenVacations)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<SocialWithPregnancyOrLookVacation>()
               .HasOne(_ => _.WorkingYear)
               .WithMany(_ => _.SocialWithPregnancyOrLookVacations)
               .OnDelete(DeleteBehavior.Cascade);

            modelBuilder.Entity<WithoutPayrollVacation>()
               .HasOne(_ => _.WorkingYear)
               .WithMany(_ => _.WithoutPayrollVacations)
               .OnDelete(DeleteBehavior.Cascade);

            foreach (var entityType in modelBuilder.Model.GetEntityTypes())
            {
                foreach (var property in entityType.GetProperties())
                {
                    if (property.ClrType == typeof(DateTime))
                    {
                        modelBuilder.Entity(entityType.ClrType)
                         .Property<DateTime>(property.Name)
                         .HasConversion(
                          v => v.ToUniversalTime(),
                          v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
                    }
                    else if (property.ClrType == typeof(DateTime?))
                    {
                        modelBuilder.Entity(entityType.ClrType)
                         .Property<DateTime?>(property.Name)
                         .HasConversion(
                          v => v.HasValue ? v.Value.ToUniversalTime() : v,
                          v => v.HasValue ? DateTime.SpecifyKind(v.Value, DateTimeKind.Utc) : v);
                    }
                }
            }
        }
    }
}
