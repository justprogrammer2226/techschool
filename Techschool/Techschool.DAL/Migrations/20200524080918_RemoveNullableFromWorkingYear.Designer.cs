﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Techschool.DAL;

namespace Techschool.DAL.Migrations
{
    [DbContext(typeof(TechschoolContext))]
    [Migration("20200524080918_RemoveNullableFromWorkingYear")]
    partial class RemoveNullableFromWorkingYear
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "3.0.1")
                .HasAnnotation("Relational:MaxIdentifierLength", 128)
                .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int")
                        .HasAnnotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn);

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens");
                });

            modelBuilder.Entity("Techschool.DAL.Entities.CycleCommission", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("CycleCommissions");
                });

            modelBuilder.Entity("Techschool.DAL.Entities.CycleCommissionSubject", b =>
                {
                    b.Property<string>("CycleCommissionId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("SubjectId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("CycleCommissionId", "SubjectId");

                    b.HasIndex("SubjectId");

                    b.ToTable("CycleCommissionsSubjects");
                });

            modelBuilder.Entity("Techschool.DAL.Entities.Diploma", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Faculty")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("GraduationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("NameOfTheInstitution")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Number")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PersonalCardId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("ReceiptDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Specialization")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.HasIndex("PersonalCardId");

                    b.ToTable("Diplomas");
                });

            modelBuilder.Entity("Techschool.DAL.Entities.EmploymentType", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("EmploymentTypes");
                });

            modelBuilder.Entity("Techschool.DAL.Entities.PersonalCard", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("AcademicDegree")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Address")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("Birthday")
                        .HasColumnType("datetime2");

                    b.Property<string>("BirthdayAddress")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("CycleCommissionId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Education")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("EmploymentTypeId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime?>("FireDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime?>("HireDate")
                        .HasColumnType("datetime2");

                    b.Property<bool>("IsEmployee")
                        .HasColumnType("bit");

                    b.Property<bool>("IsTeacher")
                        .HasColumnType("bit");

                    b.Property<string>("Languages")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("NumberOfMonthsOfTeachingWorkExperience")
                        .HasColumnType("int");

                    b.Property<int>("NumberOfMonthsOfTotalWorkExperience")
                        .HasColumnType("int");

                    b.Property<int>("NumberOfYearsOfTeachingWorkExperience")
                        .HasColumnType("int");

                    b.Property<int>("NumberOfYearsOfTotalWorkExperience")
                        .HasColumnType("int");

                    b.Property<string>("Patronymic")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<byte[]>("Photo")
                        .HasColumnType("varbinary(max)");

                    b.Property<int>("Sex")
                        .HasColumnType("int");

                    b.Property<string>("Surname")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TeacherQualification")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("TeacherQualificationNote")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("TeachingWorkExperienceOnDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("TotalWorkExperienceOnDate")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("CycleCommissionId");

                    b.HasIndex("Email")
                        .IsUnique()
                        .HasFilter("[Email] IS NOT NULL");

                    b.HasIndex("EmploymentTypeId");

                    b.ToTable("PersonalCards");
                });

            modelBuilder.Entity("Techschool.DAL.Entities.PersonalCardSubject", b =>
                {
                    b.Property<string>("PersonalCardId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("SubjectId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("PersonalCardId", "SubjectId");

                    b.HasIndex("SubjectId");

                    b.ToTable("PersonalCardsSubjects");
                });

            modelBuilder.Entity("Techschool.DAL.Entities.RegistrationRequest", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Password")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("RegistrationRequests");
                });

            modelBuilder.Entity("Techschool.DAL.Entities.Subject", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("Id");

                    b.ToTable("Subjects");
                });

            modelBuilder.Entity("Techschool.DAL.Entities.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FirstName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("LastName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("NormalizedUserName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .HasColumnType("nvarchar(256)")
                        .HasMaxLength(256);

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers");
                });

            modelBuilder.Entity("Techschool.DAL.Entities.Vacations.AdditionalStudyVacation", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("EndOfVacationDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("OrderDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("OrderNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("StartOfVacationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("WorkingYearId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("WorkingYearId");

                    b.ToTable("AdditionalStudyVacations");
                });

            modelBuilder.Entity("Techschool.DAL.Entities.Vacations.AnnualVacation", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("EndOfVacationDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("OrderDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("OrderNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("StartOfVacationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("WorkingYearId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("WorkingYearId");

                    b.ToTable("AnnualVacations");
                });

            modelBuilder.Entity("Techschool.DAL.Entities.Vacations.OtherVacation", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("EndOfVacationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Notes")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("OrderDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("OrderNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("StartOfVacationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("TypeOfVacation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("WorkingYearId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("WorkingYearId");

                    b.ToTable("OtherVacations");
                });

            modelBuilder.Entity("Techschool.DAL.Entities.Vacations.SocialWithChildrenVacation", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("EndOfVacationDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("OrderDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("OrderNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("StartOfVacationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("WorkingYearId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("WorkingYearId");

                    b.ToTable("SocialWithChildrenVacations");
                });

            modelBuilder.Entity("Techschool.DAL.Entities.Vacations.SocialWithPregnancyOrLookVacation", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("EndOfVacationDate")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("OrderDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("OrderNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("StartOfVacationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("TypeOfVacation")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("WorkingYearId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("WorkingYearId");

                    b.ToTable("SocialWithPregnancyOrLookVacations");
                });

            modelBuilder.Entity("Techschool.DAL.Entities.Vacations.WithoutPayrollVacation", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<DateTime>("EndOfVacationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("Notes")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("OrderDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("OrderNumber")
                        .HasColumnType("nvarchar(max)");

                    b.Property<DateTime>("StartOfVacationDate")
                        .HasColumnType("datetime2");

                    b.Property<string>("WorkingYearId")
                        .HasColumnType("nvarchar(450)");

                    b.HasKey("Id");

                    b.HasIndex("WorkingYearId");

                    b.ToTable("WithoutPayrollVacations");
                });

            modelBuilder.Entity("Techschool.DAL.Entities.Vacations.WorkingYear", b =>
                {
                    b.Property<string>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("AdditionalStudyVacationAdditionalInfo")
                        .HasColumnType("nvarchar(max)");

                    b.Property<int>("AnnualVacationDays")
                        .HasColumnType("int");

                    b.Property<DateTime>("EndOfWorkingYear")
                        .HasColumnType("datetime2");

                    b.Property<string>("PersonalCardId")
                        .HasColumnType("nvarchar(450)");

                    b.Property<int>("SocialWithChildrenVacationChildAge")
                        .HasColumnType("int");

                    b.Property<int>("SocialWithChildrenVacationDays")
                        .HasColumnType("int");

                    b.Property<DateTime>("StartOfWorkingYear")
                        .HasColumnType("datetime2");

                    b.HasKey("Id");

                    b.HasIndex("PersonalCardId");

                    b.ToTable("WorkingYears");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("Techschool.DAL.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("Techschool.DAL.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Techschool.DAL.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("Techschool.DAL.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Techschool.DAL.Entities.CycleCommissionSubject", b =>
                {
                    b.HasOne("Techschool.DAL.Entities.CycleCommission", "CycleCommission")
                        .WithMany("CycleCommissionSubjects")
                        .HasForeignKey("CycleCommissionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Techschool.DAL.Entities.Subject", "Subject")
                        .WithMany("CycleCommissionSubjects")
                        .HasForeignKey("SubjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Techschool.DAL.Entities.Diploma", b =>
                {
                    b.HasOne("Techschool.DAL.Entities.PersonalCard", "PersonalCard")
                        .WithMany("Diplomas")
                        .HasForeignKey("PersonalCardId");
                });

            modelBuilder.Entity("Techschool.DAL.Entities.PersonalCard", b =>
                {
                    b.HasOne("Techschool.DAL.Entities.CycleCommission", "CycleCommission")
                        .WithMany("PersonalCards")
                        .HasForeignKey("CycleCommissionId");

                    b.HasOne("Techschool.DAL.Entities.EmploymentType", "EmploymentType")
                        .WithMany()
                        .HasForeignKey("EmploymentTypeId");
                });

            modelBuilder.Entity("Techschool.DAL.Entities.PersonalCardSubject", b =>
                {
                    b.HasOne("Techschool.DAL.Entities.PersonalCard", "PersonalCard")
                        .WithMany("PersonalCardSubjects")
                        .HasForeignKey("PersonalCardId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("Techschool.DAL.Entities.Subject", "Subject")
                        .WithMany("PersonalCardsSubject")
                        .HasForeignKey("SubjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Techschool.DAL.Entities.RegistrationRequest", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", "Role")
                        .WithMany()
                        .HasForeignKey("RoleId");
                });

            modelBuilder.Entity("Techschool.DAL.Entities.Vacations.AdditionalStudyVacation", b =>
                {
                    b.HasOne("Techschool.DAL.Entities.Vacations.WorkingYear", "WorkingYear")
                        .WithMany("AdditionalStudyVacations")
                        .HasForeignKey("WorkingYearId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Techschool.DAL.Entities.Vacations.AnnualVacation", b =>
                {
                    b.HasOne("Techschool.DAL.Entities.Vacations.WorkingYear", "WorkingYear")
                        .WithMany("AnnualVacations")
                        .HasForeignKey("WorkingYearId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Techschool.DAL.Entities.Vacations.OtherVacation", b =>
                {
                    b.HasOne("Techschool.DAL.Entities.Vacations.WorkingYear", "WorkingYear")
                        .WithMany("OtherVacations")
                        .HasForeignKey("WorkingYearId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Techschool.DAL.Entities.Vacations.SocialWithChildrenVacation", b =>
                {
                    b.HasOne("Techschool.DAL.Entities.Vacations.WorkingYear", "WorkingYear")
                        .WithMany("SocialWithChildrenVacations")
                        .HasForeignKey("WorkingYearId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Techschool.DAL.Entities.Vacations.SocialWithPregnancyOrLookVacation", b =>
                {
                    b.HasOne("Techschool.DAL.Entities.Vacations.WorkingYear", "WorkingYear")
                        .WithMany("SocialWithPregnancyOrLookVacations")
                        .HasForeignKey("WorkingYearId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Techschool.DAL.Entities.Vacations.WithoutPayrollVacation", b =>
                {
                    b.HasOne("Techschool.DAL.Entities.Vacations.WorkingYear", "WorkingYear")
                        .WithMany("WithoutPayrollVacations")
                        .HasForeignKey("WorkingYearId")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Techschool.DAL.Entities.Vacations.WorkingYear", b =>
                {
                    b.HasOne("Techschool.DAL.Entities.PersonalCard", "PersonalCard")
                        .WithMany("WorkingYears")
                        .HasForeignKey("PersonalCardId")
                        .OnDelete(DeleteBehavior.Cascade);
                });
#pragma warning restore 612, 618
        }
    }
}
