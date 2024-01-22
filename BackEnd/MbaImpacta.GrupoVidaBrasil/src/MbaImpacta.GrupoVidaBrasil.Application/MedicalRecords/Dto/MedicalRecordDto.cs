using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Application.MedicalRecords.Dto
{
    public class MedicalRecordDto : BaseEntityDto
    {
        [Column("Annotation")]
        public string Annotation { get; set; }

        [Column("IsActive")]
        public bool IsActive { get; set; }

        [Column("CreatedDate")]
        public DateTime CreatedDate { get; set; }
    }
}
