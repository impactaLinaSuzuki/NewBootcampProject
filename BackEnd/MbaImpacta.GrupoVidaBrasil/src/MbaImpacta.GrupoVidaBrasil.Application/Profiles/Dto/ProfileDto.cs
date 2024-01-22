using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Application.Profiles.Dto
{
    public class ProfileDto : BaseEntityDto
    {
        [Column("Name")]
        public string Name { get; set; }

        [Column("IsInternal")]
        public bool IsInternal { get; set; }
    }
}
