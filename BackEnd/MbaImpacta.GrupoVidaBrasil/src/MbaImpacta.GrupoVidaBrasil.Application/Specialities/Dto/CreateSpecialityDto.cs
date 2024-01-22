using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Application.Specialities.Dto
{
    public class CreateSpecialityDto
    {
        [Column("Name")]
        public string Name { get; set; }
    }
}
