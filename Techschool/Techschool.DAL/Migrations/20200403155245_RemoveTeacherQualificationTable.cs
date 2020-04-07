using Microsoft.EntityFrameworkCore.Migrations;

namespace Techschool.DAL.Migrations
{
    public partial class RemoveTeacherQualificationTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PersonalCards_TeacherQualifications_TeacherQualificationId",
                table: "PersonalCards");

            migrationBuilder.DropTable(
                name: "TeacherQualifications");

            migrationBuilder.DropIndex(
                name: "IX_PersonalCards_TeacherQualificationId",
                table: "PersonalCards");

            migrationBuilder.DropColumn(
                name: "TeacherQualificationId",
                table: "PersonalCards");

            migrationBuilder.AddColumn<string>(
                name: "TeacherQualification",
                table: "PersonalCards",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "TeacherQualificationNote",
                table: "PersonalCards",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TeacherQualification",
                table: "PersonalCards");

            migrationBuilder.DropColumn(
                name: "TeacherQualificationNote",
                table: "PersonalCards");

            migrationBuilder.AddColumn<string>(
                name: "TeacherQualificationId",
                table: "PersonalCards",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TeacherQualifications",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Note = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TeacherQualifications", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PersonalCards_TeacherQualificationId",
                table: "PersonalCards",
                column: "TeacherQualificationId");

            migrationBuilder.AddForeignKey(
                name: "FK_PersonalCards_TeacherQualifications_TeacherQualificationId",
                table: "PersonalCards",
                column: "TeacherQualificationId",
                principalTable: "TeacherQualifications",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
