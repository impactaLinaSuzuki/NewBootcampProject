using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Core.Models
{
    [Table("User")]
    public class User : BaseEntity
    {
        [Column("PeopleId", TypeName = "bigint")]
        public long PeopleId { get; set; }

        [ForeignKey("PeopleId")]
        public virtual People People { get; set; }

        [Column("Password", TypeName = "varchar(65)")]
        public string Password { get; set; }

        [Column("LastPassword", TypeName = "varchar(65)")]
        public string? LastPassword { get; set; }

        [Column("IsActive", TypeName = "bit")]
        public bool IsActive { get; set; }

        [Column("Token", TypeName = "varchar(500)")]
        public string? Token { get; set; }
    }
}
