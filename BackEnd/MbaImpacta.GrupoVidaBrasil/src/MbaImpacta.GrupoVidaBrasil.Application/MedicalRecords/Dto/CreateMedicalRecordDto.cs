using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Application.MedicalRecords.Dto
{
    public class CreateMedicalRecordDto
    {
        [Column("Annotation")]
        public string Annotation { get; set; }

        [Column("PatientId")]
        public long PatientId { get; set; }
    }
}
