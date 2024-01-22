using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Application.PeopleSpeciality.Dto
{
    public class UpdatePeopleSpecialityDto
    {
        [Column("Id")]
        public long Id { get; set; }

        [Column("PeopleId")]
        public long PeopleId { get; set; }

        [Column("SpecialityId")]
        public long SpecialityId { get; set; }
    }
}
