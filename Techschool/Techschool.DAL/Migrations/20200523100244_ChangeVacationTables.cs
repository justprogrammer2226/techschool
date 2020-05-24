using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Techschool.DAL.Migrations
{
    public partial class ChangeVacationTables : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AdditionalStudyVacations_AdditionalStudyVacationForms_AdditionalStudyVacationFormId",
                table: "AdditionalStudyVacations");

            migrationBuilder.DropForeignKey(
                name: "FK_AnnualVacations_AnnualVacationForms_AnnualVacationFormId",
                table: "AnnualVacations");

            migrationBuilder.DropForeignKey(
                name: "FK_OtherVacations_OtherVacationForms_OtherVacationFormId",
                table: "OtherVacations");

            migrationBuilder.DropForeignKey(
                name: "FK_SocialWithChildrenVacations_SocialWithChildrenVacationForms_SocialWithChildrenVacationFormId",
                table: "SocialWithChildrenVacations");

            migrationBuilder.DropForeignKey(
                name: "FK_SocialWithPregnancyOrLookVacations_SocialWithPregnancyOrLookVacationForms_SocialWithPregnancyOrLookVacationFormId",
                table: "SocialWithPregnancyOrLookVacations");

            migrationBuilder.DropForeignKey(
                name: "FK_WithoutPayrollVacations_WithoutPayrollVacationForms_WithoutPayrollVacationFormId",
                table: "WithoutPayrollVacations");

            migrationBuilder.DropTable(
                name: "AdditionalStudyVacationForms");

            migrationBuilder.DropTable(
                name: "AnnualVacationForms");

            migrationBuilder.DropTable(
                name: "OtherVacationForms");

            migrationBuilder.DropTable(
                name: "SocialWithChildrenVacationForms");

            migrationBuilder.DropTable(
                name: "SocialWithPregnancyOrLookVacationForms");

            migrationBuilder.DropTable(
                name: "WithoutPayrollVacationForms");

            migrationBuilder.DropIndex(
                name: "IX_WithoutPayrollVacations_WithoutPayrollVacationFormId",
                table: "WithoutPayrollVacations");

            migrationBuilder.DropIndex(
                name: "IX_SocialWithPregnancyOrLookVacations_SocialWithPregnancyOrLookVacationFormId",
                table: "SocialWithPregnancyOrLookVacations");

            migrationBuilder.DropIndex(
                name: "IX_SocialWithChildrenVacations_SocialWithChildrenVacationFormId",
                table: "SocialWithChildrenVacations");

            migrationBuilder.DropIndex(
                name: "IX_OtherVacations_OtherVacationFormId",
                table: "OtherVacations");

            migrationBuilder.DropIndex(
                name: "IX_AnnualVacations_AnnualVacationFormId",
                table: "AnnualVacations");

            migrationBuilder.DropIndex(
                name: "IX_AdditionalStudyVacations_AdditionalStudyVacationFormId",
                table: "AdditionalStudyVacations");

            migrationBuilder.DropColumn(
                name: "WithoutPayrollVacationFormId",
                table: "WithoutPayrollVacations");

            migrationBuilder.DropColumn(
                name: "SocialWithPregnancyOrLookVacationFormId",
                table: "SocialWithPregnancyOrLookVacations");

            migrationBuilder.DropColumn(
                name: "SocialWithChildrenVacationFormId",
                table: "SocialWithChildrenVacations");

            migrationBuilder.DropColumn(
                name: "OtherVacationFormId",
                table: "OtherVacations");

            migrationBuilder.DropColumn(
                name: "AnnualVacationFormId",
                table: "AnnualVacations");

            migrationBuilder.DropColumn(
                name: "AdditionalStudyVacationFormId",
                table: "AdditionalStudyVacations");

            migrationBuilder.AddColumn<string>(
                name: "WithoutPayrollVacationWorkingYearId",
                table: "WithoutPayrollVacations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SocialWithPregnancyOrLookVacationWorkingYearId",
                table: "SocialWithPregnancyOrLookVacations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SocialWithChildrenVacationWorkingYearId",
                table: "SocialWithChildrenVacations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OtherVacationWorkingYearId",
                table: "OtherVacations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AnnualVacationWorkingYearId",
                table: "AnnualVacations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AdditionalStudyVacationWorkingYearId",
                table: "AdditionalStudyVacations",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "WorkingYears",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    StartOfWorkingYear = table.Column<DateTime>(nullable: false),
                    EndOfWorkingYear = table.Column<DateTime>(nullable: false),
                    PersonalCardId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WorkingYears", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WorkingYears_PersonalCards_PersonalCardId",
                        column: x => x.PersonalCardId,
                        principalTable: "PersonalCards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AdditionalStudyVacationWorkingYear",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    AdditionalInfo = table.Column<string>(nullable: true),
                    WorkingYearId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdditionalStudyVacationWorkingYear", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdditionalStudyVacationWorkingYear_WorkingYears_WorkingYearId",
                        column: x => x.WorkingYearId,
                        principalTable: "WorkingYears",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AnnualVacationWorkingYears",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Days = table.Column<int>(nullable: false),
                    WorkingYearId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnnualVacationWorkingYears", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AnnualVacationWorkingYears_WorkingYears_WorkingYearId",
                        column: x => x.WorkingYearId,
                        principalTable: "WorkingYears",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OtherVacationWorkingYears",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    WorkingYearId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OtherVacationWorkingYears", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OtherVacationWorkingYears_WorkingYears_WorkingYearId",
                        column: x => x.WorkingYearId,
                        principalTable: "WorkingYears",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SocialWithChildrenVacationWorkingYears",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    ChildAge = table.Column<int>(nullable: false),
                    Days = table.Column<int>(nullable: false),
                    WorkingYearId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SocialWithChildrenVacationWorkingYears", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SocialWithChildrenVacationWorkingYears_WorkingYears_WorkingYearId",
                        column: x => x.WorkingYearId,
                        principalTable: "WorkingYears",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SocialWithPregnancyOrLookVacationWorkingYears",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    WorkingYearId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SocialWithPregnancyOrLookVacationWorkingYears", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SocialWithPregnancyOrLookVacationWorkingYears_WorkingYears_WorkingYearId",
                        column: x => x.WorkingYearId,
                        principalTable: "WorkingYears",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WithoutPayrollVacationWorkingYears",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    WorkingYearId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WithoutPayrollVacationWorkingYears", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WithoutPayrollVacationWorkingYears_WorkingYears_WorkingYearId",
                        column: x => x.WorkingYearId,
                        principalTable: "WorkingYears",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WithoutPayrollVacations_WithoutPayrollVacationWorkingYearId",
                table: "WithoutPayrollVacations",
                column: "WithoutPayrollVacationWorkingYearId");

            migrationBuilder.CreateIndex(
                name: "IX_SocialWithPregnancyOrLookVacations_SocialWithPregnancyOrLookVacationWorkingYearId",
                table: "SocialWithPregnancyOrLookVacations",
                column: "SocialWithPregnancyOrLookVacationWorkingYearId");

            migrationBuilder.CreateIndex(
                name: "IX_SocialWithChildrenVacations_SocialWithChildrenVacationWorkingYearId",
                table: "SocialWithChildrenVacations",
                column: "SocialWithChildrenVacationWorkingYearId");

            migrationBuilder.CreateIndex(
                name: "IX_OtherVacations_OtherVacationWorkingYearId",
                table: "OtherVacations",
                column: "OtherVacationWorkingYearId");

            migrationBuilder.CreateIndex(
                name: "IX_AnnualVacations_AnnualVacationWorkingYearId",
                table: "AnnualVacations",
                column: "AnnualVacationWorkingYearId");

            migrationBuilder.CreateIndex(
                name: "IX_AdditionalStudyVacations_AdditionalStudyVacationWorkingYearId",
                table: "AdditionalStudyVacations",
                column: "AdditionalStudyVacationWorkingYearId");

            migrationBuilder.CreateIndex(
                name: "IX_AdditionalStudyVacationWorkingYear_WorkingYearId",
                table: "AdditionalStudyVacationWorkingYear",
                column: "WorkingYearId");

            migrationBuilder.CreateIndex(
                name: "IX_AnnualVacationWorkingYears_WorkingYearId",
                table: "AnnualVacationWorkingYears",
                column: "WorkingYearId");

            migrationBuilder.CreateIndex(
                name: "IX_OtherVacationWorkingYears_WorkingYearId",
                table: "OtherVacationWorkingYears",
                column: "WorkingYearId");

            migrationBuilder.CreateIndex(
                name: "IX_SocialWithChildrenVacationWorkingYears_WorkingYearId",
                table: "SocialWithChildrenVacationWorkingYears",
                column: "WorkingYearId");

            migrationBuilder.CreateIndex(
                name: "IX_SocialWithPregnancyOrLookVacationWorkingYears_WorkingYearId",
                table: "SocialWithPregnancyOrLookVacationWorkingYears",
                column: "WorkingYearId");

            migrationBuilder.CreateIndex(
                name: "IX_WithoutPayrollVacationWorkingYears_WorkingYearId",
                table: "WithoutPayrollVacationWorkingYears",
                column: "WorkingYearId");

            migrationBuilder.CreateIndex(
                name: "IX_WorkingYears_PersonalCardId",
                table: "WorkingYears",
                column: "PersonalCardId");

            migrationBuilder.AddForeignKey(
                name: "FK_AdditionalStudyVacations_AdditionalStudyVacationWorkingYear_AdditionalStudyVacationWorkingYearId",
                table: "AdditionalStudyVacations",
                column: "AdditionalStudyVacationWorkingYearId",
                principalTable: "AdditionalStudyVacationWorkingYear",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AnnualVacations_AnnualVacationWorkingYears_AnnualVacationWorkingYearId",
                table: "AnnualVacations",
                column: "AnnualVacationWorkingYearId",
                principalTable: "AnnualVacationWorkingYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OtherVacations_OtherVacationWorkingYears_OtherVacationWorkingYearId",
                table: "OtherVacations",
                column: "OtherVacationWorkingYearId",
                principalTable: "OtherVacationWorkingYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SocialWithChildrenVacations_SocialWithChildrenVacationWorkingYears_SocialWithChildrenVacationWorkingYearId",
                table: "SocialWithChildrenVacations",
                column: "SocialWithChildrenVacationWorkingYearId",
                principalTable: "SocialWithChildrenVacationWorkingYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SocialWithPregnancyOrLookVacations_SocialWithPregnancyOrLookVacationWorkingYears_SocialWithPregnancyOrLookVacationWorkingYea~",
                table: "SocialWithPregnancyOrLookVacations",
                column: "SocialWithPregnancyOrLookVacationWorkingYearId",
                principalTable: "SocialWithPregnancyOrLookVacationWorkingYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WithoutPayrollVacations_WithoutPayrollVacationWorkingYears_WithoutPayrollVacationWorkingYearId",
                table: "WithoutPayrollVacations",
                column: "WithoutPayrollVacationWorkingYearId",
                principalTable: "WithoutPayrollVacationWorkingYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AdditionalStudyVacations_AdditionalStudyVacationWorkingYear_AdditionalStudyVacationWorkingYearId",
                table: "AdditionalStudyVacations");

            migrationBuilder.DropForeignKey(
                name: "FK_AnnualVacations_AnnualVacationWorkingYears_AnnualVacationWorkingYearId",
                table: "AnnualVacations");

            migrationBuilder.DropForeignKey(
                name: "FK_OtherVacations_OtherVacationWorkingYears_OtherVacationWorkingYearId",
                table: "OtherVacations");

            migrationBuilder.DropForeignKey(
                name: "FK_SocialWithChildrenVacations_SocialWithChildrenVacationWorkingYears_SocialWithChildrenVacationWorkingYearId",
                table: "SocialWithChildrenVacations");

            migrationBuilder.DropForeignKey(
                name: "FK_SocialWithPregnancyOrLookVacations_SocialWithPregnancyOrLookVacationWorkingYears_SocialWithPregnancyOrLookVacationWorkingYea~",
                table: "SocialWithPregnancyOrLookVacations");

            migrationBuilder.DropForeignKey(
                name: "FK_WithoutPayrollVacations_WithoutPayrollVacationWorkingYears_WithoutPayrollVacationWorkingYearId",
                table: "WithoutPayrollVacations");

            migrationBuilder.DropTable(
                name: "AdditionalStudyVacationWorkingYear");

            migrationBuilder.DropTable(
                name: "AnnualVacationWorkingYears");

            migrationBuilder.DropTable(
                name: "OtherVacationWorkingYears");

            migrationBuilder.DropTable(
                name: "SocialWithChildrenVacationWorkingYears");

            migrationBuilder.DropTable(
                name: "SocialWithPregnancyOrLookVacationWorkingYears");

            migrationBuilder.DropTable(
                name: "WithoutPayrollVacationWorkingYears");

            migrationBuilder.DropTable(
                name: "WorkingYears");

            migrationBuilder.DropIndex(
                name: "IX_WithoutPayrollVacations_WithoutPayrollVacationWorkingYearId",
                table: "WithoutPayrollVacations");

            migrationBuilder.DropIndex(
                name: "IX_SocialWithPregnancyOrLookVacations_SocialWithPregnancyOrLookVacationWorkingYearId",
                table: "SocialWithPregnancyOrLookVacations");

            migrationBuilder.DropIndex(
                name: "IX_SocialWithChildrenVacations_SocialWithChildrenVacationWorkingYearId",
                table: "SocialWithChildrenVacations");

            migrationBuilder.DropIndex(
                name: "IX_OtherVacations_OtherVacationWorkingYearId",
                table: "OtherVacations");

            migrationBuilder.DropIndex(
                name: "IX_AnnualVacations_AnnualVacationWorkingYearId",
                table: "AnnualVacations");

            migrationBuilder.DropIndex(
                name: "IX_AdditionalStudyVacations_AdditionalStudyVacationWorkingYearId",
                table: "AdditionalStudyVacations");

            migrationBuilder.DropColumn(
                name: "WithoutPayrollVacationWorkingYearId",
                table: "WithoutPayrollVacations");

            migrationBuilder.DropColumn(
                name: "SocialWithPregnancyOrLookVacationWorkingYearId",
                table: "SocialWithPregnancyOrLookVacations");

            migrationBuilder.DropColumn(
                name: "SocialWithChildrenVacationWorkingYearId",
                table: "SocialWithChildrenVacations");

            migrationBuilder.DropColumn(
                name: "OtherVacationWorkingYearId",
                table: "OtherVacations");

            migrationBuilder.DropColumn(
                name: "AnnualVacationWorkingYearId",
                table: "AnnualVacations");

            migrationBuilder.DropColumn(
                name: "AdditionalStudyVacationWorkingYearId",
                table: "AdditionalStudyVacations");

            migrationBuilder.AddColumn<string>(
                name: "WithoutPayrollVacationFormId",
                table: "WithoutPayrollVacations",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SocialWithPregnancyOrLookVacationFormId",
                table: "SocialWithPregnancyOrLookVacations",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SocialWithChildrenVacationFormId",
                table: "SocialWithChildrenVacations",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OtherVacationFormId",
                table: "OtherVacations",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AnnualVacationFormId",
                table: "AnnualVacations",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AdditionalStudyVacationFormId",
                table: "AdditionalStudyVacations",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AdditionalStudyVacationForms",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AdditionalInfo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    PersonalCardId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdditionalStudyVacationForms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdditionalStudyVacationForms_PersonalCards_PersonalCardId",
                        column: x => x.PersonalCardId,
                        principalTable: "PersonalCards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AnnualVacationForms",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Days = table.Column<int>(type: "int", nullable: false),
                    EndOfWorkingYear = table.Column<DateTime>(type: "datetime2", nullable: false),
                    PersonalCardId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    StartOfWorkingYear = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AnnualVacationForms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AnnualVacationForms_PersonalCards_PersonalCardId",
                        column: x => x.PersonalCardId,
                        principalTable: "PersonalCards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OtherVacationForms",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PersonalCardId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OtherVacationForms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OtherVacationForms_PersonalCards_PersonalCardId",
                        column: x => x.PersonalCardId,
                        principalTable: "PersonalCards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SocialWithChildrenVacationForms",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ChildAge = table.Column<int>(type: "int", nullable: false),
                    Days = table.Column<int>(type: "int", nullable: false),
                    PersonalCardId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SocialWithChildrenVacationForms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SocialWithChildrenVacationForms_PersonalCards_PersonalCardId",
                        column: x => x.PersonalCardId,
                        principalTable: "PersonalCards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "SocialWithPregnancyOrLookVacationForms",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PersonalCardId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SocialWithPregnancyOrLookVacationForms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SocialWithPregnancyOrLookVacationForms_PersonalCards_PersonalCardId",
                        column: x => x.PersonalCardId,
                        principalTable: "PersonalCards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "WithoutPayrollVacationForms",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    PersonalCardId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WithoutPayrollVacationForms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WithoutPayrollVacationForms_PersonalCards_PersonalCardId",
                        column: x => x.PersonalCardId,
                        principalTable: "PersonalCards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_WithoutPayrollVacations_WithoutPayrollVacationFormId",
                table: "WithoutPayrollVacations",
                column: "WithoutPayrollVacationFormId");

            migrationBuilder.CreateIndex(
                name: "IX_SocialWithPregnancyOrLookVacations_SocialWithPregnancyOrLookVacationFormId",
                table: "SocialWithPregnancyOrLookVacations",
                column: "SocialWithPregnancyOrLookVacationFormId");

            migrationBuilder.CreateIndex(
                name: "IX_SocialWithChildrenVacations_SocialWithChildrenVacationFormId",
                table: "SocialWithChildrenVacations",
                column: "SocialWithChildrenVacationFormId");

            migrationBuilder.CreateIndex(
                name: "IX_OtherVacations_OtherVacationFormId",
                table: "OtherVacations",
                column: "OtherVacationFormId");

            migrationBuilder.CreateIndex(
                name: "IX_AnnualVacations_AnnualVacationFormId",
                table: "AnnualVacations",
                column: "AnnualVacationFormId");

            migrationBuilder.CreateIndex(
                name: "IX_AdditionalStudyVacations_AdditionalStudyVacationFormId",
                table: "AdditionalStudyVacations",
                column: "AdditionalStudyVacationFormId");

            migrationBuilder.CreateIndex(
                name: "IX_AdditionalStudyVacationForms_PersonalCardId",
                table: "AdditionalStudyVacationForms",
                column: "PersonalCardId");

            migrationBuilder.CreateIndex(
                name: "IX_AnnualVacationForms_PersonalCardId",
                table: "AnnualVacationForms",
                column: "PersonalCardId");

            migrationBuilder.CreateIndex(
                name: "IX_OtherVacationForms_PersonalCardId",
                table: "OtherVacationForms",
                column: "PersonalCardId");

            migrationBuilder.CreateIndex(
                name: "IX_SocialWithChildrenVacationForms_PersonalCardId",
                table: "SocialWithChildrenVacationForms",
                column: "PersonalCardId");

            migrationBuilder.CreateIndex(
                name: "IX_SocialWithPregnancyOrLookVacationForms_PersonalCardId",
                table: "SocialWithPregnancyOrLookVacationForms",
                column: "PersonalCardId");

            migrationBuilder.CreateIndex(
                name: "IX_WithoutPayrollVacationForms_PersonalCardId",
                table: "WithoutPayrollVacationForms",
                column: "PersonalCardId");

            migrationBuilder.AddForeignKey(
                name: "FK_AdditionalStudyVacations_AdditionalStudyVacationForms_AdditionalStudyVacationFormId",
                table: "AdditionalStudyVacations",
                column: "AdditionalStudyVacationFormId",
                principalTable: "AdditionalStudyVacationForms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AnnualVacations_AnnualVacationForms_AnnualVacationFormId",
                table: "AnnualVacations",
                column: "AnnualVacationFormId",
                principalTable: "AnnualVacationForms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OtherVacations_OtherVacationForms_OtherVacationFormId",
                table: "OtherVacations",
                column: "OtherVacationFormId",
                principalTable: "OtherVacationForms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SocialWithChildrenVacations_SocialWithChildrenVacationForms_SocialWithChildrenVacationFormId",
                table: "SocialWithChildrenVacations",
                column: "SocialWithChildrenVacationFormId",
                principalTable: "SocialWithChildrenVacationForms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SocialWithPregnancyOrLookVacations_SocialWithPregnancyOrLookVacationForms_SocialWithPregnancyOrLookVacationFormId",
                table: "SocialWithPregnancyOrLookVacations",
                column: "SocialWithPregnancyOrLookVacationFormId",
                principalTable: "SocialWithPregnancyOrLookVacationForms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WithoutPayrollVacations_WithoutPayrollVacationForms_WithoutPayrollVacationFormId",
                table: "WithoutPayrollVacations",
                column: "WithoutPayrollVacationFormId",
                principalTable: "WithoutPayrollVacationForms",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
