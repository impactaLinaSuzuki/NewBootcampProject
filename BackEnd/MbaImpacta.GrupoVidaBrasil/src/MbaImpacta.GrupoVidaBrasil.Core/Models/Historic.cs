using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Core.Models
{
    [Table("MedicalRecord")]
    public class Historic : BaseEntity
    {       

        [Column("Description", TypeName = "varchar(4000)")]
        public string Annotation { get; set; }

        [Column("PatientId", TypeName = "bigint")]
        public long PatientId { get; set; }

        [ForeignKey("PatientId")]
        public virtual Patient Patient { get; set; }
    }
}