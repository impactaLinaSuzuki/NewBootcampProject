using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Core.Models
{
    [Table("Speciality")]
    public class Speciality : BaseEntity
    {
        [Column("Name", TypeName = "varchar(100)")]
        public string Name { get; set; }
    }
}
