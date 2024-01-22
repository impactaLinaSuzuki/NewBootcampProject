using System.ComponentModel.DataAnnotations.Schema;

namespace MbaImpacta.GrupoVidaBrasil.Application.Agendamento.Dto
{
    public class CreateAgendamentoDto
    {
         [Column("IdAgendamento", TypeName = "bigint")]
        public long IdAgendamento { get; set; }

        [Column("Paciente", TypeName = "varchar(11)")]
        public string Paciente { get; set; }

        [Column("Especialidade", TypeName = "varchar(100)")]
        public string Especialidade { get; set; }

        [Column("Voluntario", TypeName = "varchar(11)")]
        public string? Voluntario { get; set; }

        [Column("DtaInicial", TypeName = "datetime")]
        public double DtaInicial { get; set; }

        [Column("DtaFinal", TypeName = "datetime")]
        public double DtaFinal { get; set; }

        [Column("Status", TypeName = "bigint")]
        public long Status { get; set; }
    }
}
