using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Techschool.DAL.Migrations
{
    public partial class AddNewVacationTypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdditionalStudyVacationForms",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    PersonalCardId = table.Column<string>(nullable: true),
                    AdditionalInfo = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdditionalStudyVacationForms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdditionalStudyVacationForms_PersonalCards_PersonalCardId",
                        column: x => x.PersonalCardId,
                        principalTable: "PersonalCards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OtherVacationForms",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    PersonalCardId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OtherVacationForms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OtherVacationForms_PersonalCards_PersonalCardId",
                        column: x => x.PersonalCardId,
                        principalTable: "PersonalCards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SocialWithChildrenVacationForms",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    PersonalCardId = table.Column<string>(nullable: true),
                    ChildAge = table.Column<int>(nullable: false),
                    Days = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SocialWithChildrenVacationForms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SocialWithChildrenVacationForms_PersonalCards_PersonalCardId",
                        column: x => x.PersonalCardId,
                        principalTable: "PersonalCards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SocialWithPregnancyOrLookVacationForms",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    PersonalCardId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SocialWithPregnancyOrLookVacationForms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SocialWithPregnancyOrLookVacationForms_PersonalCards_PersonalCardId",
                        column: x => x.PersonalCardId,
                        principalTable: "PersonalCards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WithoutPayrollVacationForms",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Title = table.Column<string>(nullable: true),
                    PersonalCardId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WithoutPayrollVacationForms", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WithoutPayrollVacationForms_PersonalCards_PersonalCardId",
                        column: x => x.PersonalCardId,
                        principalTable: "PersonalCards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "AdditionalStudyVacations",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    StartOfVacationDate = table.Column<DateTime>(nullable: false),
                    EndOfVacationDate = table.Column<DateTime>(nullable: false),
                    OrderNumber = table.Column<string>(nullable: true),
                    OrderDate = table.Column<DateTime>(nullable: false),
                    AdditionalStudyVacationFormId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdditionalStudyVacations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AdditionalStudyVacations_AdditionalStudyVacationForms_AdditionalStudyVacationFormId",
                        column: x => x.AdditionalStudyVacationFormId,
                        principalTable: "AdditionalStudyVacationForms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "OtherVacations",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    TypeOfVacation = table.Column<string>(nullable: true),
                    StartOfVacationDate = table.Column<DateTime>(nullable: false),
                    EndOfVacationDate = table.Column<DateTime>(nullable: false),
                    OrderNumber = table.Column<string>(nullable: true),
                    OrderDate = table.Column<DateTime>(nullable: false),
                    Notes = table.Column<string>(nullable: true),
                    OtherVacationFormId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OtherVacations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_OtherVacations_OtherVacationForms_OtherVacationFormId",
                        column: x => x.OtherVacationFormId,
                        principalTable: "OtherVacationForms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SocialWithChildrenVacations",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    StartOfVacationDate = table.Column<DateTime>(nullable: false),
                    EndOfVacationDate = table.Column<DateTime>(nullable: false),
                    OrderNumber = table.Column<string>(nullable: true),
                    OrderDate = table.Column<DateTime>(nullable: false),
                    SocialWithChildrenVacationFormId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SocialWithChildrenVacations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SocialWithChildrenVacations_SocialWithChildrenVacationForms_SocialWithChildrenVacationFormId",
                        column: x => x.SocialWithChildrenVacationFormId,
                        principalTable: "SocialWithChildrenVacationForms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "SocialWithPregnancyOrLookVacations",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    TypeOfVacation = table.Column<string>(nullable: true),
                    StartOfVacationDate = table.Column<DateTime>(nullable: false),
                    EndOfVacationDate = table.Column<DateTime>(nullable: false),
                    OrderNumber = table.Column<string>(nullable: true),
                    OrderDate = table.Column<DateTime>(nullable: false),
                    SocialWithPregnancyOrLookVacationFormId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SocialWithPregnancyOrLookVacations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SocialWithPregnancyOrLookVacations_SocialWithPregnancyOrLookVacationForms_SocialWithPregnancyOrLookVacationFormId",
                        column: x => x.SocialWithPregnancyOrLookVacationFormId,
                        principalTable: "SocialWithPregnancyOrLookVacationForms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "WithoutPayrollVacations",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    StartOfVacationDate = table.Column<DateTime>(nullable: false),
                    EndOfVacationDate = table.Column<DateTime>(nullable: false),
                    OrderNumber = table.Column<string>(nullable: true),
                    OrderDate = table.Column<DateTime>(nullable: false),
                    Notes = table.Column<string>(nullable: true),
                    WithoutPayrollVacationFormId = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WithoutPayrollVacations", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WithoutPayrollVacations_WithoutPayrollVacationForms_WithoutPayrollVacationFormId",
                        column: x => x.WithoutPayrollVacationFormId,
                        principalTable: "WithoutPayrollVacationForms",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AdditionalStudyVacationForms_PersonalCardId",
                table: "AdditionalStudyVacationForms",
                column: "PersonalCardId");

            migrationBuilder.CreateIndex(
                name: "IX_AdditionalStudyVacations_AdditionalStudyVacationFormId",
                table: "AdditionalStudyVacations",
                column: "AdditionalStudyVacationFormId");

            migrationBuilder.CreateIndex(
                name: "IX_OtherVacationForms_PersonalCardId",
                table: "OtherVacationForms",
                column: "PersonalCardId");

            migrationBuilder.CreateIndex(
                name: "IX_OtherVacations_OtherVacationFormId",
                table: "OtherVacations",
                column: "OtherVacationFormId");

            migrationBuilder.CreateIndex(
                name: "IX_SocialWithChildrenVacationForms_PersonalCardId",
                table: "SocialWithChildrenVacationForms",
                column: "PersonalCardId");

            migrationBuilder.CreateIndex(
                name: "IX_SocialWithChildrenVacations_SocialWithChildrenVacationFormId",
                table: "SocialWithChildrenVacations",
                column: "SocialWithChildrenVacationFormId");

            migrationBuilder.CreateIndex(
                name: "IX_SocialWithPregnancyOrLookVacationForms_PersonalCardId",
                table: "SocialWithPregnancyOrLookVacationForms",
                column: "PersonalCardId");

            migrationBuilder.CreateIndex(
                name: "IX_SocialWithPregnancyOrLookVacations_SocialWithPregnancyOrLookVacationFormId",
                table: "SocialWithPregnancyOrLookVacations",
                column: "SocialWithPregnancyOrLookVacationFormId");

            migrationBuilder.CreateIndex(
                name: "IX_WithoutPayrollVacationForms_PersonalCardId",
                table: "WithoutPayrollVacationForms",
                column: "PersonalCardId");

            migrationBuilder.CreateIndex(
                name: "IX_WithoutPayrollVacations_WithoutPayrollVacationFormId",
                table: "WithoutPayrollVacations",
                column: "WithoutPayrollVacationFormId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdditionalStudyVacations");

            migrationBuilder.DropTable(
                name: "OtherVacations");

            migrationBuilder.DropTable(
                name: "SocialWithChildrenVacations");

            migrationBuilder.DropTable(
                name: "SocialWithPregnancyOrLookVacations");

            migrationBuilder.DropTable(
                name: "WithoutPayrollVacations");

            migrationBuilder.DropTable(
                name: "AdditionalStudyVacationForms");

            migrationBuilder.DropTable(
                name: "OtherVacationForms");

            migrationBuilder.DropTable(
                name: "SocialWithChildrenVacationForms");

            migrationBuilder.DropTable(
                name: "SocialWithPregnancyOrLookVacationForms");

            migrationBuilder.DropTable(
                name: "WithoutPayrollVacationForms");
        }
    }
}
