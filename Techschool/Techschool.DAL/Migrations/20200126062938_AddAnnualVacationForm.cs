using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Techschool.DAL.Migrations
{
    public partial class AddAnnualVacationForm : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AnnualVacations_PersonalCards_PersonalCardId",
                table: "AnnualVacations");

            migrationBuilder.DropIndex(
                name: "IX_AnnualVacations_PersonalCardId",
                table: "AnnualVacations");

            migrationBuilder.DropColumn(
                name: "EndVacationDate",
                table: "AnnualVacations");

            migrationBuilder.DropColumn(
                name: "PersonalCardId",
                table: "AnnualVacations");

            migrationBuilder.DropColumn(
                name: "StartVacationDate",
                table: "AnnualVacations");

            migrationBuilder.AddColumn<string>(
                name: "AnnualVacationFormId",
                table: "AnnualVacations",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "EndOfVacationDate",
                table: "AnnualVacations",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<DateTime>(
                name: "StartOfVacationDate",
                table: "AnnualVacations",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateTable(
                name: "AnnualVacationForms",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    StartOfWorkingDate = table.Column<DateTime>(nullable: false),
                    EndOfWorkingDate = table.Column<DateTime>(nullable: false),
                    Days = table.Column<int>(nullable: false),
                    PersonalCardId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnnualVacationForms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AnnualVacationForms_PersonalCards_PersonalCardId",
                        column: x => x.PersonalCardId,
                        principalTable: "PersonalCards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AnnualVacations_AnnualVacationFormId",
                table: "AnnualVacations",
                column: "AnnualVacationFormId");

            migrationBuilder.CreateIndex(
                name: "IX_AnnualVacationForms_PersonalCardId",
                table: "AnnualVacationForms",
                column: "PersonalCardId");

            migrationBuilder.AddForeignKey(
                name: "FK_AnnualVacations_AnnualVacationForms_AnnualVacationFormId",
                table: "AnnualVacations",
                column: "AnnualVacationFormId",
                principalTable: "AnnualVacationForms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AnnualVacations_AnnualVacationForms_AnnualVacationFormId",
                table: "AnnualVacations");

            migrationBuilder.DropTable(
                name: "AnnualVacationForms");

            migrationBuilder.DropIndex(
                name: "IX_AnnualVacations_AnnualVacationFormId",
                table: "AnnualVacations");

            migrationBuilder.DropColumn(
                name: "AnnualVacationFormId",
                table: "AnnualVacations");

            migrationBuilder.DropColumn(
                name: "EndOfVacationDate",
                table: "AnnualVacations");

            migrationBuilder.DropColumn(
                name: "StartOfVacationDate",
                table: "AnnualVacations");

            migrationBuilder.AddColumn<DateTime>(
                name: "EndVacationDate",
                table: "AnnualVacations",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "PersonalCardId",
                table: "AnnualVacations",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "StartVacationDate",
                table: "AnnualVacations",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.CreateIndex(
                name: "IX_AnnualVacations_PersonalCardId",
                table: "AnnualVacations",
                column: "PersonalCardId");

            migrationBuilder.AddForeignKey(
                name: "FK_AnnualVacations_PersonalCards_PersonalCardId",
                table: "AnnualVacations",
                column: "PersonalCardId",
                principalTable: "PersonalCards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
