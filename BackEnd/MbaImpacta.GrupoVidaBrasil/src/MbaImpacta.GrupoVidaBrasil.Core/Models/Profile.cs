using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Core.Models
{
    [Table("Profile")]
    public class Profile : BaseEntity
    {
        [Column("Name", TypeName = "varchar(256)")]
        [Required]
        public string Name { get; set; }

        [Column("IsInternal", TypeName = "bit")]
        [Required]
        public bool IsInternal { get; set; }
    }
}
