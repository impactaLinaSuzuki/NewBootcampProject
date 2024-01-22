using MbaImpacta.GrupoVidaBrasil.Core.Models;

namespace MbaImpacta.GrupoVidaBrasil.Core.Repositories.Peoples
{
    public interface IPeopleRepository : IBaseRepository<People>
    {
        Task<People?> FindByCpf(string cpf);
    }
}
