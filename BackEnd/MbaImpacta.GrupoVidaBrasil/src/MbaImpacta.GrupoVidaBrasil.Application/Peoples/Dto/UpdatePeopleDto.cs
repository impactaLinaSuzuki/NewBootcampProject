using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Application.Peoples.Dto
{
    public class UpdatePeopleDto
    {
        [Column("Id")]
        public long Id { get; set; }

        [Column("Name")]
        public string Name { get; set; }

        [Column("Cpf")]
        public string Cpf { get; set; }

        [Column("Email")]
        public string Email { get; set; }

        [Column("Telephone")]
        public string? Telephone { get; set; }

        [Column("CellPhone")]
        public string CellPhone { get; set; }

        [Column("ProfileId")]
        public long ProfileId { get; set; }

        [Column("Address")]
        public string Address { get; set; }

        [Column("Number")]
        public long Number { get; set; }

        [Column("Complement")]
        public string Complement { get; set; }

        [Column("ZipCode")]
        public string ZipCode { get; set; }

        [Column("District")]
        public string District { get; set; }

        [Column("State")]
        public string State { get; set; }

        [Column("City")]
        public string City { get; set; }

        [Column("BirthDate")]
        public DateTime BirthDate { get; set; }

        [Column("CRM")]
        public string? CRM { get; set; }
    }
}
