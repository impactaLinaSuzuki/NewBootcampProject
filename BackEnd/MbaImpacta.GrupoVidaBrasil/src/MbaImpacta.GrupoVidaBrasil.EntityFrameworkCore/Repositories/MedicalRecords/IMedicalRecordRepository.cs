using MbaImpacta.GrupoVidaBrasil.Core.Models;

namespace MbaImpacta.GrupoVidaBrasil.Core.Repositories.Histories
{
    public interface IMedicalRecordRepository : IBaseRepository<MedicalRecord>
    {
        Task<List<MedicalRecord>> FindByIdPeople(long idPatient);
    }
}
