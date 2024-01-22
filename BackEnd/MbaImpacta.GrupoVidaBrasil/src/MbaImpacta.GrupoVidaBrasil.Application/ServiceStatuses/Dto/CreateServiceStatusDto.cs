using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Application.ServiceStatuses.Dto
{
    public class CreateServiceStatusDto
    {
        [Column("Name")]
        public string Name { get; set; }
    }
}
