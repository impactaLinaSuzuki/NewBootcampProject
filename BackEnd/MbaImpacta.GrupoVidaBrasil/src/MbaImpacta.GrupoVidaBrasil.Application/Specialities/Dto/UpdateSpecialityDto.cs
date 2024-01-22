using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Application.Specialities.Dto
{
    public class UpdateSpecialityDto
    {
        [Column("Id")]
        public long Id { get; set; }

        [Column("Name")]
        public string Name { get; set; }
    }
}
