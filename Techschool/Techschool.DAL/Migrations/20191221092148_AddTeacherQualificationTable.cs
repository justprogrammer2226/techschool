using Microsoft.EntityFrameworkCore.Migrations;

namespace Techschool.DAL.Migrations
{
    public partial class AddTeacherQualificationTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "TeacherQualificationId",
                table: "PersonalCards",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "TeacherQualifications",
                columns: table => new
                {
                    Id = table.Column<string>(nullable: false),
                    Name = table.Column<string>(nullable: true),
                    Note = table.Column<string>(nullable: true)
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

        protected override void Down(MigrationBuilder migrationBuilder)
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
        }
    }
}
