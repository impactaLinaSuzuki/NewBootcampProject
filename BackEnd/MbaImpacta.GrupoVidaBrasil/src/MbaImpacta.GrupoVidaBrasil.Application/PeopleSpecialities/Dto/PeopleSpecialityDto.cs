using MbaImpacta.GrupoVidaBrasil.Core.Models;
using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Application.PeopleSpeciality.Dto
{
    public class PeopleSpecialityDto : BaseEntityDto
    {
        [Column("PeopleId")]
        public long PeopleId { get; set; }

        [ForeignKey("PeopleId")]
        public virtual People People { get; set; }


        [Column("SpecialityId")]
        public long SpecialityId { get; set; }

        [ForeignKey("SpecialityId")]
        public virtual Speciality Speciality { get; set; }
    }
}
