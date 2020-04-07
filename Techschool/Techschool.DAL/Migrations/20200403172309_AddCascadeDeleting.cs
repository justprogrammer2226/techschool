using Microsoft.EntityFrameworkCore.Migrations;

namespace Techschool.DAL.Migrations
{
    public partial class AddCascadeDeleting : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AdditionalStudyVacationForms_PersonalCards_PersonalCardId",
                table: "AdditionalStudyVacationForms");

            migrationBuilder.DropForeignKey(
                name: "FK_AnnualVacationForms_PersonalCards_PersonalCardId",
                table: "AnnualVacationForms");

            migrationBuilder.DropForeignKey(
                name: "FK_OtherVacationForms_PersonalCards_PersonalCardId",
                table: "OtherVacationForms");

            migrationBuilder.DropForeignKey(
                name: "FK_SocialWithChildrenVacationForms_PersonalCards_PersonalCardId",
                table: "SocialWithChildrenVacationForms");

            migrationBuilder.DropForeignKey(
                name: "FK_SocialWithPregnancyOrLookVacationForms_PersonalCards_PersonalCardId",
                table: "SocialWithPregnancyOrLookVacationForms");

            migrationBuilder.DropForeignKey(
                name: "FK_WithoutPayrollVacationForms_PersonalCards_PersonalCardId",
                table: "WithoutPayrollVacationForms");

            migrationBuilder.AddForeignKey(
                name: "FK_AdditionalStudyVacationForms_PersonalCards_PersonalCardId",
                table: "AdditionalStudyVacationForms",
                column: "PersonalCardId",
                principalTable: "PersonalCards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_AnnualVacationForms_PersonalCards_PersonalCardId",
                table: "AnnualVacationForms",
                column: "PersonalCardId",
                principalTable: "PersonalCards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_OtherVacationForms_PersonalCards_PersonalCardId",
                table: "OtherVacationForms",
                column: "PersonalCardId",
                principalTable: "PersonalCards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SocialWithChildrenVacationForms_PersonalCards_PersonalCardId",
                table: "SocialWithChildrenVacationForms",
                column: "PersonalCardId",
                principalTable: "PersonalCards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SocialWithPregnancyOrLookVacationForms_PersonalCards_PersonalCardId",
                table: "SocialWithPregnancyOrLookVacationForms",
                column: "PersonalCardId",
                principalTable: "PersonalCards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_WithoutPayrollVacationForms_PersonalCards_PersonalCardId",
                table: "WithoutPayrollVacationForms",
                column: "PersonalCardId",
                principalTable: "PersonalCards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AdditionalStudyVacationForms_PersonalCards_PersonalCardId",
                table: "AdditionalStudyVacationForms");

            migrationBuilder.DropForeignKey(
                name: "FK_AnnualVacationForms_PersonalCards_PersonalCardId",
                table: "AnnualVacationForms");

            migrationBuilder.DropForeignKey(
                name: "FK_OtherVacationForms_PersonalCards_PersonalCardId",
                table: "OtherVacationForms");

            migrationBuilder.DropForeignKey(
                name: "FK_SocialWithChildrenVacationForms_PersonalCards_PersonalCardId",
                table: "SocialWithChildrenVacationForms");

            migrationBuilder.DropForeignKey(
                name: "FK_SocialWithPregnancyOrLookVacationForms_PersonalCards_PersonalCardId",
                table: "SocialWithPregnancyOrLookVacationForms");

            migrationBuilder.DropForeignKey(
                name: "FK_WithoutPayrollVacationForms_PersonalCards_PersonalCardId",
                table: "WithoutPayrollVacationForms");

            migrationBuilder.AddForeignKey(
                name: "FK_AdditionalStudyVacationForms_PersonalCards_PersonalCardId",
                table: "AdditionalStudyVacationForms",
                column: "PersonalCardId",
                principalTable: "PersonalCards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_AnnualVacationForms_PersonalCards_PersonalCardId",
                table: "AnnualVacationForms",
                column: "PersonalCardId",
                principalTable: "PersonalCards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_OtherVacationForms_PersonalCards_PersonalCardId",
                table: "OtherVacationForms",
                column: "PersonalCardId",
                principalTable: "PersonalCards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SocialWithChildrenVacationForms_PersonalCards_PersonalCardId",
                table: "SocialWithChildrenVacationForms",
                column: "PersonalCardId",
                principalTable: "PersonalCards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_SocialWithPregnancyOrLookVacationForms_PersonalCards_PersonalCardId",
                table: "SocialWithPregnancyOrLookVacationForms",
                column: "PersonalCardId",
                principalTable: "PersonalCards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_WithoutPayrollVacationForms_PersonalCards_PersonalCardId",
                table: "WithoutPayrollVacationForms",
                column: "PersonalCardId",
                principalTable: "PersonalCards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
