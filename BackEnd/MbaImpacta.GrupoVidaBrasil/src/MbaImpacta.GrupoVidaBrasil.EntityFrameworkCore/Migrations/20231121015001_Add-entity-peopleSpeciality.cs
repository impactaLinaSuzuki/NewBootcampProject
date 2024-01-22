using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MbaImpacta.GrupoVidaBrasil.EntityFrameworkCore.Migrations
{
    /// <inheritdoc />
    public partial class AddentitypeopleSpeciality : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PeopleSpeciality",
                columns: table => new
                {
                    Id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    PeopleId = table.Column<long>(type: "bigint", nullable: false),
                    SpecialityId = table.Column<long>(type: "bigint", nullable: false),
                    CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false),
                    IsDeleted = table.Column<ulong>(type: "bit", nullable: false),
                    DeletedDate = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PeopleSpeciality", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PeopleSpeciality_People_PeopleId",
                        column: x => x.PeopleId,
                        principalTable: "People",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_PeopleSpeciality_Speciality_SpecialityId",
                        column: x => x.SpecialityId,
                        principalTable: "Speciality",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_PeopleSpeciality_PeopleId",
                table: "PeopleSpeciality",
                column: "PeopleId");

            migrationBuilder.CreateIndex(
                name: "IX_PeopleSpeciality_SpecialityId",
                table: "PeopleSpeciality",
                column: "SpecialityId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PeopleSpeciality");
        }
    }
}
