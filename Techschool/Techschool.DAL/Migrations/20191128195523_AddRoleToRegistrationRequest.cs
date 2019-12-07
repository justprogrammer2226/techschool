using Microsoft.EntityFrameworkCore.Migrations;

namespace Techschool.DAL.Migrations
{
    public partial class AddRoleToRegistrationRequest : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "RoleId",
                table: "RegistrationRequests",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_RegistrationRequests_RoleId",
                table: "RegistrationRequests",
                column: "RoleId");

            migrationBuilder.AddForeignKey(
                name: "FK_RegistrationRequests_AspNetRoles_RoleId",
                table: "RegistrationRequests",
                column: "RoleId",
                principalTable: "AspNetRoles",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_RegistrationRequests_AspNetRoles_RoleId",
                table: "RegistrationRequests");

            migrationBuilder.DropIndex(
                name: "IX_RegistrationRequests_RoleId",
                table: "RegistrationRequests");

            migrationBuilder.DropColumn(
                name: "RoleId",
                table: "RegistrationRequests");
        }
    }
}
