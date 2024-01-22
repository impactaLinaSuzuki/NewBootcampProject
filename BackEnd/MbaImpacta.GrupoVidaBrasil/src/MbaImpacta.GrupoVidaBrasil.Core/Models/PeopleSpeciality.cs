using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Core.Models
{
    [Table("PeopleSpeciality")]
    public class PeopleSpeciality : BaseEntity
    {
        [Column("PeopleId", TypeName = "bigint")]
        public long PeopleId { get; set; }

        [ForeignKey("PeopleId")]
        public virtual People People { get; set; }

        [Column("SpecialityId", TypeName = "bigint")]
        public long SpecialityId { get; set; }

        [ForeignKey("SpecialityId")]
        public virtual Speciality Speciality { get; set; }
    }
}
