using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Techschool.DAL.Migrations
{
    public partial class UpdateAnnualVacationForm : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndOfWorkingDate",
                table: "AnnualVacationForms");

            migrationBuilder.DropColumn(
                name: "StartOfWorkingDate",
                table: "AnnualVacationForms");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndOfWorkingYear",
                table: "AnnualVacationForms",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "StartOfWorkingYear",
                table: "AnnualVacationForms",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "EndOfWorkingYear",
                table: "AnnualVacationForms");

            migrationBuilder.DropColumn(
                name: "StartOfWorkingYear",
                table: "AnnualVacationForms");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndOfWorkingDate",
                table: "AnnualVacationForms",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "StartOfWorkingDate",
                table: "AnnualVacationForms",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
