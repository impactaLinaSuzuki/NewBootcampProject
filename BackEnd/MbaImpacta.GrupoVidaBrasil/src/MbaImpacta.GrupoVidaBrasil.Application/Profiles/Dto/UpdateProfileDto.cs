using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Application.Profiles.Dto
{
    public class UpdateProfileDto
    {
        [Column("Id")]
        public long Id { get; set; }

        [Column("Name")]
        public string Name { get; set; }

        [Column("IsInternal")]
        public bool IsInternal { get; set; }
    }
}
