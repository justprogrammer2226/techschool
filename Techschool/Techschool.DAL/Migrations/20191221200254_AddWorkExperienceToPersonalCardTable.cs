using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Techschool.DAL.Migrations
{
    public partial class AddWorkExperienceToPersonalCardTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "NumberOfMonthsOfTeachingWorkExperience",
                table: "PersonalCards",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NumberOfMonthsOfTotalWorkExperience",
                table: "PersonalCards",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NumberOfYearsOfTeachingWorkExperience",
                table: "PersonalCards",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NumberOfYearsOfTotalWorkExperience",
                table: "PersonalCards",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "TeachingWorkExperienceOnDate",
                table: "PersonalCards",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "TotalWorkExperienceOnDate",
                table: "PersonalCards",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "NumberOfMonthsOfTeachingWorkExperience",
                table: "PersonalCards");

            migrationBuilder.DropColumn(
                name: "NumberOfMonthsOfTotalWorkExperience",
                table: "PersonalCards");

            migrationBuilder.DropColumn(
                name: "NumberOfYearsOfTeachingWorkExperience",
                table: "PersonalCards");

            migrationBuilder.DropColumn(
                name: "NumberOfYearsOfTotalWorkExperience",
                table: "PersonalCards");

            migrationBuilder.DropColumn(
                name: "TeachingWorkExperienceOnDate",
                table: "PersonalCards");

            migrationBuilder.DropColumn(
                name: "TotalWorkExperienceOnDate",
                table: "PersonalCards");
        }
    }
}
