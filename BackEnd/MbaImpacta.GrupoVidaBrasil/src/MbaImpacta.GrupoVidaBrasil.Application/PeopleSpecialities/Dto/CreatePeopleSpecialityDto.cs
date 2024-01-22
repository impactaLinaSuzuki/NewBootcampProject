using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Application.PeopleSpeciality.Dto
{
    public class CreatePeopleSpecialityDto
    {
        [Column("PeopleId")]
        public long PeopleId { get; set; }

        [Column("SpecialityId")]
        public long SpecialityId { get; set; }
    }
}
