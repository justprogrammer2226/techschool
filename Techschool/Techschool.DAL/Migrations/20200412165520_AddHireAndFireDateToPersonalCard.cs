using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Techschool.DAL.Migrations
{
    public partial class AddHireAndFireDateToPersonalCard : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "FireDate",
                table: "PersonalCards",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "HireDate",
                table: "PersonalCards",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FireDate",
                table: "PersonalCards");

            migrationBuilder.DropColumn(
                name: "HireDate",
                table: "PersonalCards");
        }
    }
}
