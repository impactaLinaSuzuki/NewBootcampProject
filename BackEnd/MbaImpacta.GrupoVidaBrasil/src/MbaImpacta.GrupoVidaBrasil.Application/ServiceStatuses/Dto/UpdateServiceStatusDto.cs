using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Application.ServiceStatuses.Dto
{
    public class UpdateServiceStatusDto
    {
        [Column("Id")]
        public long Id { get; set; }

        [Column("Name")]
        public string Name { get; set; }
    }
}
