using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Application.MedicalRecords.Dto
{
    public class UpdateMedicalRecordDto
    {
        [Column("Id")]
        public long Id { get; set; }

        [Column("Annotation")]
        public string Annotation { get; set; }

        [Column("PatientId")]
        public long PatientId { get; set; }
    }
}
