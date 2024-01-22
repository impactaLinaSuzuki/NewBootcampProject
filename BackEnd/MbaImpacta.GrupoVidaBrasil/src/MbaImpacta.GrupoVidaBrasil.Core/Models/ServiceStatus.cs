using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Core.Models
{
    [Table("ServiceStatus")]
    public class ServiceStatus : BaseEntity
    {
        [Column("Name", TypeName = "varchar(50)")]
        public string Name { get; set; }
    }
}
