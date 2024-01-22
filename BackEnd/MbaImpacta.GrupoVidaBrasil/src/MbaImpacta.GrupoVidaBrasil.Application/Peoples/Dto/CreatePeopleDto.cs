using MbaImpacta.GrupoVidaBrasil.Application.Specialities.Dto;
using MbaImpacta.GrupoVidaBrasil.Core.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Application.Peoples.Dto
{
    public class CreatePeopleDto
    {
        [Column("Name")]
        public string Name { get; set; } = string.Empty;

        [Column("Cpf")]
        public string Cpf { get; set; } = string.Empty;

        [Column("Email")]
        public string Email { get; set; } = string.Empty;

        [Column("Telephone")]
        public string? Telephone { get; set; }

        [Column("CellPhone")]
        public string CellPhone { get; set; } = string.Empty;

        [Column("ProfileId")]
        public long ProfileId { get; set; }

        [Column("Address")]
        public string Address { get; set; } = string.Empty;

        [Column("Number")]
        public long Number { get; set; }

        [Column("Complement")]
        public string Complement { get; set; } = string.Empty;

        [Column("ZipCode")]
        public string ZipCode { get; set; } = string.Empty;

        [Column("District")]
        public string District { get; set; } = string.Empty;

        [Column("State")]
        public string State { get; set; } = string.Empty;

        [Column("City")]
        public string City { get; set; } = string.Empty;

        [Column("BirthDate")]
        public DateTime BirthDate { get; set; }

        [Column("CRM")]
        public string? CRM { get; set; }

        [Column("Password")]
        public string Password { get; set; }

        [Column("Specialities")]
        public List<long>? Specialities { get; set; }
    }
}
