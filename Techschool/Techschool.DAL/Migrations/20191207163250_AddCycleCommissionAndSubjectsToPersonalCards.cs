using Microsoft.EntityFrameworkCore.Migrations;

namespace Techschool.DAL.Migrations
{
    public partial class AddCycleCommissionAndSubjectsToPersonalCards : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "CycleCommissionId",
                table: "PersonalCards",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "PersonalCardsSubjects",
                columns: table => new
                {
                    PersonalCardId = table.Column<string>(nullable: false),
                    SubjectId = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PersonalCardsSubjects", x => new { x.PersonalCardId, x.SubjectId });
                    table.ForeignKey(
                        name: "FK_PersonalCardsSubjects_PersonalCards_PersonalCardId",
                        column: x => x.PersonalCardId,
                        principalTable: "PersonalCards",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PersonalCardsSubjects_Subjects_SubjectId",
                        column: x => x.SubjectId,
                        principalTable: "Subjects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PersonalCards_CycleCommissionId",
                table: "PersonalCards",
                column: "CycleCommissionId");

            migrationBuilder.CreateIndex(
                name: "IX_PersonalCardsSubjects_SubjectId",
                table: "PersonalCardsSubjects",
                column: "SubjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_PersonalCards_CycleCommissions_CycleCommissionId",
                table: "PersonalCards",
                column: "CycleCommissionId",
                principalTable: "CycleCommissions",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PersonalCards_CycleCommissions_CycleCommissionId",
                table: "PersonalCards");

            migrationBuilder.DropTable(
                name: "PersonalCardsSubjects");

            migrationBuilder.DropIndex(
                name: "IX_PersonalCards_CycleCommissionId",
                table: "PersonalCards");

            migrationBuilder.DropColumn(
                name: "CycleCommissionId",
                table: "PersonalCards");
        }
    }
}
