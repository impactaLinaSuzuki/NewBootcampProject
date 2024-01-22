using MbaImpacta.GrupoVidaBrasil.Application.PeopleSpeciality.Dto;
using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Application.Specialities.Dto
{
    public class SpecialityDto : BaseEntityDto
    {
        [Column("Name")]
        public string Name { get; set; }
    }
}
