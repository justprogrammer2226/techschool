using Microsoft.EntityFrameworkCore.Migrations;

namespace Techschool.DAL.Migrations
{
    public partial class RemoveSpecificWorkingYears : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
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
                name: "AdditionalStudyVacationAdditionalInfo",
                table: "WorkingYears",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "AnnualVacationDays",
                table: "WorkingYears",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SocialWithChildrenVacationChildAge",
                table: "WorkingYears",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "SocialWithChildrenVacationDays",
                table: "WorkingYears",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "WorkingYearId",
                table: "WithoutPayrollVacations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WorkingYearId",
                table: "SocialWithPregnancyOrLookVacations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WorkingYearId",
                table: "SocialWithChildrenVacations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WorkingYearId",
                table: "OtherVacations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WorkingYearId",
                table: "AnnualVacations",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "WorkingYearId",
                table: "AdditionalStudyVacations",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_WithoutPayrollVacations_WorkingYearId",
                table: "WithoutPayrollVacations",
                column: "WorkingYearId");

            migrationBuilder.CreateIndex(
                name: "IX_SocialWithPregnancyOrLookVacations_WorkingYearId",
                table: "SocialWithPregnancyOrLookVacations",
                column: "WorkingYearId");

            migrationBuilder.CreateIndex(
                name: "IX_SocialWithChildrenVacations_WorkingYearId",
                table: "SocialWithChildrenVacations",
                column: "WorkingYearId");

            migrationBuilder.CreateIndex(
                name: "IX_OtherVacations_WorkingYearId",
                table: "OtherVacations",
                column: "WorkingYearId");

            migrationBuilder.CreateIndex(
                name: "IX_AnnualVacations_WorkingYearId",
                table: "AnnualVacations",
                column: "WorkingYearId");

            migrationBuilder.CreateIndex(
                name: "IX_AdditionalStudyVacations_WorkingYearId",
                table: "AdditionalStudyVacations",
                column: "WorkingYearId");

            migrationBuilder.AddForeignKey(
                name: "FK_AdditionalStudyVacations_WorkingYears_WorkingYearId",
                table: "AdditionalStudyVacations",
                column: "WorkingYearId",
                principalTable: "WorkingYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AnnualVacations_WorkingYears_WorkingYearId",
                table: "AnnualVacations",
                column: "WorkingYearId",
                principalTable: "WorkingYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OtherVacations_WorkingYears_WorkingYearId",
                table: "OtherVacations",
                column: "WorkingYearId",
                principalTable: "WorkingYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SocialWithChildrenVacations_WorkingYears_WorkingYearId",
                table: "SocialWithChildrenVacations",
                column: "WorkingYearId",
                principalTable: "WorkingYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SocialWithPregnancyOrLookVacations_WorkingYears_WorkingYearId",
                table: "SocialWithPregnancyOrLookVacations",
                column: "WorkingYearId",
                principalTable: "WorkingYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WithoutPayrollVacations_WorkingYears_WorkingYearId",
                table: "WithoutPayrollVacations",
                column: "WorkingYearId",
                principalTable: "WorkingYears",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AdditionalStudyVacations_WorkingYears_WorkingYearId",
                table: "AdditionalStudyVacations");

            migrationBuilder.DropForeignKey(
                name: "FK_AnnualVacations_WorkingYears_WorkingYearId",
                table: "AnnualVacations");

            migrationBuilder.DropForeignKey(
                name: "FK_OtherVacations_WorkingYears_WorkingYearId",
                table: "OtherVacations");

            migrationBuilder.DropForeignKey(
                name: "FK_SocialWithChildrenVacations_WorkingYears_WorkingYearId",
                table: "SocialWithChildrenVacations");

            migrationBuilder.DropForeignKey(
                name: "FK_SocialWithPregnancyOrLookVacations_WorkingYears_WorkingYearId",
                table: "SocialWithPregnancyOrLookVacations");

            migrationBuilder.DropForeignKey(
                name: "FK_WithoutPayrollVacations_WorkingYears_WorkingYearId",
                table: "WithoutPayrollVacations");

            migrationBuilder.DropIndex(
                name: "IX_WithoutPayrollVacations_WorkingYearId",
                table: "WithoutPayrollVacations");

            migrationBuilder.DropIndex(
                name: "IX_SocialWithPregnancyOrLookVacations_WorkingYearId",
                table: "SocialWithPregnancyOrLookVacations");

            migrationBuilder.DropIndex(
                name: "IX_SocialWithChildrenVacations_WorkingYearId",
                table: "SocialWithChildrenVacations");

            migrationBuilder.DropIndex(
                name: "IX_OtherVacations_WorkingYearId",
                table: "OtherVacations");

            migrationBuilder.DropIndex(
                name: "IX_AnnualVacations_WorkingYearId",
                table: "AnnualVacations");

            migrationBuilder.DropIndex(
                name: "IX_AdditionalStudyVacations_WorkingYearId",
                table: "AdditionalStudyVacations");

            migrationBuilder.DropColumn(
                name: "AdditionalStudyVacationAdditionalInfo",
                table: "WorkingYears");

            migrationBuilder.DropColumn(
                name: "AnnualVacationDays",
                table: "WorkingYears");

            migrationBuilder.DropColumn(
                name: "SocialWithChildrenVacationChildAge",
                table: "WorkingYears");

            migrationBuilder.DropColumn(
                name: "SocialWithChildrenVacationDays",
                table: "WorkingYears");

            migrationBuilder.DropColumn(
                name: "WorkingYearId",
                table: "WithoutPayrollVacations");

            migrationBuilder.DropColumn(
                name: "WorkingYearId",
                table: "SocialWithPregnancyOrLookVacations");

            migrationBuilder.DropColumn(
                name: "WorkingYearId",
                table: "SocialWithChildrenVacations");

            migrationBuilder.DropColumn(
                name: "WorkingYearId",
                table: "OtherVacations");

            migrationBuilder.DropColumn(
                name: "WorkingYearId",
                table: "AnnualVacations");

            migrationBuilder.DropColumn(
                name: "WorkingYearId",
                table: "AdditionalStudyVacations");

            migrationBuilder.AddColumn<string>(
                name: "WithoutPayrollVacationWorkingYearId",
                table: "WithoutPayrollVacations",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SocialWithPregnancyOrLookVacationWorkingYearId",
                table: "SocialWithPregnancyOrLookVacations",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "SocialWithChildrenVacationWorkingYearId",
                table: "SocialWithChildrenVacations",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "OtherVacationWorkingYearId",
                table: "OtherVacations",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AnnualVacationWorkingYearId",
                table: "AnnualVacations",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AdditionalStudyVacationWorkingYearId",
                table: "AdditionalStudyVacations",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "AdditionalStudyVacationWorkingYear",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AdditionalInfo = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    WorkingYearId = table.Column<string>(type: "nvarchar(450)", nullable: true)
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
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Days = table.Column<int>(type: "int", nullable: false),
                    WorkingYearId = table.Column<string>(type: "nvarchar(450)", nullable: true)
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
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    WorkingYearId = table.Column<string>(type: "nvarchar(450)", nullable: true)
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
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ChildAge = table.Column<int>(type: "int", nullable: false),
                    Days = table.Column<int>(type: "int", nullable: false),
                    WorkingYearId = table.Column<string>(type: "nvarchar(450)", nullable: true)
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
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    WorkingYearId = table.Column<string>(type: "nvarchar(450)", nullable: true)
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
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    WorkingYearId = table.Column<string>(type: "nvarchar(450)", nullable: true)
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
    }
}
