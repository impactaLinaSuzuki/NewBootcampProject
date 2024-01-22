using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Application.Profiles.Dto
{
    public class CreateProfileDto
    {
        [Column("Name")]
        public string Name { get; set; }

        [Column("IsInternal")]
        public bool IsInternal { get; set; }
    }
}
