using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Techschool.DAL.Migrations
{
    public partial class UpdateDiplomasTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Qualification",
                table: "Diplomas");

            migrationBuilder.AddColumn<string>(
                name: "AcademicDegree",
                table: "PersonalCards",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "BirthdayAddress",
                table: "PersonalCards",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Education",
                table: "PersonalCards",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Languages",
                table: "PersonalCards",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "Sex",
                table: "PersonalCards",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Faculty",
                table: "Diplomas",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "NameOfTheInstitution",
                table: "Diplomas",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "ReceiptDate",
                table: "Diplomas",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AcademicDegree",
                table: "PersonalCards");

            migrationBuilder.DropColumn(
                name: "BirthdayAddress",
                table: "PersonalCards");

            migrationBuilder.DropColumn(
                name: "Education",
                table: "PersonalCards");

            migrationBuilder.DropColumn(
                name: "Languages",
                table: "PersonalCards");

            migrationBuilder.DropColumn(
                name: "Sex",
                table: "PersonalCards");

            migrationBuilder.DropColumn(
                name: "Faculty",
                table: "Diplomas");

            migrationBuilder.DropColumn(
                name: "NameOfTheInstitution",
                table: "Diplomas");

            migrationBuilder.DropColumn(
                name: "ReceiptDate",
                table: "Diplomas");

            migrationBuilder.AddColumn<string>(
                name: "Qualification",
                table: "Diplomas",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
