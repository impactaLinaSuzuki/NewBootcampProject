using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Core.Models
{
    [Table("Patient")]
    public class Patient : BaseEntity
    {
        [Column("Name", TypeName = "varchar(250)")]
        public string Name { get; set; }

        [Column("Cpf", TypeName = "varchar(11)")]
        public string Cpf { get; set; }

        [Column("Email", TypeName = "varchar(100)")]
        public string Email { get; set; }

        [Column("Telephone", TypeName = "varchar(11)")]
        public string? Telephone { get; set; }

        [Column("CellPhone", TypeName = "varchar(11)")]
        public string CellPhone { get; set; }

        [Column("Address", TypeName = "varchar(250)")]
        public string Address { get; set; }

        [Column("Number", TypeName = "bigint")]
        public long Number { get; set; }

        [Column("Complement", TypeName = "varchar(100)")]
        public string? Complement { get; set; }

        [Column("ZipCode", TypeName = "varchar(8)")]
        public string ZipCode { get; set; }

        [Column("District", TypeName = "varchar(100)")]
        public string District { get; set; }

        [Column("State", TypeName = "varchar(2)")]
        public string State { get; set; }

        [Column("City", TypeName = "varchar(100)")]
        public string City { get; set; }

        [Column("BirthDate", TypeName = "datetime")]
        public DateTime BirthDate { get; set; }
    }
}
