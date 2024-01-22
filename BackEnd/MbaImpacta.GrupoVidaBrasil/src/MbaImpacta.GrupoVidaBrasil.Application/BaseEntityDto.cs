using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Application
{
    public class BaseEntityDto
    {
        [Column("Id", TypeName = "char(36)")]
        public long Id { get; set; }
    }
}
