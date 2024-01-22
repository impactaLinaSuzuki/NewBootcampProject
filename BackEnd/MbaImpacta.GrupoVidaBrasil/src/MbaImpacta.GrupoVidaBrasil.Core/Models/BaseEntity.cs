using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Core.Models
{
    public class BaseEntity : IBaseEntity
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Column(TypeName = "bigint")]
        public long Id { get; set; }

        [Column("CreatedDate", TypeName = "datetime")]
        public DateTime CreatedDate { get; set; }

        [Column("IsDeleted", TypeName = "bit")]
        public bool IsDeleted { get; set; }

        [Column("DeletedDate", TypeName = "datetime")]
        public DateTime? DeletedDate { get; set; }
    }
}
